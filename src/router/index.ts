import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  // name属性值不能重复
  {
    path: "/",
    name: "index",
    //组件通过函数导入更规范，而非直接import
    component: () => import("@/views/IndexPage.vue"),
  },
  {
    path: "/:category",
    name: "category",
    //动态路由的参数值，通过$route.params.category获取
    component: import("@/views/IndexPage.vue"),
  },
];

const router = createRouter({
  //新手推荐hash模式
  history: createWebHashHistory(),
  routes,
});

export default router;
