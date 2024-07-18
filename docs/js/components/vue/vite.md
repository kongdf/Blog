---
aside: false
editLink: true
---

vite.config.js
```js
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import VueDevTools from "vite-plugin-vue-devtools";
export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    return defineConfig({
        plugins: [
            vue(),
            VueSetupExtend(),
            VueDevTools(),
            AutoImport({
                resolvers: [ElementPlusResolver()],
                imports: ["vue", "vue-router"],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
        resolve: {
            alias: [
                {
                    find: "@",
                    replacement: resolve(__dirname, "src"),
                },
            ],
        },

        server: {
            hmr: true,
            proxy: {
                // 登录代理
                "/yunqucti": {
                    target: env.VITE_APP_YZL_CTI_YQ, 
                    rewrite: (path) => path.replace(/^\/yunqucti/, ""),
                    changeOrigin: true,
                    ws: true,
                },
                // 登录代理
                "/oauth": {
                    target: env.VITE_APP_YZL_URL,
                    changeOrigin: true,
                },
                
            },
        },
        build: {
            assetsInlineLimit: 4096,
            sourcemap: false,
        },
    });
};

```