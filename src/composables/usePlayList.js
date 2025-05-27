import { computed } from 'vue'
import { useStore } from 'vuex'

export function usePlayList () {
  const store = useStore()
  const playList = computed(() => store.getters['playList/playList'])
  const addPlayList = (payload) => store.commit('playList/addPlayList', payload)
  const deletePlayList = (payload) => store.commit('playList/deletePlayList', payload)
  const addSongToPlayList = (payload) => store.commit('playList/addSongToPlayList', payload)

  return {
    playList,
    addPlayList,
    deletePlayList,
    addSongToPlayList
  }
}
