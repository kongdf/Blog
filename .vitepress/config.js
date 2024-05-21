// import { defineConfig } from "vitepress";
import { sidebar } from "./plugin/sidebar";
import { nav } from "./plugin/nav";
import mdItCustomAttrs  from 'markdown-it-custom-attrs'
export default {
  title: "孔大夫",
  outDir: "./dist",
  head:[
    [
        "link",
        { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css" },
    ],
    ["script", { src: "https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js" }],
 
    ['script', {
      async: 'async', 
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4637064136028279',
      crossorigin: 'anonymous',
  }],


],
  themeConfig: {
    nav: nav,
    sidebar: sidebar,
    lastUpdated: true,
    lastUpdatedText: "更新时间",
    outline: { level: [1, 6], label: "目录" },
    socialLinks: [
      { icon: "github", link: "https://github.com/kongdf" },
      // { icon: "zhihu", link: "https://github.com/kongdf" }
    ],
    footer: {
      message:
        '<a href="https://beian.miit.gov.cn"><span>辽ICP备17012156号-2</span></a>',
      copyright: `<a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=21100502000123" ><span><img style="display:inline-block;    position: relative;top: 3px;"   src='https://img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png' width='20' height='20'> 辽公网安备 21100502000123号</span></a> `,
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
  },
  markdown:{
    config: (md) => {
        // use more markdown-it plugins!
        md.use(mdItCustomAttrs, 'image', {
            'data-fancybox': "gallery"
        })
        }
    }
};
