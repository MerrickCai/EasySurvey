<template>
  <div class="matrixall">
    <transition-group name="matrixques">
      <matrix
        class="wow"
        v-for="(item, index) in fileword.quesList"
        :key="item.id"
        :quesitem="item"
        :fileword="fileword"
        :receive="receive"
        :deleteques="deleteques"
      ></matrix>
    </transition-group>
  </div>
</template>

<script setup>
import matrix from "./matrix.vue";
import { onMounted, ref, nextTick } from "vue";
import { WOW } from "wowjs";
import "wowjs/css/libs/animate.css";

onMounted(() => {
  nextTick(() => {
    let wow = new WOW({
      boxClass: "wow", // default 盒子类名
      animateClass: "move-up", // default 为animate.css触发css动画的库
      offset: 0, // default 偏移量
      mobile: false, // default 是否支持手机
      live: false, // default 检查新元素
    });
    wow.init();
  });
});

const emit = defineEmits(["updateamount"]);
const props = defineProps(["fileword", "receive", "deleteques"]);
</script>

<style>
.move-up {
  animation: 1s move-up;
}
@keyframes move-up {
  0% {
    opacity: 0.7;
    transform: scale(0.8);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.matrixques-enter-active,
.matrixques-leave-active {
  transition: all 0.5s ease;
}
.matrixques-enter-from,
.matrixques-leave-to {
  opacity: 0;
  transform: scale(0) translateY(30px);
}
.matrixques-enter-to,
.matrixques-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>