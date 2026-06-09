import * as path from "node:path";

import type { AlbumGroup, Photo } from "../types/album";

export async function scanAlbums(): Promise<AlbumGroup[]> {
	const albumsFiles = import.meta.glob("../content/albums/*.json", { eager: true });
	const albums: AlbumGroup[] = [];

	for (const [filePath, fileContent] of Object.entries(albumsFiles)) {
		const info: any = (fileContent as any).default;
		const folderName = info.id || path.basename(filePath, '.json');

		let cover = "";
		const photos: Photo[] = [];

		if (info.photos && Array.isArray(info.photos)) {
			info.photos.forEach((photo: any, index: number) => {
				photos.push({
					id: `${folderName}-photo-${index}`,
					src: photo.image,
					alt: photo.caption || `Photo ${index + 1}`,
					title: photo.caption || `Photo ${index + 1}`,
					tags: photo.tags || [],
					date: info.date || new Date().toISOString().split("T")[0],
				});
			});
			if (photos.length > 0) {
				cover = photos[0].src;
			}
		}

		albums.push({
			id: folderName,
			title: info.title || folderName,
			description: info.description || "",
			cover,
			date: info.date || new Date().toISOString().split("T")[0],
			location: info.location || "",
			tags: info.tags || [],
			photos,
			password: info.password || undefined,
			passwordHint: info.passwordHint || undefined,
		});
	}

	// 按时间倒序排序
	albums.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return albums;
}
