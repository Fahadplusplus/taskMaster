<template>
    <navbar></navbar>
    <sidebar></sidebar>
    <div class="mx-8 mt-8">
        <div class="my-2 flex justify-between items-center">
            <p class="font-bold text-2xl">For You</p>
            
            <button class="  rounded shadow bg-blue-600 text-white hover:bg-blue-700 " >
                <div class="flex  items-center gap-2 px-1">
                    <span class="text-2xl ">+</span> <span class="font-bold">Create</span>
                </div>
                
            </button>
           
        </div>
         <hr>
         <div class="h-60 w-40 border my-2">
            
         </div>

    </div>

    
</template>

<script setup>
import navbar from './navbar.vue';
import sidebar from './sidebar.vue';
</script>
