<template>
  <div class="chat_wrap">
    <div class="top">
      <h3>在線人數：{{ onlinePeople }} 人</h3>
      <div
        class="close"
        @click="leaveHandler"
      >
        <img :src="require('../assets/img/close.png')">
      </div>
    </div>

    <div class="main">
      <div
        v-if="chatRows.length > 0"
        class="chat-con"
      >
        <div
          v-for="(item,index) in chatRows"
          :key="index"
          class="chat-item"
          :class="currentClassHandler(item.name)"
        >
          <span class="uname">{{ item.name }}</span>
          <div class="message">
            {{ item.msg }}
          </div>
        </div>
      </div>
    </div>

    <div class="bottom">
      <input
        id="sendtxt"
        v-model="message"
        type="text"
        placeholder="Type a message"
        @keyup.enter="sendMessageHandler"
      >
      <div
        class="sendBtn"
        @click="sendMessageHandler"
      >
        <img :src="require('../assets/img/send.png')">
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onBeforeUnmount, computed } from 'vue';
import store from '@/store';
import { useRouter } from 'vue-router';
import { io } from 'socket.io-client';

export default {
  setup () {
    const message = ref('');
    const socket = computed(() => {
      return store.state.socket;
    });
    const userName = sessionStorage.getItem('user');
    const chatRows = reactive([]);
    const onlinePeople = ref(0);
    const router = useRouter();

    // 若重整頁面 要重新建立連線
    if (userName !== '' && store.state.socket === null) {
      const setSocket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
      store.commit('SET_SOCKET_CONNECTION', setSocket);
    }

    // const socket = store.state.socket;

    // 監聽上線人數
    socket.value.on('onlineUsers', (data) => {
      console.log(data);
      onlinePeople.value = data;
    });

    // 監聽新加入的人
    socket.value.on('addUser', (data) => {

    });

    // 進入聊天室時，會收到之前的全部訊息，並更新到 messages
    // socket.on('allMessage', (data) => {
    //   console.log('allMessage');
    //   console.log(data);
    //   chatRows = data;
    // });

    // 監聽新訊息
    socket.value.on('newMessage', (data) => {
      chatRows.push(data);
      console.log(data);
    });

    // 發送訊息
    const sendMessageHandler = () => {
      socket.value.emit('sendMessage', {
        name: userName,
        msg: message.value
      });
      message.value = '';
    };

    const currentClassHandler = (payload) => {
      return payload === userName ? 'right' : 'left';
    };

    // 離開聊天室 登出
    const leaveHandler = () => {
      socket.value.disconnect();
      socket.value.emit('logout', userName);

      sessionStorage.clear();
      router.push({ path: '/' });
    };

    onBeforeUnmount(() => {
      socket.value.disconnect();
    });

    return {
      message, socket, sendMessageHandler, userName, chatRows, currentClassHandler, onlinePeople, leaveHandler, router
    };
  }
};
</script>

<style lang="scss">

  .chat_wrap{
    width: 100%;
    height: 100%;
    // background-color: #f4f4f4;
    text-align:center;
    position: relative;
    @include noto-sans-tc-16-regular;
  }

  .top {
      position: relative;
      background-color: white;
      box-shadow: 0px -7px 15px #c3c4dd;
      padding: 15px;
      text-align: left;
      display: flex;
      align-items: center;
      justify-content: space-between;

      h3 {
        font-weight: 600;
        color: #494949;
      }

      .close {
        img {
          width: 15px;
        }
      }
    }

  .main {
    background-color: #ead7ea;
    height: calc(100vh - 155.2px);
    overflow-y: auto;
  }

  .bottom{
    position:fixed;
    bottom:0;
    left: 0;
    width:100%;
    height: 100px;
    background: rgba(255,255,255,.8);
    display: flex;
    align-items: center;
    justify-content: space-around;
    // border:1px solid red;
  }
  .bottom input{
      width: calc(100% - 120px);
      height: 45px;
      border-radius: 35px;
      border:none;
      outline: none;
      line-height: 50px;
      padding: 0 20px;
      box-shadow: 0px 0px 12px #d5d6e5;
      @include noto-sans-tc-16-regular;
  }

  .sendBtn {
    background: #979ae5;
    border-radius: 25px;
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      filter: brightness(1.1);
      cursor: pointer;
      transition: .2s;
      transform: scale(1.05);
    }

    img {
      width: 20px;
      height: 20px;
    }
  }

  .chat-con {
    padding: 10px 0;
  }

  .chat-item {
    // width: 100%;
    position: relative;
    // max-width: 50%;
    // width: max-content;

    .message {
        display: block;
        padding: 10px;
        max-width: 50vw;
        word-wrap:break-word
    }
  }

  .left {
    text-align: left;
    display: flex;
    justify-content: flex-start;

    .message {
      background: #979ae5;
      color: white;
      border-radius: 0px 15px 15px 15px;
      margin-top: 30px;
      margin-left: 10px;
      padding: 15px;
      font-weight: 400;
    }

    .uname {
        font-size: 15px;
        font-weight: 500;
        position: absolute;
        left: 11px;
        top: 4px;
        color: gray;
    }
  }

  .right {
    text-align: right;
    display: flex;
    justify-content: flex-end;

    .message {
      background: white;
      color: #413177;
      // font-size: 15px;
      // font-weight: 400;
      border-radius: 15px 0px 15px 15px;
      padding: 15px;
      margin-top: 30px;
      margin-right: 10px;
    }

    .uname {
        font-size: 15px;
        font-weight: 500;
        position: absolute;
        right: 11px;
        top: 4px;
        color: gray;
    }
  }

</style>
