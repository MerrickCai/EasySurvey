<<<<<<< HEAD:src/components/scalelist.vue
<template>
  <div class="scaleall">
    <transition-group name="scaleques">
      <scale
        v-for="(item, index) in scalefile.questionList"
        :key="item.id"
        :it="index"
        :quesitem="item"
        :scalefile="scalefile"
        :sreceive="sreceive"
        :sdeleteques="sdeleteques"
      ></scale>
    </transition-group>
  </div>
</template>

<script setup>
import scale from "./scale.vue";

const props = defineProps(["scalefile", "sreceive", "sdeleteques"]);
</script>

<style lang="less" scoped>
.scaleques-enter-active,
.scaleques-leave-active {
  transition: all 0.5s ease;
}
.scaleques-enter-from,
.scaleques-leave-to {
  opacity: 0;
  transform: scale(0) translateY(30px);
}
.scaleques-enter-to,
.scaleques-leave-from {
  opacity: 1;
  transform: scale(1);
}
=======
<template>
  <div class="scaleall">
    <transition-group name="scaleques">
      <scale
        v-for="(item, index) in scalefile.questionList"
        :key="item.id"
        :quesitem="item"
        :scalefile="scalefile"
        :sreceive="sreceive"
        :sdeleteques="sdeleteques"
      ></scale>
    </transition-group>
  </div>
</template>

<script setup>
import scale from "./scale.vue";

const props = defineProps(["scalefile", "sreceive", "sdeleteques"]);
</script>

<style lang="less" scoped>
.scaleques-enter-active,
.scaleques-leave-active {
  transition: all 0.5s ease;
}
.scaleques-enter-from,
.scaleques-leave-to {
  opacity: 0;
  transform: scale(0) translateY(30px);
}
.scaleques-enter-to,
.scaleques-leave-from {
  opacity: 1;
  transform: scale(1);
}
>>>>>>> 653e90322ae9090e58b7633c6923f58886e65fb1:src/components/surveynew/scalelist.vue
</style>