<script setup>
import { ref } from 'vue';
import { useKonami } from '~/composables/useKonami';
import TheFooter from '~/components/TheFooter.vue';

// --- Données personnelles ---
const personalInfo = ref({
  name: 'Henintsoa Andriamanjato',
  title: 'Développeur Web et Mobile',
  description: "Spécialisé dans la création d'applications web et mobiles performantes, intuitives et sur mesure pour répondre à vos besoins.",
  image: '/moi.jpg',
  githubUrl: 'https://github.com/Henintsoa2312',
  githubQrCode: '/qrcodes/github.jpg'
});

// --- Données des compétences ---
const skills = ref([
  {
    category: 'Frontend',
    technologies: [
      { name: 'HTML', lottieUrl: 'https://assets8.lottiefiles.com/packages/lf20_2x0yddp5.json' },
      { name: 'CSS', lottieUrl: 'https://assets8.lottiefiles.com/packages/lf20_2x0yddp5.json' },
      { name: 'JavaScript', lottieUrl: 'https://assets8.lottiefiles.com/packages/lf20_2x0yddp5.json' },
      { name: 'Vue.js', lottieUrl: 'https://assets8.lottiefiles.com/packages/lf20_2x0yddp5.json' },
      { name: 'Nuxt.js', lottieUrl: 'https://assets8.lottiefiles.com/packages/lf20_2x0yddp5.json' },
      { name: 'React', lottieUrl: 'https://assets8.lottiefiles.com/packages/lf20_2x0yddp5.json' },
      { name: 'Tailwind CSS', lottieUrl: 'https://assets8.lottiefiles.com/packages/lf20_2x0yddp5.json' },
    ]
  },
  {
    category: 'Backend',
    technologies: [
      { name: 'PHP', lottieUrl: 'https://assets8.lottiefiles.com/packages/lf20_2x0yddp5.json' },
      { name: 'Symfony', lottieUrl: 'https://assets8.lottiefiles.com/packages/lf20_2x0yddp5.json' },
    ]
  },
  {
    category: 'Mobile',
    technologies: [
      { name: 'Flutter', lottieUrl: 'https://assets8.lottiefiles.com/packages/lf20_2x0yddp5.json' },
      { name: 'Dart', lottieUrl: 'https://assets8.lottiefiles.com/packages/lf20_2x0yddp5.json' },
    ]
  },
  {
    category: 'Outils & DevOps',
    technologies: [
      { name: 'Git', lottieUrl: 'https://assets8.lottiefiles.com/packages/lf20_2x0yddp5.json' },
      { name: 'GitHub', lottieUrl: 'https://assets8.lottiefiles.com/packages/lf20_2x0yddp5.json' },
    ]
  }
]);

// --- Récupère l'état du Konami Code ---
const { isKonamiActive } = useKonami();

// État pour contrôler la visibilité de la modale du CV
const isCvModalOpen = ref(false);

const cvUrl = '/cv/mon_cv.jpg';

</script>

<template>
  <!-- Conteneur principal avec position relative pour l'arrière-plan -->
  <div class="relative bg-slate-900 text-white overflow-hidden">
    <div class="min-h-screen flex flex-col">
      <!-- Section principale (Hero) -->
      <main class="relative flex-grow flex items-center">
        <!-- Formes géométriques animées en arrière-plan -->
        <div class="background-shapes" :class="{ 'konami-activated': isKonamiActive }" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span><span></span>
        </div>
        <!-- Contenu principal centré -->
        <div class="container mx-auto px-6 relative z-10">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <!-- Colonne de l'image -->
            <div class="flex justify-center md:justify-end order-first md:order-last">
              <NuxtImg :src="personalInfo.image" :alt="personalInfo.name" class="w-56 h-56 md:w-72 md:h-72 rounded-full object-cover shadow-2xl border-4 border-slate-700" sizes="224px md:288px" preload />
            </div>
            
            <!-- Colonne des informations -->
            <div class="text-center md:text-left">
              <h1 class="text-4xl md:text-6xl font-bold mb-3">
                {{ personalInfo.name }}
              </h1>
              <p class="text-xl md:text-2xl text-blue-300 mb-6">
                {{ personalInfo.title }}
              </p>
              <p class="max-w-xl text-slate-300 mb-8">
                {{ personalInfo.description }}
              </p>
              <!-- Boutons d'action et QR Code -->
              <div class="flex items-center justify-center md:justify-start gap-6">
                <!-- Ce bouton ouvre la modale du CV -->
                <button
                  @click="isCvModalOpen = true"
                  class="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg"
                >
                  Voir mon CV
                </button>
                <a :href="personalInfo.githubUrl" target="_blank" rel="noopener noreferrer" class="p-2 bg-white rounded-lg shadow-lg hover:scale-105 transition-transform">
                  <NuxtImg :src="personalInfo.githubQrCode" alt="QR Code GitHub" class="w-20 h-20" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Section Compétences -->
    <section class="bg-slate-800/70 py-20 relative z-10">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center text-white mb-16">Mes Compétences</h2>
        <div class="space-y-12">
          <div v-for="skillCategory in skills" :key="skillCategory.category">
            <h3 class="text-2xl font-semibold text-blue-300 mb-6 text-center">{{ skillCategory.category }}</h3>
            <div class="flex flex-wrap justify-center gap-8">
              <div 
                v-for="(tech, index) in skillCategory.technologies" 
                :key="tech.name" 
                class="skill-card bg-slate-800 p-6 rounded-lg shadow-lg flex flex-col items-center gap-4 text-center transition-transform duration-300 hover:-translate-y-2"
                :style="{ animationDelay: `${index * 100}ms` }"
              >
                <LottieAnimation
                  :animation-data="tech.lottieUrl"
                  :width="96"
                  :height="96"
                  :auto-play="true"
                  :loop="true"
                />
                <span class="font-semibold text-white -mt-4">{{ tech.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modale pour afficher l'image du CV -->
    <CvModal
      :show="isCvModalOpen"
      :source="cvUrl"
      @close="isCvModalOpen = false"
    />

    <TheFooter />
  </div>
</template>
 
<style scoped>
.background-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
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
  bottom: -10rem;
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

@keyframes animateShapes {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(-120vh) rotate(720deg);
    opacity: 0;
  }
}

/* Animation pour les compétences */
.skill-card {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn-up 0.5s ease-out forwards; /* Applique l'animation à la carte entière */
}

@keyframes fadeIn-up {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>