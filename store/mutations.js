export default {
  SET_USER: (state, user) => {
    state.user = user
  },

  SET_EXAMINATIONS: (state, examinations) => {
    state.examinations = examinations
  },

  LOADING_TOGGLE: (state, isLoading) => {
    state.isLoading = isLoading
  },
}
