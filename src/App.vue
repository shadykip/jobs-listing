<!-- Composition Api -->
<script setup>
import Navbar from '@/components/Navbar.vue'
import { RouterView } from 'vue-router'
import { onMounted } from 'vue';
import { useUserStore } from "@/stores/user";
import Sidebar from '@/components/Sidebar.vue';
import { useNavStore } from '@/stores/nav';

const userStore = useUserStore();
const navStore = useNavStore()
const handleResize = () => {
    navStore.checkScreenSize();
};
onMounted(() => {
    userStore.checkAuthState();
    handleResize();
});
</script>
<template>
    <div class="flex h-screen">
        <Sidebar/>
        <!-- Main Content -->
        <div class="flex-1 md:ml-64">
            <Navbar />
            <div class="p-4">
                <RouterView />
            </div>
        </div>

    </div>
</template>
