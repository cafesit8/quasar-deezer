export function someMutation (/* state */) {
}

export function setSongInfo (state, payload) {
  state.songInfo = payload
}

export function playSong (state) {
  state.isPlaying = true
}

export function isPlayingToggle (state) {
  state.isPlaying = !state.isPlaying
}
