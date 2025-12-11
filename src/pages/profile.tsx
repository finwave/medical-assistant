"use client";

import { PropsWithChildren } from "react";
import { useTranslations } from "next-intl";
import { DropMenu } from "@/components/dropmenu";

type ProfileProps = {
	onParentProfileSave: () => void;
	onParentProfileContinue: () => void;
	onParentProfileGenderSelect: (index: number) => void;
	onParentProfileAgeSelect: (index: number) => void;
	savedProfileGender: number;
	savedProfileAge: number;
};

export const Profile = ({
	onParentProfileSave,
	onParentProfileContinue,
	onParentProfileGenderSelect,
	onParentProfileAgeSelect,
	savedProfileGender,
	savedProfileAge,
}: PropsWithChildren<ProfileProps>) => {
	const t_profile = useTranslations("Profile");

	const genderOptions = [
		t_profile("parameter_option_gender_male"),
		t_profile("parameter_option_gender_female"),
		t_profile("parameter_option_gender_other"),
	];

	const ageOptions = [
		"0 - 9",
		"10 - 19",
		"20 - 29",
		"30 - 39",
		"40 - 49",
		"50+",
	];

	async function handleProfileSave() {
		onParentProfileSave();
		//Show notification
		showSaveNotification(true);
		// Hide notification after 2.5 seconds
		setTimeout(() => showSaveNotification(false), 2500);
	}

	function showSaveNotification(enable: boolean) {
		const notificationElement =
			document.getElementById("save_notification");

		if (notificationElement != null) {
			if (enable) {
				notificationElement.innerText = t_profile("save_notification");
			} else {
				notificationElement.innerText = "";
			}
		}
	}

	return (
		<>
			<p className="font-black text-center text-2xl lg:text-3xl">
				{t_profile("page_title")}
			</p>
			<div className="mainarea_width">
				<div className="profile_selection_area">
					{/* Gender menu */}
					<div>
						<div className="parameter_title_dropmenu text-center">
							{t_profile("parameter_title_gender")}
						</div>
						<div className="horizontal_center dropmenu_width">
							<DropMenu
								onParentHandleSelect={
									onParentProfileGenderSelect
								}
								savedIndex={savedProfileGender}
								menuOptions={genderOptions}
							/>
						</div>
					</div>
					<div className="profile_dropmenu_separator"></div>
					{/* Age menu */}
					<div>
						<div className="parameter_title_dropmenu text-center">
							{t_profile("parameter_title_age")}
						</div>
						<div className="horizontal_center dropmenu_width">
							<DropMenu
								onParentHandleSelect={onParentProfileAgeSelect}
								savedIndex={savedProfileAge}
								menuOptions={ageOptions}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="mainarea_width flex-grow">
				<div className="profile_confirmation_area">
					{/* Save button */}
					<div>
						<div
							id="save_notification"
							className="absolute inline -mt-8 notification_visual button_width text-center"
						></div>
						<button
							className="button_visual button_width button_height"
							onClick={handleProfileSave}
						>
							{t_profile("button_save")}
						</button>
					</div>
					<div className="profile_button_separator"></div>
					{/* Continue button */}
					<button
						className="button_visual button_width button_height"
						onClick={onParentProfileContinue}
					>
						{t_profile("button_continue")}
					</button>
				</div>
			</div>
		</>
	);
};
