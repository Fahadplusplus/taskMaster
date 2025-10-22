<template>
  <navbar />
  <sidebar />

  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4">{{ project?.name || "Project Tasks" }}</h1>
    <p class="text-gray-600 mb-6">{{ project?.desc || "No description available" }}</p>

    <hr class="mb-8" />

   
    <div v-if="loading" class="text-gray-500 text-center">Loading tasks...</div>

    
    <div v-else-if="error" class="text-red-500 text-center">{{ error }}</div>

    
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
  
      <div class="bg-yellow-100 p-4 rounded shadow ">
        <div class="flex justify-end">
            <button @click="addTask"  class="bg-yellow-300 px-2 py-1 rounded font-bold" >add</button>
        </div>
        <div>
           
                <h2 class="font-bold text-lg mb-2">Pending</h2>
        <ul>
          <li
            v-for="task in pendingTasks"
            :key="task.id"
            class="bg-white rounded p-2 mb-2 shadow-sm"
          >
            {{ task.title }}
          </li>
        </ul>
        </div>
        
       
        
      </div>

    
      <div class="bg-blue-100 p-4 rounded shadow">
        <h2 class="font-bold text-lg mb-2">In Progress</h2>
        <ul>
          <li
            v-for="task in inProgressTasks"
            :key="task.id"
            class="bg-white rounded p-2 mb-2 shadow-sm"
          >
            {{ task.title }}
          </li>
        </ul>
      </div>

      <!-- Completed -->
      <div class="bg-green-100 p-4 rounded shadow">
        <h2 class="font-bold text-lg mb-2">Completed</h2>
        <ul>
          <li
            v-for="task in completedTasks"
            :key="task.id"
            class="bg-white rounded p-2 mb-2 shadow-sm"
          >
            {{ task.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import navbar from "./navbar.vue";
import sidebar from "./sidebar.vue";
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import draggable from "vuedraggable";


const route = useRoute();
const projectId = route.params.id;

const project = ref(null);
const tasks = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {

    const projectRes = await axios.get(`http://localhost:3000/projects/${projectId}`);
    project.value = projectRes.data;

   
    const res = await axios.get(`http://localhost:3000/tasks?projectId=${projectId}`);
    tasks.value = res.data;
  } catch (err) {
    error.value = "Failed to load project or tasks.";
    console.error(err);
  } finally {
    loading.value = false;
  }
});
const pendingTasks = ref([
  { id: 1, title: "Initial Task" },
]);


const inProgressTasks = computed(() =>
  tasks.value.filter((t) => t.status === "in-progress")
);
const completedTasks = computed(() =>
  tasks.value.filter((t) => t.status === "completed")
);
function addTask() {
  const title = prompt("Enter task title:");
  if (title && title.trim() !== "") {
    pendingTasks.value.push({
      id: Date.now(), // unique id
      title,
    });
  }
}
</script>

