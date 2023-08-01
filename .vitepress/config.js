import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "孔大夫",
  description: "孔大夫写博客的地方",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "JS", link: "" },
      { text: "Rust", link: "/page/Rust/notes/0_introduce/1" },
    ],

    sidebar: [
      {
        text: "Rust",
        items: [
          {
            text: "Rust学习笔记",
            link: "",
            items: [
              {
                text: "关于Rust",
                link: "/page/Rust/notes/0_introduce/1",
              },
              { text: "快速上手", link: "/page/Rust/notes/0_introduce/2" },
              {
                text: "语法基础",
                link: "",
                items: [
                  {
                    text: "变量绑定与解构",
                    link: "/page/Rust/notes/1_elements_of_grammar/1",
                  },  {
                    text: "基本类型",
                    link: "/page/Rust/notes/1_elements_of_grammar/2",
                  }, {
                    text: "所有权",
                    link: "/page/Rust/notes/1_elements_of_grammar/3",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/kongdf" }],
  },
});
