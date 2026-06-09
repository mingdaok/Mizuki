import type { CommentConfig } from "../types/config";
import { SITE_LANG } from "./siteConfig";

// 评论系统配置
export const commentConfig: CommentConfig = {
	enable: true, // 启用评论功能。当设置为 false 时，评论组件将不会显示在文章区域。
	system: "giscus", // 评论系统选择: "twikoo" | "giscus"
	twikoo: {
		envId: "https://twikoo.vercel.app",
		lang: SITE_LANG,
	},
	giscus: {
		repo: "mingdaok/My-blog",
		repoId: "R_kgDOSzmWVA",
		category: "Announcements",
		categoryId: "", // 如果评论加载失败，可能需要补充这个字段
		mapping: "pathname",
		strict: "0",
		reactionsEnabled: "1",
		emitMetadata: "0",
		inputPosition: "top",
		theme: "preferred_color_scheme",
		lang: SITE_LANG,
		loading: "lazy",
	},
};
