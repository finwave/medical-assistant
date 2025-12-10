"use client";

import { useTranslations } from "next-intl";
import { DropMenu } from "@/components/dropmenu";

export default function Profile() {
	const t_profile = useTranslations("Profile");

	const genreOptions = [
		t_profile("parameter_option_genre_male"),
		t_profile("parameter_option_genre_female"),
		t_profile("parameter_option_genre_other"),
	];

	const ageOptions = [
		"0 - 9",
		"10 - 19",
		"20 - 29",
		"30 - 39",
		"40 - 49",
		"50+",
	];

	return (
		<>
			<p className="font-black text-center text-2xl lg:text-3xl">
				{t_profile("page_title")}
			</p>
			<div className="mainarea_width">
				<div className="flex flex-row items-center justify-center w-full">
					<div className="w-1/2">
						<div className="parameter_title_dropmenu text-center">
							{t_profile("parameter_title_genre")}
						</div>
						<div className="center_dropmenu">
							<DropMenu menuOptions={genreOptions} />
						</div>
					</div>
					<div className="w-1/2">
						<div className="parameter_title_dropmenu text-center">
							{t_profile("parameter_title_age")}
						</div>
						<div className="center_dropmenu">
							<DropMenu menuOptions={ageOptions} />
						</div>
					</div>
				</div>
			</div>
			<div className="mainarea_width flex-grow"></div>
		</>
	);
}
