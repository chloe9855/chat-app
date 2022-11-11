import { createStore } from 'vuex';

export default createStore({
  state: {
    socket: ''
  },
  getters: {
  },
  mutations: {
    SET_SOCKET_CONNECTION (state, data) {
      state.socket = data;
    }
  },
  actions: {
  },
  modules: {
  }
});
