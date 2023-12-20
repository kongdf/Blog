const rust_notes = [
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
          }, {
            text: "集合类型",
            link: "/docs/rust/notes/1_elements_of_grammar/9",
          },
        ],
      },
    ],
  },
];

const js_huyu = [
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
];

const js_chat = [
  { text: "聊聊es7-13", link: "/docs/js/chat/es7" },
  { text: "聊聊MVVM", link: "/docs/js/chat/mvvm" },
  { text: "聊聊JS的内存管理", link: "/docs/js/chat/gc" },
  { text: "聊聊http", link: "/docs/js/chat/http" },
  { text: "聊聊promise", link: "/docs/js/chat/promise" },
  { text: "聊聊JS的运行机制", link: "/docs/js/chat/runjs" },
  { text: "聊聊worker", link: "/docs/js/chat/worker" },
];
const js_interview = [
  { text: "八股文", link: "/docs/js/interview/eightpart" },

];
const js_sourcecode = [
  {
    text: "vue",
    link: "",
    collapsed: true,
    items: [
      {
        text: "vue3中的ref是否是reactive",
        link: "/docs/js/sourcecode/vue/vue3ref",
      },
    ],
  },
];

const tool_git = [
  { text: "常用命令", link: "/docs/tool/git/always" },

  {
    text: "coding代码提交时推送github",
    link: "/docs/tool/git/codingAndGithub",
  },
  { text: "删除x天之前的分支", link: "/docs/tool/git/deleteBranch" },
];

export const sidebar = {
  "/docs/js/notes/huyu/": js_huyu,
  "/docs/js/chat/": js_chat,
  "/docs/js/sourcecode/": js_sourcecode,
  "/docs/js/interview/": js_interview,
  "/docs/rust/notes/": rust_notes,
  "/docs/tool/git/": tool_git,



};
