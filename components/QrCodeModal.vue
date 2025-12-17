<template>
  <!-- Superposition de la modale -->
  <div v-if="show" class="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 transition-opacity" @click.self="close">
    <!-- Contenu de la modale -->
    <div class="bg-white p-6 rounded-lg shadow-xl text-center transform transition-all sm:max-w-sm sm:w-full">
      <h3 class="text-lg font-medium text-gray-900 mb-4">{{ title }}</h3>
      <img :src="qrCode" alt="QR Code" class="w-64 h-64 mx-auto">
      <button @click="close" class="mt-6 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
        Fermer
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  title: String,
  qrCode: String
})

const emit = defineEmits(['close'])

const close = () => emit('close')
</script>