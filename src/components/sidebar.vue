

<template>
  <aside
  
    v-if="ui.isSidebarOpen"
    class="fixed h-screen w-64 bg-gray-800 text-white p-4 shadow-lg transition-all"
  >
  
    <!-- <h2 class="text-xl mb-4">Projects </h2> -->
    <div class="flex flex-col justify-items-start">
          <RouterLink to="/home"   class="px-3 py-2 rounded hover:bg-gray-700"
        active-class="bg-blue-600">
          <span @click="ui.toggleSidebar"> Dashboard</span>
      </RouterLink>

      <div class="ml-3">
        <span  @click="toggelList" >Projects</span>
        <ul v-if="isClicked" class="ml-5">
          <li>project 1</li>
          <li>project 2</li>
          <li>project 3</li>
        </ul>
      </div>
      
      <RouterLink to="/Setting" class="px-3 py-2 rounded hover:bg-gray-700"
        active-class="bg-blue-600">
           <span @click="ui.toggleSidebar"> Setting</span>
      </RouterLink>
    
    </div> 
  </aside>
</template>
<script setup>
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
import { useUiStore } from '@/stores/usenavbar';
import { ref } from 'vue';
const ui = useUiStore()

const router = useRouter()
let isClicked = ref(false)

function toggelList(){
isClicked.value = !isClicked.value
}
</script>