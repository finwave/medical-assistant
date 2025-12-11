"use client";

import { useState } from "react";
import { PropsWithChildren } from "react";
import { FaCaretDown } from "react-icons/fa";
import { useTranslations } from "next-intl";

type MenuProps = {
	onParentHandleSelect: (index: number) => void;
	savedIndex: number;
	menuOptions: string[];
};

export const DropMenu = ({
	onParentHandleSelect,
	savedIndex,
	menuOptions,
}: PropsWithChildren<MenuProps>) => {
	const t_profile = useTranslations("Profile");

	const [isOpen, setIsOpen] = useState(false);
	const [isEmptyParameter, setIsEmptyParameter] = useState(true);
	const [optionIndex, setOptionIndex] = useState(-1);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const onHandleSelect = (index: number) => {
		onParentHandleSelect(index);
		setOptionIndex(index);
		setIsEmptyParameter(false);
		setIsOpen(false);
	};

	return (
		<div className="relative inline-block w-full">
			{/* Dropdown button */}
			<button
				type="button"
				className="dropdown_menu_button"
				onClick={toggleDropdown}
			>
				{isEmptyParameter && savedIndex >= 0
					? menuOptions[savedIndex]
					: isEmptyParameter && savedIndex < 0
					? t_profile("parameter_option_select")
					: !isEmptyParameter
					? menuOptions[optionIndex]
					: null}

				<div className="icon_dropmenu">
					<FaCaretDown />
				</div>
			</button>

			{/* Dropdown menu */}
			{isOpen && (
				<div className="dropdown_menu_container">
					<div className="py-1">
						{menuOptions.map((parameter, index) => (
							<a
								key={index}
								href="#"
								className="dropdown_menu_option"
								onClick={() => onHandleSelect(index)}
							>
								{parameter}
							</a>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
