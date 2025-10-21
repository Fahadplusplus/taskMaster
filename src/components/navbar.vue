<template>
    <div class=" w-full shadow flex items-center py-2 ">
        <div class="px-1" @click="ui.toggleSidebar"> <img v-if="isClose" @click="sideBarClose"  class="h-6 " src="/src/assets/arrow-left-solid-full.svg" alt=""> </div>
        <div class="px-1" @click="ui.toggleSidebar"> <img v-if="isOpen" @click="sideBarOpen" class="h-6 " src="/src/assets/arrow-right-solid-full.svg" alt=""> </div>
        <div>
            
             <p >Tasks</p> 
        </div>
        <div class="w-full flex justify-center">
             <input class=" w-28 mx-2 border px-2 border-gray-300 2xl:text-2xl rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" type="text">
            <button class="border border-gray-300 px-2 rounded text-blue-600 text-md">+</button>
         </div>
         <div  class="bg-black  rounded-full">
            pro
            
         </div>
    </div>
   
</template>

<script setup>
import { useUiStore } from '@/stores/usenavbar';
import { ref } from 'vue';
const ui = useUiStore()

let isClose = ref(true)
let isOpen = ref(false)
function sideBarClose(){
    isClose.value = false
    isOpen.value = true
}
function sideBarOpen(){
    isClose.value = true
    isOpen.value = false
}





</script>
