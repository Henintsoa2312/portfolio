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
      <div class="relative bg-slate-800 text-white rounded-lg shadow-xl p-8 text-center max-w-4xl w-full mx-4">
        <button @click="$emit('close')" class="absolute -top-4 -right-4 text-white bg-slate-700 rounded-full p-1 hover:bg-slate-600" aria-label="Fermer la modale">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <h3 class="text-2xl font-bold mb-6">Contactez-moi</h3>
        
        <!-- Grille pour les QR Codes -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="item in items" :key="item.name" class="flex flex-col items-center">
            <h4 class="text-lg font-semibold mb-3">{{ item.name }}</h4>
            <div class="bg-white p-4 rounded-md">
              <img :src="item.qrImage" :alt="`QR Code pour ${item.name}`" class="w-[150px] h-[150px] md:w-[200px] md:h-[200px]">
            </div>
          </div>
        </div>
        <p class="mt-6 text-slate-300">Scannez un code pour me contacter ou me suivre.</p>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  show: { type: Boolean, required: true },
  items: { type: Array, required: true },
});

defineEmits(['close']);
</script>