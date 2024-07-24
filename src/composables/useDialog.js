import { computed } from 'vue'
import { useStore } from 'vuex'

export function useDialog () {
  const store = useStore()
  const isOpen = computed(() => store.getters['dialog/isOpen'])
  const toggleDialog = () => store.commit('dialog/toggleDialog')

  return {
    isOpen,
    toggleDialog
  }
}
