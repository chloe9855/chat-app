<template>
  <div class="wrap">
    <div class="container">
      <p class="icon">
        🍇
      </p>
      <p class="title">
        Join chat room!
      </p>
      <input
        v-model.trim="userName"
        type="text"
        placeholder="Enter your name"
      >
      <!-- <div
        class="enterBt"
        @click="loginHandler"
      >
        Start
      </div> -->
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
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import store from '@/store';
import { ElMessage } from 'element-plus';
import { io } from 'socket.io-client';

export default {
  setup () {
    const userName = ref('');
    const showWarning = ref(false);
    const router = useRouter();
    // const socket = store.state.socket;

    const loginHandler = () => {
      if (userName.value === '') {
        ElMessage({
          showClose: true,
          userName: 'Please enter you name',
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

      sessionStorage.setItem('user', userName.value);
      socket.emit('login', userName.value);
      router.push({ path: '/chatPage' });
    };

    return {
      userName, router, loginHandler, showWarning, setSocketConnection
    };
  }
};
</script>

<style lang="scss">

  .wrap {
    background: repeating-linear-gradient(45deg,
    #EAD7EA 0,#EAD7EA 15%,
    #ccc7e8 30%,  #ccc7e8 45%,
    #EAD7EA 60%);
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
       font-size: 50px;
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
      background-color: #f4e8f4;
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
      // display:block;
      margin:0 auto;
      height: 40px;
      line-height:40px;
      border:none;
      background:#7062D1;
      color:#fff;
      border-radius:20px;
      cursor: pointer;
      @include noto-sans-tc-16-regular;
    }
  }

  .el-message__content {
    @include noto-sans-tc-16-regular;
  }

</style>
