import Builder from "@/app/builder";

export default function Home() {
	return (
		<div
			className="bg-gray-100 dark:bg-gray-900 text-black dark:text-gray-50
        font-[family-name:var(--font-geist-sans)] text-sm lg:text-base page_area"
		>
			<Builder />
		</div>
	);
}
