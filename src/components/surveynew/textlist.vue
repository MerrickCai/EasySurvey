<template>
  <div class="textall">
    <transition-group name="textques">
      <textques
        v-for="(item, index) in textfile"
        :key="item.id"
        :quesitem="item"
        :textfile="textfile"
        :treceive="treceive"
        :tdeleteques="tdeleteques"
      ></textques>
    </transition-group>
  </div>
</template>

<script setup>
import textques from "./textques.vue";
const props = defineProps(["textfile", "treceive", "tdeleteques"]);
</script>

<style lang="less" scoped>
.textques-enter-active,
.textques-leave-active {
  transition: all 0.5s ease;
}
.textques-enter-from,
.textques-leave-to {
  opacity: 0;
  transform: text(0) translateY(30px);
}
.textques-enter-to,
.textques-leave-from {
  opacity: 1;
  transform: text(1);
}
</style>