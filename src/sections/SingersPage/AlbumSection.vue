<template>
  <section class="section-album">
    <h3>Álbum - {{ data.artist?.name }}</h3>
    <div class="container">
      <CardMusic v-for="album in data.tracks?.data" :key="album.id" :album="album"></CardMusic>
    </div>
  </section>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue'
import { axiosApi } from 'src/config.js'
import CardMusic from 'src/components/CardMusic.vue'

export default defineComponent({
  name: 'AlbumSection',
  components: {
    CardMusic
  },
  setup () {
    const data = ref({})

    onMounted(async () => {
      const res = await axiosApi.get('/album/2')
      data.value = res.data
    })
    return {
      data
    }
  }
})
</script>

<style scoped lang="scss">
@use 'src/css/quasar.variables.scss' as *;

.section-album {
  width: 100%;
  padding-bottom: 100px;

  h3 {
    color: $light-red;
    font-size: 20px;
    font-weight: 500;
    line-height: normal;
  }

  .container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 20px;
  }
}
</style>
