<script setup>
import jobData from '@/jobs.json'
import { reactive, defineProps, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import JobListing from "@/components/JobListing.vue"
import axios from 'axios'
import PulseSpinner from "vue-spinner/src/PulseLoader.vue"

const state = reactive({
    jobs: [],
    isLoading: true
})
defineProps({
    limit: Number
})
onMounted(async () => {
    try {
        let response = await axios.get(`/api/jobs`);
        state.jobs = response.data;

    } catch (error) {
        console.error('Something went wrong ', error);

    } finally {
        state.isLoading = false;
    }

})
</script>

<template>
    <section class="bg-blue-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
                Current Open Positions
            </h2>
            <div v-if="state.isLoading" class="text-center text-gray-700">
                <PulseSpinner />
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6 sm:gap-y-8">
                <JobListing v-for="job in state.jobs.slice(0, limit || state.jobs.length)" :key="job.id" :job="job">
                </JobListing>
            </div>
        </div>
    </section>
    <section v-if="limit >= 3" class="m-auto max-w-lg my-10 px-6">
        <RouterLink to="/jobs" class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700">View
            All Jobs</RouterLink>
    </section>
</template>