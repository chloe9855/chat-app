<template>
  <router-view />
</template>

<script>
import { io } from 'socket.io-client';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import store from './store';

export default {
  setup () {
    const socket = store.state.socket;
    // 建立socket連線
    // const socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
    // store.commit('SET_SOCKET_CONNECTION', socket);

    onBeforeUnmount(() => {
      socket.disconnect();
    });

    // console.log(socket);

    return {
      socket
    };
  }
};

</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
