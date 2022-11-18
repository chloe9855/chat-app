<template>
  <div class="wrap">
    <div class="container">
      <img
        :src="require('../assets/img/planet.png')"
        class="icon"
      >
      <p class="title">
        Join chat room!
      </p>
      <input
        v-model.trim="userName"
        type="text"
        placeholder="Enter your name"
        @keyup.enter="loginHandler"
      >

      <el-button
        class="enterBt"
        :plain="true"
        @click="loginHandler"
      >
        Start
      </el-button>
    </div>
  </div>
</template>

<script>
import { reactive, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import store from '@/store';
import { ElMessage } from 'element-plus';
import { io } from 'socket.io-client';

export default {
  setup () {
    const userName = ref('');
    const showWarning = ref(false);
    const router = useRouter();

    const loginHandler = () => {
      if (userName.value === '') {
        ElMessage({
          showClose: true,
          message: 'Please enter your name',
          type: 'warning',
          duration: 2000
        });
      } else {
        setSocketConnection();
      }
    };

    const setSocketConnection = () => {
      // 建立socket連線
      const socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
      store.commit('SET_SOCKET_CONNECTION', socket);

      socket.on('connectFail', () => {
        ElMessage({
          message: 'Sorry, there seems to be an issue with the connection.',
          type: 'warning'
        });
      });

      socket.emit('login', userName.value);

      socket.on('loginSuccess', () => {
        sessionStorage.setItem('user', userName.value);
        router.push({ path: '/chatPage' });
      });

      socket.on('loginFail', () => {
        socket.disconnect();
        ElMessage({
          showClose: true,
          message: 'Duplicate name already exists',
          type: 'warning',
          duration: 10000
        });
      });
    };

    return {
      userName, router, loginHandler, showWarning, setSocketConnection
    };
  }
};
</script>

<style lang="scss">

  .wrap {
    background-image: linear-gradient(to right top, #dbb0ff, #e2bbff, #e8c5ff, #eed0ff, #f3dbff, #efe1ff, #ece7ff, #ececff, #e3edff, #d7f0ff, #cbf2ff, #c1f4ff);
    background-image: linear-gradient(to right top, #dbb0ff, #e2bbff, #e8c5ff, #eed0ff, #f3dbff, #f5dcfe, #f7defd, #f8dffc, #f8d6f9, #f8cdf4, #fac4ef, #fbbae9);
    width: 100vw;
    height: 100vh;
    text-align:center;
    display: flex;
    justify-content: center;
    align-items: center;
    @include noto-sans-tc-16-regular;
  }

  .container {
    background: white;
    width: 70vw;
    max-width: 500px;
    border-radius: 25px;
    padding: 50px 20px;

    .icon {
      width: 110px;
      transform: rotate(25deg);;
      margin-bottom: 20px;
    }

    .title {
      font-size: 30px;
      @include noto-sans-tc-24-medium;
      font-weight: 600;
    }

    input {
      width: 30%;
      min-width: 214px;
      border: none;
      background-color: #F9EAFF;
      padding: 0 20px;
      border-radius: 20px;
      outline: 0;
      display:block;
      margin: 20px auto;
      height: 40px;
      line-height:40px;
      @include noto-sans-tc-16-regular;

      &::placeholder {
        color: #a19bc4;
      }
    }

    .enterBt {
      width:50%;
      min-width: 250px;
      margin:0 auto;
      height: 40px;
      line-height:40px;
      border:none;
      // background:#7062D1;
      background: #9f5ed5;
      color:#fff;
      border-radius:20px;
      cursor: pointer;
      @include noto-sans-tc-16-regular;
    }
  }

  .el-message__content {
    @include noto-sans-tc-16-regular;
  }

  .el-message {
    min-width: 320px;
  }

</style>
