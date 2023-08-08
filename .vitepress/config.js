import { defineConfig } from "vitepress";
import { sidebar } from "./plugin/sidebar";
import { nav } from "./plugin/nav";
export default defineConfig({
  title: "孔大夫",
  outDir: "./dist",

  themeConfig: {
    nav: nav,
    sidebar: sidebar,
    lastUpdated: true,
    lastUpdatedText: "更新时间",
    outline: { level: [1, 6], label: "目录" },
    socialLinks: [{ icon: "github", link: "https://github.com/kongdf" }],
  },
});
