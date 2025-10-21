<template>
    <navbar></navbar>
    <sidebar></sidebar>
    <div class="mx-8 mt-8">
        <div class="my-2 flex justify-between items-center">
            <p class="font-bold text-2xl">For You</p>
            <button @click="isModalOpen = true" class="bg-blue-600 text-white px-4 py-2 rounded">
                + New Project
            </button>
        </div>
        <hr />
        <div class="grid grid-cols-1 gap-2 ">
            <div @click="action" v-for="project in projectStore.projects" :key="project.id"  class=" border rounded p-4 mt-2 py-10 mx-10 flex justify-between ">
            <div>

                <p class="font-bold">{{ project.name }}</p>
                <p class="text-gray-600 text-sm">{{ project.desc }}</p>
            </div>
            <div>
                <p>edit</p>
                <p>delete</p>
            </div>

        </div>
        </div>
        

    </div>

    <modal :isOpen="isModalOpen" title="Create New Project" @close="isModalOpen = false">
        <form @submit.prevent="createProject">
            <input v-model="projectName" placeholder="Project Name" class="border p-2 w-full mb-3 rounded" />
            <textarea v-model="projectDesc" placeholder="Description" class="border p-2 w-full mb-4 rounded"></textarea>
            <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded">
                Create
            </button>
        </form>
    </modal>
</template>

<script setup>
import { RouterLink } from "vue-router";
import navbar from "./navbar.vue";
import sidebar from "./sidebar.vue";
import { ref } from "vue";
import modal from "@/components/modal.vue";
import { useProjectStore } from '@/stores/projectStore'
import axios from "axios";
const projectStore = useProjectStore()


const isModalOpen = ref(false);
const projectName = ref("");
const projectDesc = ref("");

function createProject() {
    axios.post('http://localhost:3000/projects', {
        "name": projectName.value,
        "Description": projectDesc.value,
    });
    projectStore.addProject(projectName.value, projectDesc.value)
    projectName.value = ''
    projectDesc.value = ''

    isModalOpen.value = false
}
function action(){
    console.log("cllick");
    
}

</script>
