import type { TimelineItem } from "../components/features/timeline/types";

const timelineFiles = import.meta.glob("../content/timeline/*.json", { eager: true });

export const timelineData: TimelineItem[] = Object.entries(timelineFiles).map(([filePath, fileContent]: [string, any]) => {
	const data = fileContent.default;
	const id = filePath.split('/').pop()?.replace('.json', '') || data.title;
	return {
		id,
		...data
	} as TimelineItem;
}).sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
