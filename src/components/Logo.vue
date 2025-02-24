<script setup>
import { RouterLink } from 'vue-router';
import { defineProps } from 'vue';
import logo from '@/assets/img/logo.png'

defineProps({
  brand: { type: String, default:"" }
});
</script>
<template>

<RouterLink to="/" class="flex items-center">
              <img class="h-10 w-auto" :src="logo" alt="Vue Jobs" />
              <span class="hidden md:block text-white text-2xl font-bold ml-2">{{ brand }}</span>
            </RouterLink>
</template>