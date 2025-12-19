// --- Couleurs des langages (inspiré de GitHub) ---
const languageColors = {
  PHP: '#4F5D95',
  JavaScript: '#f1e05a',
  Vue: '#41b883',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Dart: '#00B4AB',
  Twig: '#C1D026',
  SCSS: '#C6538C',
  Shell: '#89e051',
  Blade: '#f7523f',
  Other: '#ededed'
};

export default defineEventHandler(async (event) => {
  // Dans un vrai projet, vous récupéreriez ces données depuis une base de données.
  let projectsData = [
    {
      id: 0,
      title: 'JiramaBotAssistance',
      description: "Projet de fin d'études pour l'obtention de ma Licence, réalisé lors d'un stage chez Jirama. Le projet consistait à développer les chatbots Messenger et WhatsApp pour l'intranet de l'entreprise.",
      technologies: ['Symfony', 'PHP', 'Chatbot', 'Messenger', 'WhatsApp'],
      image: '/chatbot.jpg',
      link: 'https://github.com/JiramaCms/intranet',
      status: 'Terminé',
      progress: 100
    },
    {
      id: 1,
      title: 'Portfolio Personnel',
      description: 'Mon site portfolio pour présenter mes compétences et mes réalisations. Construit avec Nuxt.js et stylisé avec Tailwind CSS pour un design moderne et réactif.',
      technologies: ['Nuxt.js', 'Vue.js', 'Tailwind CSS'],
      image: '/logo.png',
      link: 'https://github.com/Henintsoa2312/portfolio',
      status: 'En cours',
      progress: 90
    },
    {
      id: 2,
      title: 'Autres projets en attentes',
      description: '',
      technologies: [],
      image: 'https://placehold.co/600x400/1e293b/94a3b8?text=Bientôt...',
      link: null,
      status: 'À venir',
      progress: 0
    },
    {
      id: 3,
      title: 'Medipass',
      description: "Plateforme complète pour le suivi médical incluant une application mobile (patients), un site web (médecins) et une application desktop (laboratoires). Le développement se concentre actuellement sur l'application mobile.",
      technologies: ['Flutter', 'Dart', 'Web', 'Desktop'],
      image: '/medipass.png',
      link: 'https://github.com/Henintsoa2312/medipass',
      status: 'En cours',
      progress: 25
    },
    {
      id: 4,
      title: 'Flowtalk',
      description: 'Application de messagerie en temps réel construite avec Laravel et React, permettant des conversations fluides et instantanées.',
      technologies: ['Laravel', 'React', 'Pusher', 'Real-time'],
      image: '/flowtalk.png',
      link: 'https://github.com/Henintsoa2312/flowtalk',
      status: 'En cours',
      progress: 80
    },
  ];
  
  // Enrichir les données avec les langages depuis l'API GitHub
  const enrichedProjects = await Promise.all(
    projectsData.map(async (project) => {
      // Ne traite que les projets avec un lien GitHub valide
      if (project.link && project.link.startsWith('https://github.com')) {
        const path = new URL(project.link).pathname;
        const [owner, repo] = path.substring(1).split('/');

        if (owner && repo) {
          try {
            // Appel à l'API GitHub pour les langages
            const languages = await $fetch(`https://api.github.com/repos/${owner}/${repo}/languages`);
            const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);

            if (totalBytes > 0) {
              project.languages = Object.entries(languages).map(([name, bytes]) => ({
                name,
                percentage: ((bytes / totalBytes) * 100).toFixed(2),
                color: languageColors[name] || languageColors.Other,
              }));
            } else {
              project.languages = [];
            }
          } catch (e) {
            console.error(`Impossible de récupérer les langages pour ${owner}/${repo}:`, e.message);
            project.languages = []; // En cas d'erreur (ex: repo privé), on met un tableau vide
          }
        }
      }
      return project;
    })
  );

  return enrichedProjects;
});