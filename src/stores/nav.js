import { defineStore } from "pinia";

export const useNavStore = defineStore('nav',{
    state:()=>({
        isDrawerOpen:window.innerWidth >= 768,
    }),
    actions:{
        toggleDrawer(status){
            this.isDrawerOpen = status;
        },
        checkScreenSize() {
            this.isDrawerOpen = window.innerWidth >= 768;
        }
    },
    getters:{
        drawerState:(state)=>!!state.isDrawerOpen
        
    }
 
})