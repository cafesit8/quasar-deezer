<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderComponent :toggleDrawer="toggleLeftDrawer" />
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <aside class="sidebar">
        <img class="logo" src="/public/foxbel-music-2dc607d4.png" alt="logo">
        <q-list>
          <q-item-label header>
            <span class="header_list">Mi Librería</span>
          </q-item-label>

          <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
        </q-list>
        <q-list>
          <q-item-label header>
            <span class="header_list">PlayList</span>
          </q-item-label>
        </q-list>
      </aside>
    </q-drawer>
    <q-page-container class="view">
      <router-view />
    </q-page-container>
    <FooterComponent />
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import FooterComponent from 'src/components/FooterComponent.vue'
import HeaderComponent from 'src/components/HeaderComponent.vue'

const linksList = [
  {
    title: 'Recientes',
    link: 'home'
  },
  {
    title: 'Pop musicoll',
    link: 'singers'
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

    ._item {
      color: red;
      font-size: 20px;
      font-weight: 600;
    }
  }
}
</style>
