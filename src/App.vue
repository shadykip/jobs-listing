
<!-- Composition Api -->
<script setup>
import Navbar from '@/components/Navbar.vue'
import {RouterView} from 'vue-router'
import { onMounted } from 'vue';
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
onMounted(() => {
  userStore.checkAuthState();
});
</script>
<template>
    <Navbar/>
    <RouterView/>
</template>


