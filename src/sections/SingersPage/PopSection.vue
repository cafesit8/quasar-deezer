<template>
  <ListCardMusic url="/playlist/5" />
</template>
<script>
import { defineComponent } from 'vue'
import ListCardMusic from 'src/components/ListCardMusic.vue'

export default defineComponent({
  name: 'AlbumSection',
  components: {
    ListCardMusic
  }
})
</script>
