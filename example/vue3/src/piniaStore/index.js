import { defineStore } from "pinia"
import { ref, computed } from 'vue'
export const useCounterStore = defineStore('counter', () => {
  const count = ref(3)
  const double = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  return { count, double, increment }
})
