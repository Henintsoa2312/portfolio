<script setup>
import ContactDropdown from '~/components/ContactDropdown.vue'; // This component will be created
</script>

<template>
  <header class="bg-slate-900 sticky top-0 z-50 shadow-md">
    <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
      <!-- Logo et Titre -->
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <span class="text-xl font-bold text-white">Mon Portfolio</span>
      </NuxtLink>

      <!-- Liens de navigation -->
      <ul class="flex items-center gap-8">
        <li>
          <NuxtLink to="/" class="text-slate-300 hover:text-blue-300 transition-colors" active-class="text-blue-400 font-semibold">Accueil</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/projets" class="text-slate-300 hover:text-blue-300 transition-colors" active-class="text-blue-400 font-semibold">Projets</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/a-propos" class="text-slate-300 hover:text-blue-300 transition-colors" active-class="text-blue-400 font-semibold">À Propos</NuxtLink>
        </li>
        <li>
          <ContactDropdown class="text-slate-300 hover:text-blue-300 transition-colors cursor-pointer" />
        </li>
      </ul>
    </nav>
  </header>
</template>