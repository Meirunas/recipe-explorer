// src/composables/useAppColor.js
import { ref, watch, onMounted } from 'vue';

const isLight = ref(true); // true = light gray, false = dark

export function useAppColor() {
  function toggleColor() {
    isLight.value = !isLight.value;
  }

  function updateBodyTheme(val) {
    const body = document.body;
    body.classList.remove('theme-light', 'theme-dark');
    body.classList.add(val ? 'theme-light' : 'theme-dark');
  }

  onMounted(() => {
    updateBodyTheme(isLight.value);
  });

  watch(isLight, (val) => {
    updateBodyTheme(val);
  });

  return { isLight, toggleColor };
}
