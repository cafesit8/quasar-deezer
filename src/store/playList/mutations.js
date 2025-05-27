export function someMutation (/* state */) {
}

export function addPlayList (state, payload) {
  state.playList.push(payload)
}

export function deletePlayList (state, payload) {
  state.playList = state.playList.filter((play) => play.id !== payload)
}

export function addSongToPlayList (state, payload) {
  const playList = state.playList.find((play) => play.id === payload.id)
  if (playList) {
    playList.songs.push(payload.song)
  }
}
