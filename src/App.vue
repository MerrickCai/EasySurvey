<script setup>

</script>

<template>
  <nav>
    <router-link to="/">首页</router-link>
    <router-link to="/login">登录/注册</router-link>
  </nav>
  <router-view></router-view>
</template>


<style lang="less" scoped>
nav {
  display: flex;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  padding: 5px;
  width: auto;
  a {
    text-decoration: none;
    display: block;
    margin: 5px;
    color: rgb(255, 255, 255);
    font-size: 3rem;
    background-color: rgba(83, 110, 196, 0.8);
    border-radius: 10px;
    padding:5px;
  }
}
</style>