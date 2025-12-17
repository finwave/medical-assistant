"use client";

import { PropsWithChildren } from "react";
import { DropMenu } from "@/components/dropmenu";

type MenuProps = {
	title: string;
	savedIndex: number;
	menuOptions: string[];
	onParentHandleSelect: (index: number) => void;
};

export const ProfileDropMenu = ({
	title,
	savedIndex,
	menuOptions,
	onParentHandleSelect,
}: PropsWithChildren<MenuProps>) => {
	return (
		<div className="inline-flex">
			<span className="profile_dropmenu_title">{title}</span>
			<span className="profile_dropmenu_title_gap" />
			<span className="profile_dropmenu_content">
				<DropMenu
					onParentHandleSelect={onParentHandleSelect}
					savedIndex={savedIndex}
					menuOptions={menuOptions}
				/>
			</span>
		</div>
	);
};
