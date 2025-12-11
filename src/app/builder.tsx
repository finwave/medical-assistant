"use client";

import { useState, useEffect } from "react";
import { Page } from "@/types/enums";
import { Profile } from "@/pages/profile";
import { Assistant } from "@/pages/assistant";
import HeaderMenu from "@/app/header";

export default function Builder() {
	const [mounted, setMounted] = useState(false);
	const [page, setPage] = useState(Page.Assistant);

	const [currentProfileGender, setCurrentProfileGender] = useState(-1);
	const [currentProfileAge, setCurrentProfileAge] = useState(-1);
	const [savedProfileGender, setSavedProfileGender] = useState(-1);
	const [savedProfileAge, setSavedProfileAge] = useState(-1);

	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	const onProfileSave = () => {
		setSavedProfileGender(currentProfileGender);
		setSavedProfileAge(currentProfileAge);
	};

	const onProfileContinue = () => {
		setPage(Page.Assistant);
	};

	const onProfileGenderSelect = (index: number) => {
		setCurrentProfileGender(index);
	};

	const onProfileAgeSelect = (index: number) => {
		setCurrentProfileAge(index);
	};

	function showPage(page: Page) {
		return (
			<>
				<HeaderMenu setPage={setPage} />
				{page == Page.Profile ? (
					<Profile
						onParentProfileSave={onProfileSave}
						onParentProfileContinue={onProfileContinue}
						onParentProfileGenderSelect={onProfileGenderSelect}
						onParentProfileAgeSelect={onProfileAgeSelect}
						savedProfileGender={savedProfileGender}
						savedProfileAge={savedProfileAge}
					/>
				) : page == Page.Assistant ? (
					<Assistant
						savedProfileGender={savedProfileGender}
						savedProfileAge={savedProfileAge}
					/>
				) : null}
			</>
		);
	}

	return showPage(page);
}
