<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { reactive, onMounted } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { useUserStore } from '@/stores/user';
import { useToast } from 'vue-toastification';

const router = useRouter();

const userStore = useUserStore();

const toast = useToast();
const state = reactive({
    user: {
        email: '',
        password: '',
        rememberMe: false
    },
    error: null,
    isLoading: false,
    loggedInUser: null
})
const handleLogin = async () => {
    state.isLoading = true;
    state.error = null;

    try {
        await userStore.login(state.user.email, state.user.password);
        console.log(userStore.user)
        if (userStore.isAuthenticated) {
            router.push("/dashboard"); // Navigate to Dashboard after successful login
        }
    } catch (error) {
        state.error = "Invalid credentials. Please try again.";
        toast.error = "Invalid credentials. Please try again."
    } finally {
        state.isLoading = false;
    }

}
onMounted(() => {
    if (userStore.isAuthenticated) {
        router.push('/dashboard');
    }
});
</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
            <h2 class="text-2xl font-semibold text-center mb-6">Login</h2>
            <form @submit.prevent="handleLogin" class="space-y-4">
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input v-model="state.user.email" type="email" id="email"
                        class="mt-1 w-full p-2 border border-green-300 rounded-lg focus:ring focus:ring-green-300 focus:border-green-500"
                        required />
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <input v-model="state.user.password" type="password" id="password"
                        class="mt-1 w-full p-2 border border-green-300 rounded-lg focus:ring focus:ring-green-300 focus:border-green-500"
                        required />
                </div>
                <!-- forgot password -->
                <div class="flex items-center justify-end gap-2">
                    <a href="#" class="text-sm text-gray-600 hover:text-green-800">Forgot Password?</a>
                </div>
                <!-- /forgot password -->
                <div class="text-center">
                    <PulseLoader v-if="userStore.isLoading" />
                    <button v-else type="submit" :disabled="userStore.isLoading"
                        class="w-full py-3 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none">Login</button>
                </div>
                <p class="text-center text-sm text-gray-600 mt-4">Don't have an account? <RouterLink to="/auth/signup"
                        class="font-medium underline">Register</RouterLink>
                </p>
            </form>
        </div>
    </div>
</template>