<template>
  <article class="card" @click="handleClick">
    <picture>
      <img :src="album?.album.cover_medium" alt="">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"
        class="icon icon-tabler icons-tabler-filled icon-tabler-player-play">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" />
      </svg>
    </picture>
    <div>
      <p>{{ album.title }}</p>
      <small v-if="album.artist.name">{{ album.artist.name }}</small>
    </div>
  </article>
</template>
<script>
import { defineComponent } from 'vue'
import { useMusic } from 'src/composables/useMusic'

export default defineComponent({
  name: 'CardMusic',
  props: {
    album: {
      type: Object
    }
  },
  setup (props) {
    const { playSong, setSongInfo } = useMusic()
    const { title, artist: { name: singer }, preview: song, album: { cover_medium: cover }, id, duration } = props.album

    function handleClick () {
      // if (songInfo.value.id === id) return
      playSong()
      setSongInfo({
        id,
        title,
        singer,
        cover,
        song,
        duration
      })
    }
    return {
      handleClick
    }
  }
})
</script>

<style scoped lang="scss">
@use 'src/css/quasar.variables.scss' as *;

.card {
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
  transition: .3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    transition: .3s;
  }

  picture {
    position: relative;

    img {
      width: 100%;
    }

    .icon {
      position: absolute;
      inset: 0;
      margin: auto;
      color: white;
    }
  }

  p {
    color: $black-100;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  small {
    color: $black-70;
  }
}
</style>
