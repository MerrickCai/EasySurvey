<script setup>
import navbar from './components/navbar.vue'
</script>

<template>
  <navbar></navbar>
  <main>
    <div>
      <router-view></router-view>
    </div>
  </main>
</template>


<style lang="less" scoped>
main {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;

  div {
    display: block;
    margin-top: 60px;
    height: calc(100vh - 60px);
    width: var(--safe_area);
    box-shadow: 0 0 3px 3px rgba(rgba(150,150,150,0.1));
  }
}
</style>