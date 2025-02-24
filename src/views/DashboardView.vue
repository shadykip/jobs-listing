<script setup>
import { onMounted } from 'vue';
import { useNavStore } from '@/stores/nav';

const navStore = useNavStore();

onMounted(() => {
    navStore.toggleDrawer(false);
    console.log(navStore.isDrawerOpen)
});
</script>
<template>
    <h1>Dashboard</h1>
</template>