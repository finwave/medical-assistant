"use client";

import { useState } from "react";
import { PropsWithChildren } from "react";
import { useTranslations } from "next-intl";
import { IconContext } from "react-icons";
import { CgSpinner } from "react-icons/cg";
import { FaClipboardList } from "react-icons/fa";
import { ProfileGenderTids } from "@/data/profile_data";
import { ProfileAgeValues } from "@/data/profile_data";
import axios from "axios";

type AssistantProps = {
	savedProfileGender: number;
	savedProfileAge: number;
};

export const Assistant = ({
	savedProfileGender,
	savedProfileAge,
}: PropsWithChildren<AssistantProps>) => {
	const [user_input, setUserInput] = useState("");

	const t_assistant = useTranslations("Assistant");
	const t_profile = useTranslations("Profile");

	const genderOptions = [
		t_profile(ProfileGenderTids[0]),
		t_profile(ProfileGenderTids[1]),
		t_profile(ProfileGenderTids[2]),
	];

	function sendRequest() {
		if (user_input == null || user_input == "") {
			return;
		}

		enableLoadingIcon(true);

		let openai_input = t_assistant("openai_input_request");
		openai_input = openai_input.concat(
			t_assistant("openai_input_symptoms")
		);
		openai_input = openai_input.concat(user_input);

		if (savedProfileGender >= 0 || savedProfileAge >= 0) {
			openai_input = openai_input.concat(" - ");
			openai_input = openai_input.concat(
				t_assistant("openai_input_patient_info")
			);

			if (savedProfileGender >= 0) {
				openai_input = addToRequestString(
					openai_input,
					t_profile("parameter_title_gender"),
					genderOptions[savedProfileGender]
				);
			}

			if (savedProfileGender >= 0 && savedProfileAge >= 0) {
				openai_input = openai_input.concat(",");
			}

			if (savedProfileAge >= 0) {
				openai_input = addToRequestString(
					openai_input,
					t_profile("parameter_title_age"),
					ProfileAgeValues[savedProfileAge]
				);
			}
		}

		// Establish Rest API request with MAMP local server (localhost).
		axios
			.get("http://localhost:80//api.php", {
				params: {
					input: openai_input,
				},
			})
			.then(function (response) {
				if (response.data) {
					if (response.data.result) {
						const output = response.data.result as string;
						setOutputAreaText(output);
					} else {
						setOutputAreaText(t_assistant("request_error"));
					}
				}
			})
			.catch(function (error) {
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				} else if (error.message || error.request) {
					if (error.message) {
						// Something happened in setting up the request that triggered an Error
						console.log("Error:", error.message);
					}
					if (error.request) {
						// The request was made but no response was received
						// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
						// http.ClientRequest in node.js
						//console.log(error.request);
					}
				}

				setOutputAreaText(t_assistant("request_error"));
			})
			.finally(function () {
				// always executed
				enableLoadingIcon(false);
			});
	}

	function addToRequestString(
		openai_input: string,
		title: string,
		value: string
	): string {
		openai_input = openai_input.concat(" ");
		openai_input = openai_input.concat(title.toLowerCase());
		openai_input = openai_input.concat(" ");
		openai_input = openai_input.concat(value.toLowerCase());
		return openai_input;
	}

	function setOutputAreaText(text: string) {
		const outputElement = document.getElementById(
			"request_output"
		) as HTMLTextAreaElement;
		outputElement.value = text;
	}

	function enableLoadingIcon(enable: boolean) {
		const headerProfileButtonElement = document.getElementById(
			"button_header_profile"
		) as HTMLButtonElement;
		const headerAssistantButtonElement = document.getElementById(
			"button_header_assistant"
		) as HTMLButtonElement;
		const enLanguageButtonElement = document.getElementById(
			"button_language_en"
		) as HTMLButtonElement;
		const fiLanguageButtonElement = document.getElementById(
			"button_language_fi"
		) as HTMLButtonElement;
		const sendButtonElement = document.getElementById(
			"request_button"
		) as HTMLButtonElement;
		const inputElement = document.getElementById(
			"request_input"
		) as HTMLInputElement;
		const outputElement = document.getElementById(
			"request_output"
		) as HTMLTextAreaElement;
		const loadingElement = document.getElementById("loading_icon");

		if (headerProfileButtonElement) {
			if (enable) {
				headerProfileButtonElement.classList.add("button_disabled");
			} else {
				headerProfileButtonElement.classList.remove("button_disabled");
			}
		}
		if (headerAssistantButtonElement) {
			if (enable) {
				headerAssistantButtonElement.classList.add("button_disabled");
			} else {
				headerAssistantButtonElement.classList.remove(
					"button_disabled"
				);
			}
		}

		if (enLanguageButtonElement) {
			if (enable) {
				enLanguageButtonElement.classList.add("button_disabled");
			} else {
				enLanguageButtonElement.classList.remove("button_disabled");
			}
		}
		if (fiLanguageButtonElement) {
			if (enable) {
				fiLanguageButtonElement.classList.add("button_disabled");
			} else {
				fiLanguageButtonElement.classList.remove("button_disabled");
			}
		}

		if (sendButtonElement) {
			if (enable) {
				sendButtonElement.classList.replace(
					"opacity-100",
					"opacity-35"
				);
				sendButtonElement.classList.add("button_disabled");
			} else {
				sendButtonElement.classList.replace(
					"opacity-35",
					"opacity-100"
				);
				sendButtonElement.classList.remove("button_disabled");
			}
		}

		if (outputElement) {
			if (enable) {
				outputElement.classList.add("pl-9");
				outputElement.classList.add("lg:pl-10");
				outputElement.value = t_assistant("request_wait");
			} else {
				outputElement.classList.remove("pl-9");
				outputElement.classList.remove("lg:pl-10");
			}
		}

		if (inputElement) {
			if (enable) {
				inputElement.disabled = true;
			} else {
				inputElement.disabled = false;
			}
		}

		if (loadingElement) {
			if (enable) {
				loadingElement.hidden = false;
			} else {
				loadingElement.hidden = true;
			}
		}
	}

	async function handleCopy() {
		try {
			const outputElement = document.getElementById(
				"request_output"
			) as HTMLTextAreaElement;

			if (outputElement == null) {
				return;
			}

			// Copy text to clipboard
			await navigator.clipboard.writeText(outputElement.value);

			//Show notification
			showClipboardNotification(true);
			// Hide notification after 2.5 seconds
			setTimeout(() => showClipboardNotification(false), 2500);
		} catch (err) {
			console.error("Failed to copy text:", err);
		}
	}

	function showClipboardNotification(enable: boolean) {
		const desktopNotificationElement = document.getElementById(
			"clipboard_notification_desktop"
		);

		if (desktopNotificationElement != null) {
			if (enable) {
				desktopNotificationElement.innerText = t_assistant(
					"clipboard_notification"
				);
			} else {
				desktopNotificationElement.innerText = "";
			}
		}
	}

	return (
		<>
			<p className="font-black text-center text-2xl lg:text-3xl">
				{t_assistant("page_title")}
			</p>
			<div className="mainarea_width">
				<div className="parameter_title">
					{t_assistant("parameter_title_symptoms")}
				</div>
				<div className="flex flex-row items-center justify-center w-full">
					<input
						id="request_input"
						className="textbox_visual button_height input_box_width input_box_margin"
						value={user_input}
						placeholder={t_assistant("user_input_placeholder")}
						onChange={(event) => setUserInput(event.target.value)}
						disabled={false}
					/>
					<button
						id="request_button"
						className="button_visual input_button_width button_height opacity-100"
						onClick={sendRequest}
						hidden={false}
					>
						{t_assistant("button_send")}
					</button>
				</div>
			</div>
			<div className="mainarea_width flex-grow">
				<div
					id="clipboard_notification_desktop"
					className="absolute hidden lg:inline -mt-7 notification_visual"
				></div>
				<div
					id="loading_icon"
					className="absolute pl-2 pt-2 lg:pl-2 lg:pt-3"
					hidden={true}
				>
					<IconContext.Provider
						value={{ className: "icon_size_loading" }}
					>
						<CgSpinner className="animate-spin" />
					</IconContext.Provider>
				</div>
				<div
					className="absolute hidden lg:inline ml-[-1.0rem] mt-2 lg:ml-[-3.25rem] lg:mt-3"
					hidden={false}
				>
					<button
						id="clipboard_button_desktop"
						className="button_visual p-2"
						onClick={handleCopy}
					>
						<div className="inline">
							<IconContext.Provider
								value={{ className: "icon_size_clipboard" }}
							>
								<FaClipboardList />
							</IconContext.Provider>
						</div>
					</button>
				</div>
				<textarea
					readOnly
					id="request_output"
					className="textbox_visual w-full h-full"
					value=""
					placeholder=""
					disabled={true}
				/>
			</div>
		</>
	);
};
