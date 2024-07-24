export function someMutation (/* state */) {
}

export function addPlayList (state, payload) {
  state.playList.push(payload)
}

export function deletePlayList (state, payload) {
  state.playList = state.playList.filter((play) => play.id !== payload)
}
