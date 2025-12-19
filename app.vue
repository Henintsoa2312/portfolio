<script setup>
import { useKonami } from '~/composables/useKonami';
// Initialise la logique du Konami code pour toute l'application
useKonami();

</script>

<template>
  <div>
    <!-- Le composant TheHeader est automatiquement importé depuis le dossier /components -->
    <TheHeader />

    <!-- Affiche le contenu de la page actuelle (depuis le dossier pages/) -->
    <NuxtPage />
  </div>
</template>