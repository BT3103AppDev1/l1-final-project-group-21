import { createRouter, createWebHistory } from "vue-router";
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import Analytics from '@/views/Analytics.vue'
import Budget from '@/views/Budget.vue'
import Profile from '@/views/Profile.vue'

const routes = [
    {
        path: '/',
        name: "Login",
        component: Login
    },
    {
        path: '/dashboard',
        name: "Dashboard",
        component: Dashboard
    },
    {
        path: '/analytics',
        name: "Analytics",
        component: Analytics
    },
    {
        path: '/budget',
        name: "Budget",
        component: Budget
    },
    {
        path: '/profile',
        name: "Profile",
        component: Profile
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router