import { ref, onMounted, onUnmounted } from 'vue';

// L'état est partagé à travers toute l'application
const isKonamiActive = ref(false);

export function useKonami() {
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let userInput = [];

  const keyHandler = (event) => {
    const key = event.key.toLowerCase();
    userInput.push(key);

    // Garde seulement les 10 dernières touches
    if (userInput.length > konamiCode.length) {
      userInput.shift();
    }

    if (JSON.stringify(userInput) === JSON.stringify(konamiCode)) {
      isKonamiActive.value = !isKonamiActive.value; // Active ou désactive l'effet
      userInput = []; // Réinitialise pour pouvoir le refaire
    }
  };

  onMounted(() => {
    window.addEventListener('keydown', keyHandler);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', keyHandler);
  });

  // Expose l'état pour que les composants puissent l'utiliser
  return {
    isKonamiActive
  };
}

