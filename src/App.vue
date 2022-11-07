<template>
  <nav>
    <router-link to="/">
      Home
    </router-link> |
    <router-link to="/about">
      About
    </router-link>
  </nav>
  <router-view />
</template>

<script>
import { io } from 'socket.io-client';
import { ref, onMounted } from 'vue';

export default {
  setup () {
    // 建立socket連接
    const socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
    console.log(socket);
    socket.emit('sendMsg', 'hiihih');

    return {
      // socket
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
