<template>
  <div class="radioall">
    <transition-group name="radioques">
      <radio
        v-for="(item, index) in radiofile"
        :quesitem="item"
        :key="item.id"
        :radiofile="radiofile"
        :rreceive="rreceive"
        :rdeleteques="rdeleteques"
      ></radio>
    </transition-group>
  </div>
</template>

<script setup>
import radio from "./radio.vue";

const props = defineProps(["radiofile", "rreceive", "rdeleteques"]);
</script>

<style lang="less" scoped>
.radioques-enter-active,
.radioques-leave-active {
  transition: all 0.5s ease;
}
.radioques-enter-from,
.radioques-leave-to {
  opacity: 0;
  transform: scale(0.5) translateY(30px);
}
.radioques-enter-to,
.radioques-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>