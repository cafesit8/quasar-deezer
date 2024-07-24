<template>
  <section v-if="loading" class="loading_section">
    <CardSkeleton v-for="i in 10" :key="i" />
  </section>
  <section v-else class="section-album">
    <h3><span>{{ data.artist ? 'Album' : 'Playlist' }}</span> - {{ data.artist?.name || data.creator?.name }}</h3>
    <div class="container">
      <CardMusic v-for="album in data.tracks?.data" :key="album.id" :album="album"></CardMusic>
    </div>
  </section>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue'
import { axiosApi } from 'src/config.js'
import CardMusic from 'src/components/CardMusic.vue'
import CardSkeleton from './CardSkeleton.vue'

export default defineComponent({
  name: 'AlbumSection',
  props: {
    url: {
      type: String
    }
  },
  components: {
    CardMusic,
    CardSkeleton
  },
  setup (props) {
    const data = ref({})
    const loading = ref(true)

    onMounted(async () => {
      const res = await axiosApi.get(props.url)
      data.value = res.data
      loading.value = false
    })
    return {
      data,
      loading
    }
  }
})
</script>

<style scoped lang="scss">
@use 'src/css/quasar.variables.scss' as *;

.loading_section {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.section-album {
  width: 100%;
  // padding-bottom: 100px;

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
