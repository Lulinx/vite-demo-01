import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import styleImport from "vite-plugin-style-import";
import postCssPxToRem from "postcss-pxtorem";
const { resolve } = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  alias: {
    root: resolve(__dirname, ""),
    "@": resolve(__dirname, "src"),
    v: resolve(__dirname, "src/components"),
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue({ file }) {
            return file.indexOf("vant") !== -1 ? 37.5 : 75;
          }, // 1rem的大小
          propList: ["*"], // 需要转换的属性，这里选择全部都进行转换
        }),
      ],
    },
  },
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: "vant",
          esModule: true,
          resolveStyle: (name) => `vant/es/${name}/style`,
        },
      ],
    }),
  ],
  server: {
    // 是否自动打开浏览器
    open: true,
    host: "localhost",
    port: "9090",
    // 设为 true ,若端口已被占用则会直接退出，而不是尝试下一个可用端口
    strictPort: false,
    // 为开发服务器配置 CORS
    cors: true,
    // 设置为 true 强制使依赖预构建
    force: true,
    //代理
    proxy: {
      "/common": {
        target: "https://api.apishop.net", // 所要代理的目标地址
        rewrite: (path) => path.replace(/^\/api/, "/common"), // 重写传过来的path路径，
        changeOrigin: true,
      },
    },
  },
});
