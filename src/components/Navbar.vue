<script setup>
import { RouterLink, useRoute } from 'vue-router'
import logo from '@/assets/img/logo.png'
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/user';
import { useNavStore } from '@/stores/nav';

const userStore = useUserStore();
const route = useRoute()
const menuOpen = ref(false);
const navStore = useNavStore()

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const navLinkClasses = (path) => {
  return [
    route.path === path ? "bg-green-900" : "hover:bg-green-900",
    "text-white",
    "hover:text-white",
    "rounded-md",
    "px-3",
    "py-2",
  ];
};

const isDashboard = computed(() => route.path.startsWith("/dashboard"));

const toggleSidebar=()=>{
  const status = navStore.isDrawerOpen
    navStore.toggleDrawer(status ? status : !status);
    console.log(navStore.drawerState)
}


const isLinkActive = (routeName) => {

  return route.path === routeName
}
</script>

<template>
  <div class="flex">

    <!-- Navbar for non-dashboard pages -->
    <nav v-if="!isDashboard" class="bg-green-700 flex-1 border-b border-green-500">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="flex h-20 items-center justify-between">
          <!-- Left Side -->
          <div class="flex items-center space-x-4">
            <!-- Hamburger Menu for small screens -->
            <button @click="toggleMenu" class="md:hidden text-white">
              ☰
            </button>
            <RouterLink to="/" class="flex items-center">
              <img class="h-10 w-auto" :src="logo" alt="Vue Jobs" />
              <span class="hidden md:block text-white text-2xl font-bold ml-2">Vue Jobs</span>
            </RouterLink>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex space-x-2">
            <RouterLink to="/" :class="navLinkClasses('/')">Home</RouterLink>
            <RouterLink to="/jobs" :class="navLinkClasses('/jobs')">Jobs</RouterLink>
            <RouterLink v-if="userStore.isAuthenticated" to="/jobs/add" :class="navLinkClasses('/jobs/add')">
              Add Job
            </RouterLink>
            <span class="px-3 py-2" v-if="!userStore.isAuthenticated">
              <RouterLink to="/auth/login" :class="navLinkClasses('/auth/login')">Login</RouterLink>
              <RouterLink to="/auth/signup" :class="navLinkClasses('/auth/signup')">Signup</RouterLink>
            </span>
            <span class="px-3 py-2" v-else>
              <button @click="userStore.logout" class="hover:bg-green-800 text-white font-bold rounded-md">
                Logout
              </button>
            </span>
          </div>
        </div>
      </div>
    </nav>

    <!-- Mobile Sidebar -->
    <div v-if="menuOpen" class="fixed inset-0 bg-green-800 text-white w-64 h-full p-4 z-50 md:hidden">
      <button @click="toggleMenu" class="absolute top-4 right-4">✖</button>
      <nav class="flex flex-col space-y-4 mt-8">
        <RouterLink to="/" :class="navLinkClasses('/')">Home</RouterLink>
        <RouterLink to="/jobs" :class="navLinkClasses('/jobs')">Jobs</RouterLink>
        <RouterLink v-if="userStore.isAuthenticated" to="/jobs/add" :class="navLinkClasses('/jobs/add')">
          Add Job
        </RouterLink>
        <RouterLink v-if="!userStore.isAuthenticated" to="/auth/login" :class="navLinkClasses('/auth/login')">
          Login
        </RouterLink>
        <RouterLink v-if="!userStore.isAuthenticated" to="/auth/signup" :class="navLinkClasses('/auth/signup')">
          Signup
        </RouterLink>
        <button v-if="userStore.isAuthenticated" @click="userStore.logout" class="bg-green-700 px-4 py-2 rounded-md">
          Logout
        </button>
      </nav>
    </div>
  </div>


  <!-- Dashboard Topbar -->
  <nav v-if="isDashboard" class="bg-gray-100 border-b  border-gray-300 p-4 flex items-center justify-between md:justify-end shadow-sm">
    <!-- Hamburger Button -->
    <button @click="toggleSidebar" class="text-gray-700 md:hidden">
      <i class="pi pi-bars text-2xl"></i>
    </button>

    <!-- Right Icons -->
    <div class="flex items-center space-x-4">
      <!-- Notification Icon -->
      <button class="relative text-gray-700 hover:text-gray-900">
        <i class="pi pi-bell text-2xl"></i>
        <span class="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full">3</span>
      </button>

      <!-- Profile Icon -->
      <button class="flex items-center space-x-2">
        <i class="pi pi-user text-2xl text-gray-700"></i>
        <span class="text-gray-700 font-medium">{{ userStore.user?.name || 'User' }}</span>
      </button>
    </div>
  </nav>



</template>
