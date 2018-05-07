export default {
  SET_USER: (state, user) => {
    state.user = user
  },

  LOADING_TOGGLE: (state, isLoading) => {
    state.isLoading = isLoading
  },
}
