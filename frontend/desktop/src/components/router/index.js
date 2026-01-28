import { createWebHistory, createRouter } from "vue-router";
import Landing from "../Landing/Landing.vue";
import Login from "../Login/Login.vue";
import Home from "../Home/Home.vue";
import Dokumentasi from "../Dokumentasi/Dokumentasi.vue";
import Absen from "../Absen/Absen.vue";
import Schedule from "../Jadwal/Schedule.vue";
import Member from "../Member/Member.vue";

const routes = [
    { 
        path: '/',
        name: "Landing",
        component: Landing
    },
    {
        path: '/login',
        name: "Login",
        component: Login
    },
    {
        path: '/home',
        name: "Home",
        component: Home
    },
    {
        path: '/schedule',
        name: "schedule",
        component: Schedule
    },
    {
        path: '/dokumentasi',
        name: "Dokumentasi",
        component: Dokumentasi
    },
    {
        path: '/absen',
        name: "Absen",
        component: Absen
    },
    {
        path: '/member',
        name: "Member",
        component: Member
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router