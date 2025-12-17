<template>
  <div ref="dropdown" class="relative inline-block text-left">
    <div>
      <button @click="toggleDropdown" type="button" class="hover:text-gray-400 inline-flex items-center" id="menu-button" :aria-expanded="isOpen.toString()" aria-haspopup="true">
        Contact
        <svg class="ml-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div v-if="isOpen" class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
        <div class="py-1" role="none">
          <!-- Les éléments du menu sont maintenant des boutons qui ouvrent la modale -->
          <button @click="showQr('Téléphone', phoneQrCode, 'tel:+261342825408')" class="w-full text-left text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabindex="-1">Téléphone</button>
          <button @click="showQr('Email', emailQrCode, 'mailto:andriamanjatohenintsoa08@gmail.com')" class="w-full text-left text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabindex="-1">Email</button>
          <button @click="showQr('LinkedIn', linkedinQrCode, 'https://www.linkedin.com/in/henintsoa-andriamanjato-8a48b6329')" class="w-full text-left text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabindex="-1">LinkedIn</button>
        </div>
      </div>
    </transition>

    <!-- Utilisation du composant de modale -->
    <QrCodeModal 
      :show="isModalOpen" 
      :title="modalTitle" 
      :qr-code="modalQrCode"
      @close="closeModal" 
    />
  </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted } from 'vue'
    import QrCodeModal from './QrCodeModal.vue'
    import linkedinQrCode from '~/assets/linkedin.jpg'
    import phoneQrCode from '~/assets/phone.jpg'
    import emailQrCode from '~/assets/email.jpg'

    const isOpen = ref(false)
    const dropdown = ref(null)

    // État pour la modale
    const isModalOpen = ref(false)
    const modalTitle = ref('')
    const modalQrCode = ref('')

    const showQr = (title, qrCode, url) => {
    // Sur mobile, on ouvre directement le lien. Sur les autres appareils, on montre le QR code.
        if (window.innerWidth <= 768) {
            window.open(url, '_blank');
        } else {
            modalTitle.value = title
            modalQrCode.value = qrCode
            isModalOpen.value = true
            isOpen.value = false // Ferme le dropdown quand la modale s'ouvre
        }
}

const closeModal = () => {
  isModalOpen.value = false
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeOnClickOutside = (event) => {
  if (dropdown.value && !dropdown.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeOnClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', closeOnClickOutside)
})

</script>
