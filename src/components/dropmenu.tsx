"use client";

import { useState } from "react";
import { PropsWithChildren } from "react";
import { FaCaretDown } from "react-icons/fa";
import { useTranslations } from "next-intl";

type MenuProps = {
	menuOptions: string[];
};

export const DropMenu = ({ menuOptions }: PropsWithChildren<MenuProps>) => {
	const t_profile = useTranslations("Profile");

	const [isOpen, setIsOpen] = useState(false);
	const [isEmptyParameter, setIsEmptyParameter] = useState(true);
	const [optionIndex, setOptionIndex] = useState(-1);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleSelect = (index: number) => {
		setOptionIndex(index);
		setIsEmptyParameter(false);
		setIsOpen(false);
	};

	return (
		<div className="relative inline-block w-full">
			{/* Dropdown button */}
			<button
				type="button"
				className=" inline-flex justify-center w-full
                    rounded-md border border-gray-300
                    shadow-sm px-4 py-2 bg-white text-sm
                    font-medium text-black hover:bg-gray-50"
				onClick={toggleDropdown}
			>
				{isEmptyParameter && t_profile("parameter_option_select")}
				{!isEmptyParameter && menuOptions[optionIndex]}
				<div className="icon_dropmenu">
					<FaCaretDown />
				</div>
			</button>

			{/* Dropdown menu */}
			{isOpen && (
				<div
					className=" origin-top-right absolute
                      right-0 mt-2 w-full rounded-md
                      shadow-lg bg-white ring-1 ring-black
                      ring-opacity-5 focus:outline-none"
				>
					<div className="py-1">
						{menuOptions.map((parameter, index) => (
							<a
								key={index}
								href="#"
								className="block px-4 py-2
                                               text-sm text-black
                                               hover:bg-gray-100"
								onClick={() => handleSelect(index)}
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
