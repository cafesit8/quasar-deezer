<template>
  <q-header style="background-color: white; padding: 30px 50px; max-width: 1000px; margin: auto;">
    <div class="flex justify-between items-center">
      <q-input class="search" rounded outlined placeholder="Buscar..." :dense="true">
        <template v-slot:append>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
          </q-avatar>
        </template>
      </q-input>
      <div class="flex items-center">
        <p class="user">Usuario</p>
        <button @click="toggleDrawer" class="icon">
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round"
            class="icon-tabler icons-tabler-outline icon-tabler-menu-2">
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
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeaderComponent',
  props: {
    toggleDrawer: {
      type: Function
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
