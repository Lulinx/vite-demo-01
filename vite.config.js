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
    host: "localhost",
    port: "9090",
    proxy: {
      "/api": {
        target: "https://api.apishop.net", // 所要代理的目标地址
        rewrite: (path) => path.replace(/^\/api/, ""), // 重写传过来的path路径，
        changeOrigin: true,
      },
    },
  },
});
