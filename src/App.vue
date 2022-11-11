<template>
  <router-view />
</template>

<script>
import { io } from 'socket.io-client';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import store from './store';

export default {
  setup () {
    // 建立socket連線
    const socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
    store.commit('SET_SOCKET_CONNECTION', socket);
    const setSocketConnection = () => {

    };

    onBeforeUnmount(() => {
      socket.disconnect();
    });

    console.log(socket);
    socket.emit('sendMsg', 'hiihih');

    // 監聽廣播事件
    socket.on('broadcast', (data) => {
      console.log(data);
    });

    return {
      socket, setSocketConnection
    };
  }
};

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
