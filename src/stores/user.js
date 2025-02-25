import { defineStore } from "pinia";
import { auth,signInWithEmailAndPassword,signOut,onAuthStateChanged } from "@/firebase";
import router from "@/router";
import api, { getCsrfCookie, setAuthToken } from "@/api";
import { useToast } from "vue-toastification";
const toast = useToast()
export const useUserStore = defineStore("user",{
    state:()=>({
        user:JSON.parse(localStorage.getItem("user")) || null,
        isLoading:false,
        error:null 
    }),
    actions:{
        async login(email,password){
            this.isLoading=true;
            this.error = null;
            try {
              await getCsrfCookie()
              
              const response = await api.post("/auth/login", {
                email,
                password,
            });
            if(response.data.code===401){
              toast.error('Wrong email or password')
              return;
            }
            const userCredential = response.data;
             this.user = userCredential.user;
              localStorage.setItem("user", JSON.stringify(this.user));
              localStorage.setItem("token",userCredential.token);
                // const userCredential = await signInWithEmailAndPassword(auth, email, password);
                // this.user = userCredential.user;
                // localStorage.setItem("user", JSON.stringify(this.user));
                console.log(userCredential.user)
            } catch (error) {
                this.error = error.message;
              } finally {
                this.isLoading = false;
              }
        },
        async logout(){
            this.isLoading=true;
            this.error = null;
            try {
                // await signOut(auth);
                const response = await api.post(`/auth/logout`)
                this.user = null;
                localStorage.removeItem("user");
                router.push("/auth/login");
            } catch (error) {
                this.error = error.message;
              } finally {
                this.isLoading = false;
              }
        },
        //check session
       async checkAuthState(){
            try {
              let token = localStorage.getItem("token");
               setAuthToken(token);
                const response = await api.get("/user");
                return response.data;
            } catch (error) {
                console.error("Unauthorized", error);
                return null;
            }
        

            // onAuthStateChanged(auth, (user) => {
            //     if (user) {
            //       this.user = user;
            //       localStorage.setItem("user", JSON.stringify(this.user));
            //     } else {
            //       this.user = null;
            //       localStorage.removeItem("user");
            //     }
            //   });
        },
       
    },
    getters: {
        isAuthenticated: (state) => !!state.user,
      },
})
