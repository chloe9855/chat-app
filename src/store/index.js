import { createStore } from 'vuex';

export default createStore({
  state: {
    socket: null,
    userName: ''
  },
  getters: {
  },
  mutations: {
    SET_SOCKET_CONNECTION (state, data) {
      state.socket = data;
    },
    SET_USER_NAME (state, data) {
      state.userName = data;
    }
  },
  actions: {
  },
  modules: {
  }
});
