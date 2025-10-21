<template>
  
  <teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
    >
      
      <div class="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative">
        
        <button
          @click="close"
          class="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        
        <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>

        
        <div>
            <slot></slot> 
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'



const props = defineProps({
  isOpen: Boolean,
  title: { type: String, default: 'Modal Title' }
})

const emit = defineEmits(['close'])

function close() {
  emit('close')
}
</script>

