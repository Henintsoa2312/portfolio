<template>
  <transition
    enter-active-class="transition-opacity duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" @click.self="$emit('close')">
      <!-- Modale agrandie avec une hauteur maximale et un conteneur pour le scroll -->
      <div class="relative bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 flex flex-col max-h-[95vh]">
        <button @click="$emit('close')" class="absolute -top-4 -right-4 text-white bg-slate-800 rounded-full p-1 hover:bg-slate-600" aria-label="Fermer la modale">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <!-- Le conteneur interne qui gère le défilement -->
        <div class="overflow-y-auto p-4">
          <img :src="source" alt="CV de Henintsoa Andriamanjato" class="w-full h-auto">
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
});

defineEmits(['close']);
</script>