<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useKonami } from '~/composables/useKonami';
import TheFooter from '~/components/TheFooter.vue';

// --- Récupération dynamique des projets depuis l'API ---
const { data: projects, pending, error } = await useAsyncData('projects', () => $fetch('/api/projects'));

// --- Logique du Carrousel ---
const activeIndex = ref(0);

const totalProjects = computed(() => projects.value?.length || 0);

const nextProject = () => {
  if (totalProjects.value > 0) {
    activeIndex.value = (activeIndex.value + 1) % totalProjects.value;
  }
};

const prevProject = () => {
  if (totalProjects.value > 0) {
    activeIndex.value = (activeIndex.value - 1 + totalProjects.value) % totalProjects.value;
  }
};

// Calcule le style de chaque slide en fonction de sa position par rapport à l'index actif
const getSlideStyle = (index) => {
  const offset = index - activeIndex.value;
  const total = totalProjects.value;

  // Gère le carrousel en boucle pour les transformations
  let adjustedOffset = offset;
  if (offset > total / 2) {
    adjustedOffset = offset - total;
  } else if (offset < -total / 2) {
    adjustedOffset = offset + total;
  }

  const scale = 1 - Math.abs(adjustedOffset) * 0.2; // Réduit la taille de 20% par slide
  const translateX = adjustedOffset * 60; // Décale de 60%
  const opacity = 1 - Math.abs(adjustedOffset) * 0.4; // Réduit l'opacité
  const zIndex = total - Math.abs(adjustedOffset);

  return {
    transform: `translateX(${translateX}%) scale(${scale})`,
    opacity: opacity,
    zIndex: zIndex,
  };
};

// --- Récupère l'état du Konami Code ---
const { isKonamiActive } = useKonami();

// --- Carrousel automatique ---
let carouselInterval = null;

onMounted(() => {
  // Démarre le défilement automatique toutes les 5 secondes
  carouselInterval = setInterval(() => {
    nextProject();
  }, 5000);
});

onUnmounted(() => {
  // Arrête le défilement automatique pour éviter les fuites de mémoire
  clearInterval(carouselInterval);
});
</script>

<template>
  <!-- Conteneur principal avec position relative pour l'arrière-plan -->
  <div class="relative bg-slate-900 text-white min-h-[calc(100vh-64px)] p-4 sm:p-6 md:p-8 overflow-hidden flex flex-col">
    <!-- Formes géométriques animées en arrière-plan -->
    <div class="background-shapes" :class="{ 'konami-activated': isKonamiActive }" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="container mx-auto flex flex-col relative z-10 flex-grow">
      <h1 class="text-4xl font-bold text-center mb-12">Mes Projets</h1>
      <!-- Conteneur du carrousel -->
      <div class="relative w-full max-w-4xl mx-auto h-[550px] flex items-center justify-center">
        <!-- Affiche un message pendant le chargement ou en cas d'erreur -->
        <div v-if="pending" class="text-center">Chargement des projets...</div>
        <div v-else-if="error" class="text-center text-red-400">Une erreur est survenue.</div>
        <!-- Carrousel -->
        <div v-else class="relative w-full h-full" style="perspective: 1000px;">
          <!-- Boucle sur les projets (chaque projet est une slide) -->
          <div 
            v-for="(project, index) in projects" 
            :key="project.id" 
            class="bg-slate-800 rounded-lg shadow-lg overflow-hidden absolute w-full h-full max-w-lg mx-auto top-0 left-0 right-0 transition-all duration-500 ease-out"
            :style="getSlideStyle(index)"
          >
            <!-- Contenu de la carte centré -->
            <div class="p-6 text-center flex flex-col items-center h-full">
              <!-- Image en cercle -->
              <NuxtImg :src="project.image" :alt="`Image du projet ${project.title}`" class="w-40 h-40 rounded-full object-cover border-4 border-slate-700 shadow-md mb-4" />
              <h2 class="text-2xl font-bold mb-2 mt-2">{{ project.title }}</h2>
              <!-- Barre de progression -->
              <div class="w-full px-4 mb-4">
                <div class="flex justify-between text-sm text-slate-400 mb-1">
                  <span>{{ project.status }}</span>
                  <span>{{ project.progress }}%</span>
                </div>
                <div class="w-full bg-slate-700 rounded-full h-2.5">
                  <div class="bg-blue-600 h-2.5 rounded-full" :style="{ width: project.progress + '%' }"></div>
                </div>
              </div>
              <p class="text-slate-300 mb-4 h-24 overflow-hidden text-sm">{{ project.description }}</p>
              <div class="mb-4">
                <span v-for="tech in project.technologies" :key="tech" class="inline-block bg-slate-700 rounded-full px-3 py-1 text-sm font-semibold text-slate-200 mr-2 mb-2">
                  {{ tech }}
                </span>
              </div>

              <!-- Barre de langages GitHub -->
              <div v-if="project.languages && project.languages.length" class="w-full px-4 mt-4">
                <div class="flex w-full h-2 rounded-full overflow-hidden bg-slate-700">
                  <div
                    v-for="lang in project.languages"
                    :key="lang.name"
                    :style="{ width: lang.percentage + '%', backgroundColor: lang.color }"
                    :title="`${lang.name}: ${lang.percentage}%`"></div>
                </div>
                <!-- Légende des langages -->
                <div class="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3 text-xs">
                  <div v-for="lang in project.languages" :key="lang.name + '-legend'" class="flex items-center gap-1.5">
                    <span class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: lang.color }"></span>
                    <span class="text-slate-300 font-medium">{{ lang.name }}</span>
                    <span class="text-slate-400">{{ lang.percentage }}%</span>
                  </div>
                </div>
              </div>
              <a 
                :is="project.link ? 'a' : 'span'"
                :href="project.link" 
                target="_blank" 
                rel="noopener noreferrer" 
                :class="['mt-auto inline-block font-bold py-2 px-4 rounded-lg transition-colors duration-300', project.link ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-700 text-slate-400 cursor-not-allowed']">
                Voir le projet
              </a>
            </div>
          </div>
        </div>

        <!-- Boutons de navigation -->
        <button @click="prevProject" aria-label="Projet précédent" class="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 bg-slate-700/50 hover:bg-slate-600 p-2 rounded-full z-50">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button @click="nextProject" aria-label="Projet suivant" class="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 bg-slate-700/50 hover:bg-slate-600 p-2 rounded-full z-50">
          <svg xmlns="http://www.w.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>

    <TheFooter />
  </div>
