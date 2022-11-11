<template>
  <div class="chat_wrap">
    <div class="top">
      <h3>在線人數</h3>
      <div class="close">
        <img :src="require('../assets/img/close.png')">
      </div>
    </div>

    <div class="main">
      66
    </div>
    <div class="bottom">
      <input
        id="sendtxt"
        type="text"
        placeholder="Type a message"
      >
      <div class="sendBtn">
        <img :src="require('../assets/img/send.png')">
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  setup () {
    const message = ref('');
    const socket = store.state.socket;

    return {
      message, socket
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
    background-color: #f4f4f4;
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

</style>
