// Skill data configuration file
// Used to manage data for the skill display page

export interface Skill {
	id: string;
	name: string;
	description: string;
	icon: string; // Iconify icon name
	category: "frontend" | "backend" | "database" | "tools" | "other";
	level: "beginner" | "intermediate" | "advanced" | "expert";
	experience: {
		years: number;
		months: number;
	};
	projects?: string[]; // Related project IDs
	certifications?: string[];
	color?: string; // Skill card theme color
}

const skillFiles = import.meta.glob("../content/skills/*.json", { eager: true });

export const skillsData: Skill[] = Object.entries(skillFiles).map(([filePath, fileContent]: [string, any]) => {
	const data = fileContent.default;
	const id = filePath.split('/').pop()?.replace('.json', '') || data.name;
	return {
		id,
		name: data.name,
		description: data.description,
		icon: data.icon,
		category: data.category,
		level: data.level,
		experience: {
			years: data.experienceYears || 0,
			months: data.experienceMonths || 0,
		},
		projects: data.projects || [],
		certifications: data.certifications || [],
		color: data.color
	} as Skill;
});
