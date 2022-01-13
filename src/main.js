import { createApp } from "vue";
import { createWebHistory } from "vue-router";
import createRouter from "./route";
import "amfe-flexible";
import App from "./App.vue";
import { showToast } from "@/utils/extend.js";

const app = createApp(App);
const routes = createRouter(createWebHistory());
app.config.globalProperties.$toast = showToast;
app.use(routes).mount("#app");
