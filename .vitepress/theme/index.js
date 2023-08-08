// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import Theme from "vitepress/theme";
import "./style.css";

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      
    });
  },
  enhanceApp({ app, router, siteData }) {
    
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState == "hidden") {
        document.title = "老铁别走 😭";
      } else if (document.visibilityState == "visible") {
        document.title = router.route.data.title || "孔大夫写博客的地方";
      }
    });
  },
};
