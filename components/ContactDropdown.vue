<script setup>
import { ref } from 'vue';

const isOpen = ref(false);

const contactOptions = ref([
  {
    name: 'Mobile',
    qrCode: '/qrcodes/phone.jpg',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`
  },
  {
    name: 'Email',
    qrCode: '/qrcodes/email.jpg', 
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`
  },
  {
    name: 'LinkedIn',
    qrCode: '/qrcodes/linkedin.jpg', 
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`
  }
]);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <div class="relative">
    <!-- Bouton Contact -->
    <button @click="toggleDropdown" class="cursor-pointer">
      Contact
    </button>

    <!-- Menu déroulant -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div v-if="isOpen" class="absolute right-0 mt-2 w-80 origin-top-right rounded-md bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div class="p-4">
          <p class="text-sm text-slate-400 mb-4 text-center">Scannez pour me contacter ou cliquez pour visiter.</p>
          <div class="space-y-4">
            <!-- Boucle sur les options de contact -->
            <a 
              v-for="option in contactOptions" 
              :key="option.name" 
              :href="option.link" 
              target="_blank" 
              rel="noopener noreferrer"
              class="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <div class="p-1 bg-white rounded-md">
                <NuxtImg :src="option.qrCode" :alt="`QR Code ${option.name}`" class="w-16 h-16" />
              </div>
              <div class="flex items-center gap-2 text-white">
                <span v-html="option.icon" class="w-6 h-6 text-blue-300"></span>
                <span class="font-semibold">{{ option.name }}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>