import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useProjectStore = defineStore('project', () => {
  const projects = ref([])

  // 🧠 Load projects from localStorage on startup
  const savedProjects = localStorage.getItem('projects')
  if (savedProjects) {
    projects.value = JSON.parse(savedProjects)
  }

  // ➕ Add a new project
  function addProject(name, desc) {
    const newProject = {
      id: Date.now(),
      name,
      desc,
    }
    projects.value.push(newProject)
  }

  // 💾 Save changes automatically
  watch(
    projects,
    (newProjects) => {
      localStorage.setItem('projects', JSON.stringify(newProjects))
    },
    { deep: true }
  )

  return { projects, addProject }
})
