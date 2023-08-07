import { defineConfig } from "vitepress";
import { sidebar } from "./plugin/sidebar";
import { nav } from "./plugin/nav";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  // lang: "zh-CN",
  title: "孔大夫",
  outDir: "./dist",
  // description: "孔大夫写博客的地方",
  // head: [['link', { rel: 'icon', href: '/static/images/logo.png' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav:nav,
    sidebar: sidebar,
    lastUpdated: true,
    lastUpdatedText: "更新时间",
    outline: { level: [1, 6], label: "目录" },
    socialLinks: [{ icon: "github", link: "https://github.com/kongdf" }],
  },
});
