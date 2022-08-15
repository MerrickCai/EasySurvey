<script setup>
import navbar from './components/navbar.vue'
</script>

<template>
  <navbar></navbar>
  <main>
    <div>
      <!--路由容器-->
      <router-view></router-view>
    </div>
  </main>
</template>

<style lang="less" scoped>
@nav: 60px;

main {
  display: block;
  height: 100vh;
  width: var(--safe_area);
  margin: 0 auto;
  padding-top: @nav;

  >div {
    display: block;
    height: calc(100vh - @nav);
    width: 100%;
    overflow: auto;
  }
}
</style>