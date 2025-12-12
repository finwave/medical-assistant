"use client";

import "@/styles/profile.css";

import { PropsWithChildren } from "react";
import { useTranslations } from "next-intl";
import { DropMenu } from "@/components/dropmenu";
import { ProfileGenderTids } from "@/data/profile_data";
import { ProfileAgeValues } from "@/data/profile_data";

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
		t_profile(ProfileGenderTids[0]),
		t_profile(ProfileGenderTids[1]),
		t_profile(ProfileGenderTids[2]),
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
						<div className="horizontal_center profile_dropmenu_width">
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
						<div className="horizontal_center profile_dropmenu_width">
							<DropMenu
								onParentHandleSelect={onParentProfileAgeSelect}
								savedIndex={savedProfileAge}
								menuOptions={ProfileAgeValues}
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
