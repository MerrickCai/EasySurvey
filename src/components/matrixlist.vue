<template>
  <div class="matrixall">
    <transition-group name="matrixques">
      <matrix
        class="matrixq"
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
import { onMounted, ref, reactive, nextTick, watch } from "vue";
import scrollReveal from "scrollreveal";

const emit = defineEmits(["updateamount"]);
const props = defineProps(["fileword", "receive", "deleteques"]);

// const data = reactive({
//   // 3.在reactive()中声明scrollReveal组件
//   scrollReveal: scrollReveal(),
// });
// // 4.设置scrollReveal的方法
// const retScroll = () => {
//   // reveal()的类名可以为id (#reveal-top) 也可以为class(.reveal-top) 名称随意 并且也支持并集class写法 注意必须设置类否则无法使用
//   data.scrollReveal.reveal(".matrixq", {
//     // 动画的时长
//     duration: 600,
//     // 延迟时间
//     delay: 500,
//     // 动画开始的位置，'bottom', 'left', 'top', 'right'
//     origin: "bottom",
//     // 回滚的时候是否再次触发动画
//     reset: true,
//     // 延时执行方式（always（一直延时执行），once（只延时执行一次），onload（只在加载时延时执行））
//     // // useDelay: 'onload',
//     // 在移动端是否使用动画
//     mobile: false,
//     // 滚动的距离，单位可以用%，rem等
//     distance: "10px",
//     // 其他可用的动画效果
//     opacity: 0.001,
//     // 执行速度 线性函数啥的
//     easing: "cubic-bezier(0.5, 0, 0, 1)",
//     // 执行方式（缩放）
//     scale: 0.9,
//     // 使用执行之前的回调函数
//     beforeReveal: function (ele) {
//       console.log(1);
//     },
//   });
// };

// watch(
//   () => props.fileword.quesList,
//   () => {
//     console.log(4);
//     retScroll();
//   },
//   { deep: true }
// );
</script>

<style>
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