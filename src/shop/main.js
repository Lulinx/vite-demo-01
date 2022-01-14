import { createApp } from "vue";
import { createWebHashHistory } from "vue-router";
import createRouter from "./route/index";
import "amfe-flexible";
import App from "./App.vue";
import { showToast } from "@/utils/extend.js";
import { Cell,List, CellGroup } from 'vant';
const app = createApp(App);
const routes = createRouter(createWebHashHistory("/index.html"));
app.config.globalProperties.$toast = showToast;
app.use(routes).
use(Cell).use(List).use(CellGroup).
mount("#app");
