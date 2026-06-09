// 本地番剧数据配置
export interface AnimeItem {
	title: string;
	status: "watching" | "completed" | "planned";
	rating: number;
	cover: string;
	description: string;
	episodes: string;
	year: string;
	genre: string[];
	studio: string;
	link: string;
	progress: number;
	totalEpisodes: number;
	startDate: string;
	endDate: string;
}

const animeFiles = import.meta.glob('../content/anime/*.json', { eager: true });
const localAnimeList: AnimeItem[] = Object.values(animeFiles).map((file: any) => file.default);

export default localAnimeList;
