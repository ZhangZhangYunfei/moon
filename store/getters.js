export default {
  userName: state => {
    return state.user.username
  },

  isLoading: state => {
    return state.isLoading
  }
}
