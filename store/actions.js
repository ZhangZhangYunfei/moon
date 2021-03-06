export default {
  setUser ({commit}, payload) {
    commit('SET_USER', payload)
  },

  beginLoading ({commit}) {
    commit('LOADING_TOGGLE', true)
    setTimeout(() =>{
      commit('LOADING_TOGGLE', false)
    }, 30000)
  },

  stopLoading ({commit}) {
    commit('LOADING_TOGGLE', false)
  }
}
