<template>
  <article class="card">
    <q-btn-dropdown color="" dropdown-icon="more_vert" unelevated @click="playListClick">
      <div v-show="playList.length !== 0">
        <q-list>
          <q-item v-for="play in playList" :key="play.id" clickable v-close-popup>
            <q-item-section @click="addSongToPLayListFn(play)">
              <q-item-label>{{ play.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-btn-dropdown>
    <picture>
      <img :src="album?.album.cover_medium" alt="">
      <svg @click="handleClick" width="40" height="40" viewBox="0 0 24 24" fill="currentColor"
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
import { useDialog } from 'src/composables/useDialog'
import { usePlayList } from 'src/composables/usePlayList'

export default defineComponent({
  name: 'CardMusic',
  props: {
    album: {
      type: Object
    }
  },
  setup (props) {
    const { toggleDialog } = useDialog()
    const { playList, addSongToPlayList } = usePlayList()
    const { playSong, setSongInfo } = useMusic()
    const { title, artist: { name: singer }, preview: song, album: { cover_medium: cover }, id, duration } = props.album

    function handleClick () {
      setSongInfo({
        id,
        title,
        singer,
        cover,
        song,
        duration,
        toggleDialog
      })
      playSong()
    }

    function addSongToPLayListFn (play) {
      const newsong = {
        id,
        title,
        singer,
        cover,
        song,
        duration
      }
      addSongToPlayList({
        id: play.id,
        name: play.name,
        song: newsong
      })
    }

    function playListClick () {
      if (playList.value.length === 0) {
        toggleDialog()
      }
    }
    return {
      handleClick,
      playListClick,
      playList,
      addSongToPLayListFn
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
  position: relative;

  &:hover {
    transform: scale(1.1);
    transition: .3s;
  }

  button {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: transparent;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    z-index: 50;
    cursor: pointer;

    .icon {
      color: white;
    }
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
