import { createRouter } from "vue-router";
const routes = [
  {
    path: "/",
    component: () => import("v/home/index.vue"),
    name: "home",
  },
  {
    path: "/shop",
    component: () => import("v/shop/index.vue"),
    name: "shop",
  },
  {
    path: "/shopDetail",
    component: () => import("v/shopDetail/index.vue"),
    name: "shopDetail",
  },
];
export default (history) => {
  return createRouter({
    history,
    routes,
  });
};
