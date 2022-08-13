<script setup>
import navbar from './components/navbar.vue'
</script>

<template>
  <navbar />
  <div id="router_wrapper">
  <router-view></router-view>
  </div>

</template>


<style lang="less" scoped>
#router_wrapper{
    display: block;
    margin: 70px auto 0 auto;
    min-height: 400px;
    width: var(--safe_area);
    padding:50px;
    background-color: rgba(190, 155, 155,0.1);
    overflow: scroll;
}
</style>