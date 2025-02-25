<script setup>
const handleSubmit =async()=>{}
</script>
<template>
    <section class="bg-green-50">
        <div class="container m-auto max-w-3xl py-12">
            <div class="bg-white px-6 py-8 mb-4 shadow-md rounded border m-4 md:m-0">
                <h2 class="text-3xl  font-semibold mb-6">Edit Profile</h2>
                <form @submit.prevent="handleSubmit"></form>
            </div>
        </div>
    </section>
</template>