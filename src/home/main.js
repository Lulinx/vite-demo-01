import { createApp } from "vue";
import App from "./App.vue";
import "amfe-flexible";
import { showToast } from "@/utils/extend.js";
const app = createApp(App);
app.config.globalProperties.$toast = showToast;
app.mount("#app");
