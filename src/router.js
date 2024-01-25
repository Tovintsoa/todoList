import { createWebHistory, createRouter } from 'vue-router';
import index from "@/pages/index.vue";
const routes = [
    {
        path: '/',
        name :'list_todolist',
        component: index,
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;