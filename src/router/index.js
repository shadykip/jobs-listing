import { createRouter,createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import JobsView from "@/views/JobsView.vue";
import FourOFourView from "@/views/FourOFourView.vue";
import JobView from "@/views/JobView.vue";
import AddJobView from "@/views/AddJobView.vue";
import EditJob from "@/views/EditJob.vue";
import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";

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
            path:'/jobs/add',
            name: 'add-job',
            component: AddJobView
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
            path: '/:catchAll(.*)*',
            name: '404',
            component: FourOFourView
        }
    ]
});

export default router;