<template>
  <div class="mixall">
    <transition-group name="mixques">
      <mix
        v-for="(item, index) in mixfile"
        :quesitem="item"
        :key="item.id"
        :index="index"
        :mixfile="mixfile"
        :mixreceive="mixreceive"
        :mixdeleteques="mixdeleteques"
      ></mix>
    </transition-group>
  </div>
</template>

<script setup>
import mix from './mix.vue'

const props = defineProps(["mixfile", "mixreceive", "mixdeleteques"]);
</script>

<style lang="less" scoped>
.mixques-enter-active,
.mixques-leave-active {
  transition: all 0.5s ease;
}
.mixques-enter-from,
.mixques-leave-to {
  opacity: 0;
  transform: scale(0.5) translateY(30px);
}
.mixques-enter-to,
.mixques-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>