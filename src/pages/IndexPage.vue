<template>
  <q-page class="flex">
    <div class="container">
      <AlbumSection />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import AlbumSection from '../sections/SingersPage/AlbumSection.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    AlbumSection
  }
})
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  padding: 30px 50px;
  max-width: 1000px;
  margin: 0 auto;
}
</style>
