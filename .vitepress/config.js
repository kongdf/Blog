import { defineConfig } from "vitepress";
// import vuepressPluginAnchorRight from 'vuepress-plugin-anchor-right';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // lang: "zh-CN",
  title: "孔大夫",
  description: "孔大夫写博客的地方",
  // head: [['link', { rel: 'icon', href: '/static/images/logo.png' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      {
        text: "JS",
        items: [
          {
            text: "冴羽系列学习笔记",
            link: "/docs/js/notes/huyu/1",
          },
        ],
      },
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
      "/docs/js/notes/huyu/": [
        { text: "原型与原型链", link: "/docs/js/notes/huyu/1" },
        { text: "作用域和动态作用域", link: "/docs/js/notes/huyu/2" },
        { text: "执行上下文栈", link: "/docs/js/notes/huyu/3" },
        { text: "变量对象", link: "/docs/js/notes/huyu/4" },
        { text: "作用域链", link: "/docs/js/notes/huyu/5" },
        { text: "this", link: "/docs/js/notes/huyu/6" },
        { text: "执行上下文", link: "/docs/js/notes/huyu/7" },
        { text: "闭包", link: "/docs/js/notes/huyu/8" },
        { text: "参数按值传递", link: "/docs/js/notes/huyu/9" },
        { text: "call和apply的模拟实现", link: "/docs/js/notes/huyu/10" },
        { text: "bind的模拟实现", link: "/docs/js/notes/huyu/11" },
        { text: "new的模拟实现", link: "/docs/js/notes/huyu/12" },
        { text: "类数组对象与arguments", link: "/docs/js/notes/huyu/13" },
        {
          text: "创建对象的多种方式以及优缺点",
          link: "/docs/js/notes/huyu/14",
        },
        { text: "继承的多种方式以及优缺点", link: "/docs/js/notes/huyu/15" },
        { text: "类型转换", link: "/docs/js/notes/huyu/16" },
        { text: "防抖与节流", link: "/docs/js/notes/huyu/17" },
      ],

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
              collapsed: true,
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
                {
                  text: "方法 Method",
                  link: "/docs/rust/notes/1_elements_of_grammar/7",
                },
                {
                  text: "泛型和特征",
                  link: "/docs/rust/notes/1_elements_of_grammar/8",
                },
              ],
            },
          ],
        },
      ],
    },
    lastUpdated: true,
    lastUpdatedText: "更新时间",
    outline: { level: [1, 6], label: "目录" },
    socialLinks: [{ icon: "github", link: "https://github.com/kongdf" }],
  },
});
