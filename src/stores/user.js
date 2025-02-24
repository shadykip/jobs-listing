import { defineStore } from "pinia";
import { auth,signInWithEmailAndPassword,signOut,onAuthStateChanged } from "@/firebase";
import router from "@/router";
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
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                this.user = userCredential.user;
                localStorage.setItem("user", JSON.stringify(this.user));
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
                await signOut(auth);
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
        checkAuthState(){
            onAuthStateChanged(auth, (user) => {
                if (user) {
                  this.user = user;
                  localStorage.setItem("user", JSON.stringify(this.user));
                } else {
                  this.user = null;
                  localStorage.removeItem("user");
                }
              });
        },
       
    },
    getters: {
        isAuthenticated: (state) => !!state.user,
      },
})