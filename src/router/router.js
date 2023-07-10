import MainPage from "@/pages/MainPage";
import PostPage from "@/pages/PostPage";
import {createRouter, createWebHashHistory} from "vue-router/dist/vue-router";
import PostIdPage from "@/pages/PostIdPage";

const routes = [
    { path: '/', component: MainPage },
    { path: '/posts', component: PostPage },
    { path: '/posts/:id', component: PostIdPage },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
