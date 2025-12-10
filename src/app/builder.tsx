"use client";

import { useState, useEffect } from "react";
import { Page } from "@/types/enums";
import HeaderMenu from "@/app/header";
import Profile from "@/pages/profile";
import Assistant from "@/pages/assistant";

export default function Builder() {
	const [mounted, setMounted] = useState(false);
	const [page, setPage] = useState(Page.Assistant);

	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	function showPage(page: Page) {
		return (
			<>
				<HeaderMenu setPage={setPage} />
				{page == Page.Profile ? (
					<Profile />
				) : page == Page.Assistant ? (
					<Assistant />
				) : null}
			</>
		);
	}

	return showPage(page);
}
