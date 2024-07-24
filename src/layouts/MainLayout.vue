<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderComponent :toggleDrawer="toggleLeftDrawer" />
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <aside class="sidebar">
        <img class="logo" src="/public/foxbel-music-2dc607d4.png" alt="logo">
        <q-list>
          <q-item-label class="q-px-none" header>
            <span class="header_list">Mi Librería</span>
          </q-item-label>

          <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
        </q-list>
        <q-list class="playlist">
          <q-item-label class="q-px-none" header>
            <span class="header_list">PlayList</span>
          </q-item-label>
          <div v-if="playList.length !== 0">
            <q-item v-for="play in playList" :key="play.id" clickable v-ripple>
              <q-item-section>
                <q-item-label>
                  <div class="playlist_item">
                    <span>{{ play.name }}</span>
                    <button @click="handleDelete(play.id)" class="delete_btn">X</button>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <button @click="toggleDialog">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-plus">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 5l0 14" />
              <path d="M5 12l14 0" />
            </svg>
            Crear PlayList
          </button>
        </q-list>
      </aside>
    </q-drawer>
    <q-page-container class="view">
      <router-view />
    </q-page-container>
    <FooterComponent />
  </q-layout>
  <q-dialog v-model="isOpen" persistent>
    <q-card class="q-pa-lg relative-position" style="width: 350px;">
      <div class="text-h6 dialog_content">
        <span class="title">Crear PlayList</span>
        <p>¡Crea tu propia banda sonora! Crea una playlist personalizada con tus canciones favoritas.</p>
        <q-input v-model="namePlaylist" class="q-mt-sm" rounded outlined placeholder="Nombre Playlist"
          :dense="true"></q-input>
        <button class="dialog_content_btn" @click="handleClick">Crear</button>
      </div>
      <button class="close" @click="toggleDialog">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-x">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </button>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import FooterComponent from 'src/components/FooterComponent.vue'
import HeaderComponent from 'src/components/HeaderComponent.vue'
import { useDialog } from 'src/composables/useDialog'
import { usePlayList } from 'src/composables/usePlayList'

const linksList = [
  {
    title: 'Recientes',
    link: '/'
  },
  {
    title: 'Pop musicoll',
    link: 'artistas'
  },
  {
    title: 'Eléctronica',
    link: 'albums'
  }
]

export default defineComponent({
  name: 'MainLayout',
  components: {
    EssentialLink,
    FooterComponent,
    HeaderComponent
  },
  data () {
    return {
      linksList,
      leftDrawerOpen: false
    }
  },
  methods: {
    toggleLeftDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    }
  },
  setup () {
    const { playList, addPlayList, deletePlayList } = usePlayList()
    const namePlaylist = ref('')
    const { toggleDialog, isOpen } = useDialog()

    function handleClick () {
      toggleDialog()
      addPlayList({ id: crypto.randomUUID(), name: namePlaylist.value, songs: [] })
      namePlaylist.value = ''
    }

    function handleDelete (id) {
      deletePlayList(id)
    }

    return {
      playList,
      isOpen,
      namePlaylist,
      handleClick,
      toggleDialog,
      handleDelete
    }
  }
})
</script>

<style scoped lang="scss">
@use '../css/quasar.variables.scss' as *;

.sidebar {
  background-color: $dark-red;
  color: white;
  width: 100%;
  height: 100%;
  padding: 35px;

  .logo {
    width: 100%;
    margin-top: 10px;
  }

  .header_list {
    color: white;
    font-size: 25px;
    font-weight: 600;
    padding: 0;

    ._item {
      color: red;
      font-size: 20px;
      font-weight: 600;
    }
  }

  .playlist {

    button {
      width: 100%;
      background-color: transparent;
      color: $red_principal;
      font-size: 17px;
      font-weight: 500;
      padding: 10px;
      border-radius: 15px;
      border: none;
      display: flex;
      gap: 10px;
      cursor: pointer;

      &:hover {
        background-color: #eb575769;
      }
    }
  }
}

.close {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.dialog_content {

  .title {
    color: $light-red;
  }

  p {
    font-size: 15px;
    line-height: normal;
    font-weight: 300;
    color: $black-70;
  }

  &_btn {
    border: none;
    width: 100%;
    margin-top: 10px;
    border-radius: 15px;
    font-weight: 300;
    font-size: 17px;
    color: white;
    background-color: $light-red;
    cursor: pointer;
  }
}

.playlist_item {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .delete_btn {
    width: auto !important;
  }
}
</style>
