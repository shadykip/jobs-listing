<script setup>
import { RouterLink } from 'vue-router';
import { reactive,onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { auth, createUserWithEmailAndPassword, collection, setDoc, doc, db } from '@/firebase';
import { useToast } from 'vue-toastification';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { config } from '@/config';



const router = useRouter();

const toast = useToast();

const userStore = useUserStore();

const state = reactive({
  user: {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    gender: '',
    avatar: null,
    password: '',
  },
  isLoading: false,
  error: null,
  loggedInUser: null
});
const profilePhoto = (file) => {
  console.log(file)
}
const handleSignup = async () => {
  try {
    state.isLoading = true;
    const userData = {
      firstname: state.user.firstname,
      lastname: state.user.lastname,
      email: state.user.email,
      phone: state.user.phone,
      gender: state.user.gender,
      avatar: "avatar.jpg",
      password: state.user.password,
    }
    userData.name = state.user.firstname+' '+state.user.lastname
    console.log(userData)
    const response = await axios.post(`${config.API_URL}/auth/register`, userData);
    const resp = response.data;
    state.isLoading = false;
    console.log(resp)
    if(resp.status==='success'){
      toast.success('User signed up successfully');
      router.push('/auth/login')
    }else{
      toast.error('Failed to sign up',resp.message);
    }

    // const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
    // console.log('User signed up:', userCredential.user);
    // // Store user data in Firestore
    // await setDoc(doc(collection(db, "users"), userCredential.user.uid), userData);;
  } catch (error) {
    console.error('Error signing up user:', error);
    toast.error(error.message);
    state.isLoading = false;
  }
}
onMounted(() => {
    if(userStore.isAuthenticated){
        router.push('/dashboard');
    }
});
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
      <h2 class="text-2xl font-semibold text-center mb-6">Sign Up</h2>
      <form @submit.prevent="handleSignup" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="firstname" class="block text-sm font-medium text-gray-700">First Name</label>
            <input v-model="state.user.firstname" placeholder="e.g John" type="text" id="firstname"
              class="mt-1 w-full p-2 border border-gray-300 rounded-lg  focus:border-green-500" required />
          </div>
          <div>
            <label for="lastname" class="block text-sm font-medium text-gray-700">Last Name</label>
            <input v-model="state.user.lastname" placeholder="e.g Doe" type="text" id="lastname"
              class="mt-1 w-full p-2 border border-gray-300 rounded-lg  focus:border-green-500" required />
          </div>
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="state.user.email" type="email" placeholder="e.g john.doe@example.com" id="email"
            class="mt-1 w-full p-2 border border-gray-300 rounded-lg  focus:border-green-500" required />
        </div>
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
          <input v-model="state.user.phone" type="tel" id="phone"
            class="mt-1 w-full p-2 border border-gray-300 rounded-lg  focus:border-green-500" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Gender</label>
          <div class="flex items-center space-x-4">
            <label class="flex items-center">
              <input v-model="state.user.gender" type="radio" name="gender" value="male" class="mr-2" required /> Male
            </label>
            <label class="flex items-center">
              <input v-model="state.user.gender" type="radio" name="gender" value="female" class="mr-2" required />
              Female
            </label>
          </div>
        </div>
        <div>
          <label for="profilePhoto" class="block text-sm font-medium text-gray-700">Profile Photo</label>
          <input type="file" id="profilePhoto" @change="event => state.user.avatar = event.target.files[0]"
            class="mt-1 w-full p-2 border border-gray-300 rounded-lg  focus:border-green-500" />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input v-model="state.user.password" type="password" id="password"
            class="mt-1 w-full p-2 border border-gray-300 rounded-lg  focus:border-green-500" required />
        </div>
        <div>
          <label class="flex items-center">
            <input v-model="state.user.termsAccepted" type="checkbox" class="mr-2" required />
            <span class="text-sm text-gray-700">I accept the terms and conditions</span>
          </label>
        </div>
        <div class="text-center" v-if="state.isLoading">
          <PulseLoader />
        </div>
        <button v-else :disabled="state.isLoading" type="submit"
          class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">

          Signup
          <!-- Show loading spinner while waiting for API response -->
        </button>
      </form>
    </div>
  </div>
</template>