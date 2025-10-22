<template>
  <!-- Sidebar -->
  <aside
    v-if="ui.isSidebarOpen"
    class="fixed h-screen w-64 bg-gray-800 text-white p-4 shadow-lg z-40 flex flex-col justify-between "
  >
    
    <div>
      <h2 class="text-lg font-semibold mb-6 tracking-wide">Task Master</h2>

      <RouterLink
        to="/home"
        class="block px-3 py-2 rounded hover:bg-gray-700 transition"
        active-class="bg-blue-600"
      >
        Dashboard
      </RouterLink>

      <div class="mt-2">
        <span
          @click="toggleList"
          class="block px-3 py-2 rounded hover:bg-gray-700 cursor-pointer select-none"
        >
          Projects
        </span>

        <ul
          v-if="isClicked"
          class="ml-4 mt-1 space-y-1 transition-all"
        >
          <li
            v-for="project in projectStore.projects"
            :key="project.id"
            class="px-2 py-1 rounded hover:bg-gray-700 text-sm "
          >
            {{ project.name }}
          </li>
        </ul>
      </div>

      <RouterLink
        to="/setting"
        class="block mt-4 px-3 py-2 rounded hover:bg-gray-700 transition"
        active-class="bg-blue-600"
      >
        Setting
      </RouterLink>
    </div>

  
    <div class="border-t border-gray-700 ">
      <button
        @click="logout"
        class=" text-left px-3 pt-2 mb-8 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  </aside>
</template>
<script setup>
import { RouterLink, useRouter } from "vue-router";
import { ref ,watch} from "vue";
import { useUiStore } from "@/stores/usenavbar";
import { useProjectStore } from "@/stores/projectStore";


const router = useRouter();
const ui = useUiStore();
const projectStore = useProjectStore();

const isClicked = ref(false);

function toggleList() {
  isClicked.value = !isClicked.value;
}

function logout() {
  if (window.confirm("Do you want to log out?")) {
    localStorage.clear();
    projectStore.projects = [];
    ui.isSidebarOpen = false;
    router.push("/").then(() => window.location.reload());
  }
}


watch(
  () => ui.isSidebarOpen,
  (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
  })
</script>
