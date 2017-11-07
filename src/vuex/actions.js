const actions = {
  actionInc ({ commit, state }, payload) {
    const newCount = state.count + payload
    commit('increment', newCount)
  }
}

export default actions
