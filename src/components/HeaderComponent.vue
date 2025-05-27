<template>
  <q-header style="background-color: white; padding: 30px; max-width: 1000px; margin: auto;">
    <div class="flex justify-between items-center">
      <q-select class="search" :options="listItems" v-model="search" @filter="filterFn" rounded outlined use-input dense
        input-debounce="350" placeholder="Buscar..." hide-dropdown-icon>
        <template v-slot:append>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
          </q-avatar>
        </template>
        <template v-slot:option="{ opt }">
          <q-item   clickable class="q-py-none q-px-sm" @click="addToSongInfo(opt)">
            <q-item-section side>
              <img :src="opt.cover" style="height: 35px; aspect-ratio: 1;" alt="">
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body2">
                {{ opt.title }}
              </q-item-label>
              <q-item-label class="text-caption">
                {{ opt.singer }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <div class="flex items-center">
        <p class="user">Usuario</p>
        <button @click="toggleDrawer" class="icon">
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" class="icon-tabler icons-tabler-outline icon-tabler-menu-2">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 6l16 0" />
            <path d="M4 12l16 0" />
            <path d="M4 18l16 0" />
          </svg>
        </button>
      </div>
    </div>
  </q-header>
</template>
<script>
import { axiosApi } from 'src/config'
import { defineComponent, ref } from 'vue'
import { useMusic } from 'src/composables/useMusic'

export default defineComponent({
  name: 'HeaderComponent',
  props: {
    toggleDrawer: {
      type: Function
    }
  },
  setup () {
    const { playSong, setSongInfo } = useMusic()

    const search = ref('')
    const listItems = ref([])

    function filterFn (val, update, abort) {
      update(async () => {
        if (val) {
          const res = await axiosApi.get('/search', {
            params: {
              q: val.trim()
            }
          })
          return addNewData(res.data.data)
        }
        listItems.value = []
      })
    }

    function addNewData (data) {
      const list = data.map(item => {
        return { title: item.title, singer: item.artist.name, cover: item.album.cover_small, song: item.preview, id: item.id }
      })
      listItems.value = list
    }

    function addToSongInfo (song) {
      setSongInfo(song)
      playSong()
    }

    return {
      search,
      listItems,
      filterFn,
      addToSongInfo,
      addNewData
    }
  }
})
</script>
<style scoped lang="scss">
.search {
  width: 400px;

  @media screen and (max-width: 1024px) {
    width: 85%;
  }

  &_items {
    width: 340px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      color: gray;
    }
  }
}

.user {
  color: black;
  font-size: 17px;
  font-weight: 300;

  @media screen and (max-width: 1024px) {
    display: none;
  }
}

.icon {
  display: none;
  background-color: transparent;
  border: none;

  @media screen and (max-width: 1024px) {
    display: block;
  }
}
</style>
