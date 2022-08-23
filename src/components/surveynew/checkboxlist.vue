<template>
  <div class="checkboxall">
    <transition-group name="checkboxques">
      <checkbox
        v-for="(item, index) in checkboxfile"
        :key="item.id"
        :quesitem="item"
        :checkboxfile="checkboxfile"
        :creceive="creceive"
        :cdeleteques="cdeleteques"
      ></checkbox>
    </transition-group>
  </div>
</template>

<script setup>
import checkbox from "./checkbox.vue";

const props = defineProps(["checkboxfile", "creceive", "cdeleteques"]);
</script>

<style lang="less" scoped>
.checkboxques-enter-active,
.checkboxques-leave-active {
  transition: all 0.5s ease;
}
.checkboxques-enter-from,
.checkboxques-leave-to {
  opacity: 0;
  transform: checkbox(0) translateY(30px);
}
.checkboxques-enter-to,
.checkboxques-leave-from {
  opacity: 1;
  transform: checkbox(1);
}
</style>