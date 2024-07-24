<template>
  <q-header style="background-color: white; padding: 30px 50px; max-width: 1000px; margin: auto;">
    <div class="flex justify-between items-center">
      <q-input v-model="search" debounce="350" class="search" rounded outlined placeholder="Buscar..." :dense="true">
        <template v-slot:append>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
          </q-avatar>
        </template>
        <!-- <q-popup-proxy class="q-py-md q-px-md" v-show="(e) => console.log(e)">
          <q-banner>
            <div class="search_items">
              <div v-if="listItems.length === 0">
                <p>Lo sentimos, no encontramos lo que busca</p>
              </div>
              <div v-else>
                <div v-for="song in listItems" :key="song.id">
                  {{ song.title }}
                </div>
              </div>
            </div>
          </q-banner>
        </q-popup-proxy> -->
      </q-input>
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
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'HeaderComponent',
  props: {
    toggleDrawer: {
      type: Function
    }
  },
  setup () {
    const search = ref('')
    const listItems = ref([])

    watch(search, async () => {
      if (search.value === '') {
        listItems.value = []
        return
      }
      const res = await axiosApi.get('/search', {
        params: {
          q: search.value.trim()
        }
      })

      listItems.value = res.data
      console.log(res.data)
    })

    return {
      search,
      listItems
    }
  }
})
</script>
<style scoped lang="scss">
.search {
  width: 400px;

  @media screen and (max-width: 1024px) {
    width: 200px;
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
