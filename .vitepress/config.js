import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  title: "孔大夫",
  description: "孔大夫写博客的地方",
  // head: [['link', { rel: 'icon', href: '/static/images/logo.png' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "JS", link: "/docs/js/1" },
      {
        text: "Rust",
        items: [
          {
            text: "Rust学习笔记",
            link: "/docs/rust/notes/0_introduce/1",
          },
        ],
      },
      { text: "关于", link: "" },
    ],
    sidebar: {
      "/docs/js/": [{ text: "JS", link: "/docs/js/1" }],
      "/docs/rust/notes/": [
        {
          text: "Rust学习笔记",
          link: "",
          items: [
            {
              text: "关于Rust",
              link: "/docs/rust/notes/0_introduce/1",
            },
            { text: "教程资源", link: "/docs/rust/notes/0_introduce/3" },
            { text: "快速上手", link: "/docs/rust/notes/0_introduce/2" },
            {
              text: "语法基础",
              link: "",
              items: [
                {
                  text: "变量绑定与解构",
                  link: "/docs/rust/notes/1_elements_of_grammar/1",
                },
                {
                  text: "基本类型",
                  link: "/docs/rust/notes/1_elements_of_grammar/2",
                },
                {
                  text: "所有权",
                  link: "/docs/rust/notes/1_elements_of_grammar/3",
                },
                {
                  text: "复合类型",
                  link: "/docs/rust/notes/1_elements_of_grammar/4",
                },
                {
                  text: "流程控制",
                  link: "/docs/rust/notes/1_elements_of_grammar/5",
                },
                {
                  text: "模式匹配",
                  link: "/docs/rust/notes/1_elements_of_grammar/6",
                },
              ],
            },
          ],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/kongdf" }],
  },
});
