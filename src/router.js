import { createWebHistory, createRouter } from "vue-router";
import Index from "@/views/Index.vue";
import Projects from "@/views/Projects.vue";

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    meta: {
      title: 'Kei',
    },
  },
  {
    path: "/projects",
    name: "Projects",
    component: Projects,
    meta: {
      title: 'Kei | Projects',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
