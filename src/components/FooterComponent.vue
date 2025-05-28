<template>
  <footer>
    <div class="info">
      <div class="info_song">
        <picture>
          <img :src="songInfo?.cover || '/default_cover.png'" alt="">
        </picture>
        <div class="info_song_details">
          <p>{{ songInfo?.title }}</p>
          <small>{{ songInfo?.singer }}</small>
        </div>
      </div>
      <div class="controls">
        <div>
          <button @click="toggleIsPlaying">
            <svg v-if="!isPlaying" width="25" height="25" viewBox="0 0 24 24" fill="currentColor"
              class="icon icon-tabler icons-tabler-filled icon-tabler-player-play">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" />
            </svg>
            <svg v-else width="25" height="25" viewBox="0 0 24 24" fill="currentColor"
              class="icon icon-tabler icons-tabler-filled icon-tabler-player-pause">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" />
              <path d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" />
            </svg>
          </button>
        </div>
        <div class="slider">
          <span>{{ formatTime(currentTime) }}</span>
          <input @input="handleChange" :value="currentTime" type="range" min="0" :max="30">
          <span>{{ formatTime(30) }}</span>
          <audio ref="audio"></audio>
        </div>
      </div>
      <div class="info_volume">
        <input @input="handleVolume" type="range" min="0" value="0.5" step="0.01" max="1">
        <svg v-if="audio?.volume > 0" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-volume">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 8a5 5 0 0 1 0 8" />
          <path d="M17.7 5a9 9 0 0 1 0 14" />
          <path
            d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
        </svg>
        <svg v-else width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-volume-3">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
          <path d="M16 10l4 4m0 -4l-4 4" />
        </svg>
      </div>
    </div>
  </footer>
</template>

<script>
import { defineComponent, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useMusic } from 'src/composables/useMusic'
import { formatTime } from 'src/helpers/convertTime'

export default defineComponent({
  name: 'FooterComponent',
  setup () {
    const audio = ref(null)
    const currentTime = ref(0)
    const { songInfo, toggleIsPlaying, isPlaying } = useMusic()

    function playAudio () {
      if (audio.value) {
        audio.value.play().catch(error => {
          console.error('Error playing audio:', error)
        })
      }
    }

    const handleLoadedData = () => playAudio()

    function updateCurrentTime () {
      if (audio.value) {
        currentTime.value = audio.value.currentTime
      }
    }

    function handleChange (e) {
      const newTime = e.target.value
      if (audio.value) {
        audio.value.currentTime = newTime
      }
      currentTime.value = newTime
    }

    onMounted(() => {
      nextTick(() => {
        if (audio.value) {
          audio.value.addEventListener('loadeddata', handleLoadedData)
          audio.value.addEventListener('timeupdate', updateCurrentTime)
        }
      })
    })

    onBeforeUnmount(() => {
      if (audio.value) {
        audio.value.removeEventListener('loadeddata', handleLoadedData)
        audio.value.removeEventListener('timeupdate', updateCurrentTime)
      }
    })

    watch(songInfo, async (newSongInfo, oldSongInfo) => {
      if (newSongInfo?.song !== oldSongInfo?.song) {
        await nextTick()
        if (audio.value) {
          audio.value.src = newSongInfo.song
          audio.value.load()
          playAudio()
        }
      }
    })

    watch(isPlaying, (newIsPlaying, oldIsPlaying) => {
      if (newIsPlaying !== oldIsPlaying && audio.value) {
        if (newIsPlaying) {
          playAudio()
        } else {
          audio.value.pause()
        }
      }
    })

    function handleVolume (e) {
      if (audio.value) {
        audio.value.volume = e.target.value
      }
    }

    return {
      songInfo,
      toggleIsPlaying,
      formatTime,
      handleChange,
      audio,
      currentTime,
      isPlaying,
      handleVolume
    }
  }
})
</script>

<style scoped lang="scss">
footer {
  width: 100%;
  height: 100px;
  background-color: $light-red;
  color: white;
  position: sticky;
  bottom: 0;
  left: 0;
  display: flex;
  z-index: 9999;
  overflow: hidden;

  @media (max-width: 600px) {
    height: 70px;
  }

  .info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 15px;
    align-items: center;

    &_song {
      display: flex;
      align-items: center;
      gap: 15px;

      @media (max-width: 600px) {
        width: 240px;
        gap: 7PX;
        height: 100%;
      }

      picture {
        display: block;
        width: 100px;
        height: 100px;

        @media (max-width: 600px) {
          width: 50%;
          height: 100%;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      &_details {
        display: flex;
        flex-direction: column;

        @media (max-width: 600px) {
          width: 50%;
        }

        p {
          font-size: 15px;
          font-weight: 500;
          margin: 0;

          @media (max-width: 600px) {
            font-size: 10px;
          }
        }

         small {
           @media (max-width: 600px) {
            font-size: 10px;
           }
         }
      }
    }

    .controls {
      width: 400px;
      display: flex;
      flex-direction: column;
      align-items: center;

      button {
        background-color: rgba(255, 255, 255, 0.35);
        border: none;
        outline: none;
        cursor: pointer;
        display: grid;
        place-content: center;
        border-radius: 100%;
        width: 40px;
        height: 40px;

        .icon {
          color: white;
        }
      }

      .slider {
        width: 100%;
        display: flex;
        gap: 5px;

        input {
          width: 100%;
        }
      }
    }

    &_volume {
      width: 180px;
      display: flex;
      gap: 10px;

      @media (max-width: 600px) {
        display: none;
      }
    }
  }
}
</style>
