import { createApp } from "vue";
import { createWebHistory } from "vue-router";
import createRouter from "./route";
import "amfe-flexible";
import App from "./App.vue";
import { showToast } from "@/utils/extend.js";
import { Cell,List, CellGroup } from 'vant';
const app = createApp(App);
const routes = createRouter(createWebHistory());
app.config.globalProperties.$toast = showToast;
app.use(routes).
use(Cell).use(List).use(CellGroup).
mount("#app");
