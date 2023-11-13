import { createStore } from 'vuex'

export default createStore({
  state: {
    token: "",
    user_id : "",
    isAuthenticated: false
  },
  getters: {
  },
  mutations: {
    initializeToken(state){
      if(localStorage.getItem('token')){
        state.token = localStorage.getItem('token');
        state.user_id = localStorage.getItem('user_id');
        state.isAuthenticated = true;
      }
      else{
        this.isAuthenticated = false;
      }
    },
    setToken(state, data){
      state.token = data.token,
      state.user_id = data.user_id,
      state.isAuthenticated = true,
      localStorage.setItem("token", data.token),
      localStorage.setItem("user_id", data.user_id)
    }
  },
  actions: {
  },
  modules: {
  }
})
