import { computed } from 'vue'
import { useStore } from 'vuex'

export function useMusic () {
  const store = useStore()
  const isPlaying = computed(() => store.getters['music/isPlaying'])
  const songInfo = computed(() => store.getters['music/songInfo'])
  const toggleIsPlaying = () => store.commit('music/isPlayingToggle')
  const playSong = () => store.commit('music/playSong')
  const setSongInfo = (payload) => store.commit('music/setSongInfo', payload)

  return {
    songInfo,
    isPlaying,
    toggleIsPlaying,
    playSong,
    setSongInfo
  }
}
