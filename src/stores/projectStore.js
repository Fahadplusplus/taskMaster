import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useProjectStore = defineStore('project', () => {
  const projects = ref([])

  
  const savedProjects = localStorage.getItem('projects')
  if (savedProjects) {
    projects.value = JSON.parse(savedProjects)
  }

  
  function addProject(id,name, desc) {
    const newProject = {
      id,
      name,
      desc,
    }
    projects.value.push(newProject)
  }

  
  watch(
    projects,
    (newProjects) => {
      localStorage.setItem('projects', JSON.stringify(newProjects))
    },
    { deep: true }
  )

  return { projects, addProject }
})
