import { computed } from 'vue'
import { useStore } from 'vuex'

export function useDrawer () {
  const store = useStore()
  const leftDrawerOpen = computed(() => store.getters['sidebar/leftDrawerOpen'])
  const toggleDrawer = () => store.commit('sidebar/toggleLeftDrawer')

  return {
    leftDrawerOpen,
    toggleDrawer
  }
}
