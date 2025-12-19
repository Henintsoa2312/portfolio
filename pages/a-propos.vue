<script setup>
// --- Données de la page "À propos" ---
import TheFooter from '~/components/TheFooter.vue';
const aboutInfo = {
  title: "À Propos de Moi",
  subtitle: "Développeur passionné et créatif",
  paragraphs: [
    "Je suis développeur web et mobile junior, passionné par la création d’applications modernes, utiles et bien structurées. J’aime transformer des idées en solutions concrètes à travers du code propre, lisible et évolutif. J’ai commencé mon parcours en développement web lors de ma licence, durant laquelle j’ai découvert et appris à utiliser Symfony dans un contexte de stage. Cette expérience m’a permis de comprendre les bases du développement backend, la logique des applications web et l’importance d’une bonne architecture logicielle.",
    "Aujourd’hui, je continue à renforcer mes compétences à travers des projets personnels et un apprentissage continu. Je travaille principalement avec HTML, CSS, JavaScript, Vue.js et PHP, et j’utilise des outils comme Git et GitHub pour gérer mes projets et collaborer efficacement.",
    "Curieux, motivé et persévérant, je m’intéresse particulièrement à l’expérience utilisateur, à la performance des applications et aux bonnes pratiques de développement. Mon objectif est de devenir un développeur polyvalent, capable de m’adapter à différents projets et environnements techniques.",
    "Je suis actuellement ouvert à un stage, un premier emploi ou des missions freelance, afin d’acquérir davantage d’expérience professionnelle et de contribuer activement à des projets réels. N’hésitez pas à me contacter pour discuter d’une opportunité, d’un projet ou d’une collaboration."
  ],
  image: '/moi.jpg'
};
</script>

<template>
  <!-- Conteneur principal avec position relative pour l'arrière-plan -->
  <div class="relative bg-slate-900 text-white min-h-[calc(100vh-64px)] p-4 sm:p-6 md:p-8 overflow-hidden">
    <!-- Formes géométriques animées en arrière-plan -->
    <div class="background-shapes" aria-hidden="true">
      <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
    </div>

    <div class="container mx-auto relative z-10 py-12">
      <h1 class="text-4xl font-bold text-center mb-12">{{ aboutInfo.title }}</h1>
      
      <div class="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-sm p-8 rounded-lg shadow-2xl">
        <div class="text-center">
          <NuxtImg :src="aboutInfo.image" :alt="aboutInfo.title" class="w-40 h-40 rounded-full object-cover border-4 border-slate-700 mx-auto mb-6 shadow-lg" />
          <h2 class="text-3xl font-bold text-blue-300 mb-4">{{ aboutInfo.subtitle }}</h2>
        </div>
        <div class="text-slate-300 leading-relaxed space-y-4 text-justify">
          <p v-for="(paragraph, index) in aboutInfo.paragraphs" :key="index" class="indent-8">
            {{ paragraph }}
          </p>
        </div>
      </div>
    </div>

    <TheFooter />
  </div>
</template>

<style scoped>
/* Styles pour les formes géométriques animées en arrière-plan (identique aux autres pages) */
.background-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.background-shapes span {
  position: absolute;
  bottom: -10rem;
  display: block;
  background-color: rgba(59, 130, 246, 0.3);
  animation: animateShapes 25s linear infinite;
  border-radius: 8px;
}

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
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(-120vh) rotate(720deg); opacity: 0; }
}
</style>