</template>

<style scoped>
/* Styles pour les formes géométriques animées en arrière-plan */
.background-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0; /* S'assure que les formes sont en arrière-plan */
  transition: filter 0.5s ease-in-out;
}

/* Style pour l'effet Konami */
.konami-activated {
  filter: hue-rotate(180deg);
}

.konami-activated span {
  animation-duration: 5s !important; /* Accélère l'animation */
  background-color: rgba(236, 72, 153, 0.4); /* Change la couleur en rose */
}

.background-shapes span {
  position: absolute;
  bottom: -10rem; /* Commence en dehors de l'écran */
  display: block;
  background-color: rgba(59, 130, 246, 0.3); /* blue-500 with opacity */
  animation: animateShapes 25s linear infinite;
  border-radius: 8px;
}

/* Variations de taille, position et délai d'animation pour un effet aléatoire */
.background-shapes span:nth-child(1) { left: 25%; width: 80px; height: 80px; animation-delay: 0s; }
.background-shapes span:nth-child(2) { left: 10%; width: 20px; height: 20px; animation-delay: 2s; animation-duration: 12s; }
.background-shapes span:nth-child(3) { left: 70%; width: 20px; height: 20px; animation-delay: 4s; }
.background-shapes span:nth-child(4) { left: 40%; width: 60px; height: 60px; animation-delay: 0s; animation-duration: 18s; }
.background-shapes span:nth-child(5) { left: 65%; width: 20px; height: 20px; animation-delay: 0s; }
.background-shapes span:nth-child(6) { left: 85%; width: 110px; height: 110px; animation-delay: 3s; }
.background-shapes span:nth-child(7) { left: 5%; width: 150px; height: 150px; animation-delay: 7s; }
.background-shapes span:nth-child(8) { left: 50%; width: 25px; height: 25px; animation-delay: 15s; animation-duration: 45s; }
.background-shapes span:nth-child(9) { left: 20%; width: 15px; height: 15px; animation-delay: 2s; animation-duration: 35s; }
.background-shapes span:nth-child(10) { left: 90%; width: 50px; height: 50px; animation-delay: 11s; }

@keyframes animateShapes {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(-120vh) rotate(720deg); /* Monte au-delà de l'écran */
    opacity: 0;
  }
}
</style>