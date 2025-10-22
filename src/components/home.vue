<template>
  <navbar />
  <sidebar />

  <div class="mx-8 mt-8">
    <div class="my-2 flex justify-between items-center">
      <p class="font-bold text-2xl">For You</p>
      <button
        @click="isModalOpen = true"
        class="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + New Project
      </button>
    </div>
    <hr />

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
        
               <div 
        v-for="project in projectStore.projects"
        :key="project.id"
        class="bg-gray-100 shadow-md rounded p-4 my-4 mt-2 mx-10 flex justify-between"
      >
        <div>
          <p class="font-bold">{{ project.name }}</p>
          <p class="text-gray-600 text-sm max-w-64 break-words whitespace-normal">
            {{ project.desc }}
          </p>
          <RouterLink :to="`/tasks/${project.id}`">
            <button   class="p-1 px-2 rounded text-white mt-1 bg-blue-500">Tasks</button>
          </RouterLink>
        

        </div>

        <div class=" space-y-3">
          <img
            @click.stop="openUpdateModal(project)"
            class="h-6 cursor-pointer"
            src="/src/assets/pen-to-square-regular-full.svg"
            alt="edit"
          />

          <img
            @click.stop="deleteProject(project.id)"
            class="h-6 cursor-pointer"
            src="/src/assets/trash-solid-full.svg"
            alt="delete"
          />
          
        </div>
      </div>
        
   
    </div>
  </div>

 
  <modal :isOpen="isModalOpen" title="Create New Project" @close="isModalOpen = false">
    <form @submit.prevent="createProject">
      <input
        v-model="projectName"
        placeholder="Project Name"
        class="border p-2 w-full mb-3 rounded"
      />
      <textarea
        v-model="projectDesc"
        placeholder="Description"
        class="border p-2 w-full mb-4 rounded"
      ></textarea>
      <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded">
        Create
      </button>
    </form>
  </modal>


  <UpdateModal :isOpen="isUpdateModalOpen" title="Update Project" @close="isUpdateModalOpen = false">
    <form @submit.prevent="updateProject">
      <input
        v-model="projectName"
        placeholder="Project Name"
        class="border p-2 w-full mb-3 rounded"
      />
      <textarea
        v-model="projectDesc"
        placeholder="Description"
        class="border p-2 w-full mb-4 rounded"
      ></textarea>
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
        Update
      </button>
    </form>
  </UpdateModal>
</template>

<script setup>
import navbar from "./navbar.vue";
import sidebar from "./sidebar.vue";
import modal from "@/components/modal.vue";
import UpdateModal from "./updateModal.vue";

import { ref, onMounted } from "vue";
import axios from "axios";
import { useProjectStore } from "@/stores/projectStore";

const projectStore = useProjectStore();
const isModalOpen = ref(false);
const isUpdateModalOpen = ref(false);
const projectName = ref("");
const projectDesc = ref("");
const currentProjectId = ref(null);

onMounted(() => {
  load();
});

async function load() {
  const res = await axios.get("http://localhost:3000/projects");
  projectStore.projects = res.data;
}

async function createProject() {
  const res = await axios.post("http://localhost:3000/projects", {
    name: projectName.value,
    desc: projectDesc.value,
  });

  projectStore.addProject(res.data.id, res.data.name, res.data.desc);

  projectName.value = "";
  projectDesc.value = "";
  isModalOpen.value = false;
}

async function deleteProject(id) {
  if (window.confirm("Are you sure you want to delete this project?")) {
    const res = await axios.delete(`http://localhost:3000/projects/${id}`);
    if (res.status === 200) load();
  }
}

function openUpdateModal(project) {
  currentProjectId.value = project.id;
  projectName.value = project.name;
  projectDesc.value = project.desc;
  isUpdateModalOpen.value = true;
}

async function updateProject() {
  if (!currentProjectId.value) return;

  const res = await axios.put(`http://localhost:3000/projects/${currentProjectId.value}`, {
    name: projectName.value,
    desc: projectDesc.value,
  });

  if (res.status === 200) {
    await load();
    isUpdateModalOpen.value = false;
    projectName.value = "";
    projectDesc.value = "";
  }
}
</script>
