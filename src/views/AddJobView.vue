<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const router = useRouter();
const toast = useToast();

// Form State
const form = reactive({
    type: "Full-Time",
    title: "",
    category: "",
    description: "",
    vacancies: "",
    salary: "",
    deadline: "",
    location: "",
    company: {
        name: "",
        description: "",
        contactEmail: "",
        contactPhone: "",
        logo: null,
    }
});

// Error State
const errors = reactive({});

// Validation Function
const validateForm = () => {
    errors.title = !form.title ? "Job title is required" : "";
    errors.category = !form.category ? "Category is required" : "";
    errors.description = !form.description ? "Description is required" : "";
    errors.vacancies = !form.vacancies ? "Vacancies are required" : "";
    errors.salary = !form.salary ? "Salary is required" : "";
    errors.deadline = !form.deadline ? "Deadline is required" : "";
    errors.location = !form.location ? "Location is required" : "";

    errors.companyName = !form.company.name ? "Company name is required" : "";
    errors.companyDescription = !form.company.description ? "Company description is required" : "";
    errors.contactEmail = !form.company.contactEmail ? "Contact email is required" : "";
    errors.contactPhone = !form.company.contactPhone ? "Contact phone is required" : "";
    errors.logo = !form.company.logo ? "Company logo is required" : "";

    // Check if there are any errors
    return Object.values(errors).every(error => !error);
};

// Handle File Upload
const handleFileChange = (event) => {
    const file = event.target.files[0];
    form.company.logo = file ? file : null;
};

// Handle Form Submission
const handleSubmit = async () => {
    if (!validateForm()) {
        toast.error("Please correct the errors before submitting.");
        return;
    }

    // Prepare FormData for file upload
    const formData = new FormData();
    formData.append("type", form.type);
    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("description", form.description);
    formData.append("vacancies", form.vacancies);
    formData.append("salary", form.salary);
    formData.append("deadline", form.deadline);
    formData.append("location", form.location);
    formData.append("company[name]", form.company.name);
    formData.append("company[description]", form.company.description);
    formData.append("company[contactEmail]", form.company.contactEmail);
    formData.append("company[contactPhone]", form.company.contactPhone);
    if (form.company.logo) {
        formData.append("company[logo]", form.company.logo);
    }

    try {
        const response = await axios.post('/api/jobs', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        toast.success('Job added successfully!');
        router.push(`/jobs/${response.data.id}`);
    } catch (error) {
        toast.error(error.response?.data?.message || 'Error adding job. Please try again.');
    }
};
</script>

<template>
    <section class="bg-green-50">
        <div class="container m-auto max-w-2xl py-24">
            <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <form @submit.prevent="handleSubmit">
                    <h2 class="text-3xl text-center font-semibold mb-6">Add Job</h2>

                    <div class="mb-4">
                        <label for="type" class="block text-gray-700 font-bold mb-2">Job Type</label>
                        <select id="type" v-model="form.type" class="border rounded w-full py-2 px-3">
                            <option value="Full-Time">Full-Time</option>
                            <option value="Part-Time">Part-Time</option>
                            <option value="Remote">Remote</option>
                            <option value="Internship">Internship</option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Job Title</label>
                        <input type="text" v-model="form.title" class="border rounded w-full py-2 px-3 mb-2" placeholder="e.g. Software Developer" />
                        <p v-if="errors.title" class="text-red-500">{{ errors.title }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Job Category</label>
                        <input type="text" v-model="form.category" class="border rounded w-full py-2 px-3 mb-2" placeholder="e.g. IT & Networking" />
                        <p v-if="errors.category" class="text-red-500">{{ errors.category }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Description</label>
                        <textarea v-model="form.description" class="border rounded w-full py-2 px-3" rows="4"></textarea>
                        <p v-if="errors.description" class="text-red-500">{{ errors.description }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Vacancies</label>
                        <input type="number" v-model="form.vacancies" class="border rounded w-full py-2 px-3 mb-2" />
                        <p v-if="errors.vacancies" class="text-red-500">{{ errors.vacancies }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Deadline</label>
                        <input type="date" v-model="form.deadline" class="border rounded w-full py-2 px-3 mb-2" />
                        <p v-if="errors.deadline" class="text-red-500">{{ errors.deadline }}</p>
                    </div>

                    <h3 class="text-2xl mb-5">Company Info</h3>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Company Name</label>
                        <input type="text" v-model="form.company.name" class="border rounded w-full py-2 px-3" />
                        <p v-if="errors.companyName" class="text-red-500">{{ errors.companyName }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Company Logo</label>
                        <input type="file" @change="handleFileChange" class="border rounded w-full py-2 px-3" />
                        <p v-if="errors.logo" class="text-red-500">{{ errors.logo }}</p>
                    </div>

                    <div>
                        <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full">Add Job</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>
