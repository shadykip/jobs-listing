<script setup>
import { computed } from "vue";
import { useUserStore } from '@/stores/user';
import { useRoute } from "vue-router";
import { useNavStore } from "@/stores/nav";
import Logo from "./Logo.vue";
const userStore = useUserStore();
const navStore = useNavStore();
const route = useRoute();

// Determine if the user is on dashboard routes
const isDashboard = computed(() => route.path.startsWith("/dashboard"));

const navLinkClasses = (path) => [
    route.path === path ? "bg-green-900" : "hover:bg-green-900",
    "text-white",
    "hover:text-white",
    "rounded-md",
    "px-3",
    "py-2",
];
const toggleSidebar = () => {
    const status = navStore.isDrawerOpen
    navStore.toggleDrawer(!status);
}
</script>
<template>
    <!-- Sidebar for dashboard -->
    <aside :class="[
        'bg-green-800 text-white h-full md:p-4  fixed md:static',
        navStore.isDrawerOpen ? 'w-64' : 'w-0',
        'overflow-hidden transition-all duration-300'
    ]" v-if="isDashboard" class="bg-green-800 text-white h-full md:p-4">
        <div class="flex items-center justify-between">
            <div class="p-4 mb-4">
                <Logo brand="Vue Jobs" />
                <!-- <h2 class="text-2xl font-bold p-4 mb-4">Dashboard</h2> -->
            </div>
            <div class="md:hidden">
                <button @click="toggleSidebar" class="mr-3 p-4 mb-4">
                    <i class="pi pi-times"></i>
                </button>
            </div>
        </div>
        <nav class="flex flex-col p-4 space-y-2">
            <RouterLink to="/dashboard" :class="navLinkClasses('/dashboard')">Dashboard</RouterLink>
            <RouterLink to="/dashboard/jobs" :class="navLinkClasses('/dashboard/my-profile')">My Profile</RouterLink>
            <RouterLink to="/dashboard/jobs" :class="navLinkClasses('/dashboard/jobs')">My Jobs</RouterLink>
            <RouterLink to="/dashboard/settings" :class="navLinkClasses('/dashboard/settings')">Settings</RouterLink>
            <button @click="userStore.logout" class="bg-green-700 px-4 py-2 rounded-md">Logout</button>
        </nav>
    </aside>

</template>