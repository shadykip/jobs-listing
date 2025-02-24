<script setup>
import { onMounted } from 'vue';
import { useNavStore } from '@/stores/nav';

const navStore = useNavStore();

onMounted(() => {
    navStore.toggleDrawer(false);
   
});
</script>
<template>
    <h1>Dashboard</h1>
</template>