import { createRouter,createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import JobsView from "@/views/JobsView.vue";
import FourOFourView from "@/views/FourOFourView.vue";
import JobView from "@/views/JobView.vue";
import AddJobView from "@/views/AddJobView.vue";
import EditJob from "@/views/EditJob.vue";
import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";
import { useUserStore } from "@/stores/user";

const router = createRouter({
    history: createWebHistory(import.meta.env.Base_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/jobs',
            name: 'jobs',
            component: JobsView
        },
        {
            path:'/jobs/:id',
            name: 'job',
            component:JobView
        },
        {
            path:'/jobs/edit/:id',
            name: 'edit-job',
            component: EditJob
        },
        {
            path:'/auth/login',
            name: 'login',
            component: LoginView
        },
        {
            path:'/auth/signup',
            name: 'signup',
            component: SignupView 
        },
        {
            path:"/dashboard",
            component: () => import('@/views/DashboardView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path:"/dashboard/profile",
            component: () => import('@/views/ProfileView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path:'/dashboard/add-job',
            name: 'add-job',
            component: AddJobView,
            meta: { requiresAuth: true }
        },
        {
            path: '/:catchAll(.*)*',
            name: '404',
            component: FourOFourView
        }
    ]
});
router.beforeEach((to, from, next) => {
    const userStore = useUserStore(); // Access Pinia store
    if (to.meta.requiresAuth && !userStore.isAuthenticated) {
      next("/auth/login"); // Redirect to login if not authenticated
    } else {
      next(); // Proceed normally
    }
  });
export default router;