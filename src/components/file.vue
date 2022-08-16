<template>
  <li class="filenew" @click="filerotate">
    <!-- 使得文件阴影定位 -->
    <div class="file">
      <div class="creatcontent">
        <span class="creatfile">创建问卷</span>
        <span class="plus"> </span>
        <!-- 进度条 -->
        <span class="progress">
          <el-progress type="circle" :percentage="0" :width="90" :height="90" />
        </span>
      </div>
      <!-- 文件阴影 -->
      <div class="shadow" ref="rotate"></div>
    </div>
  </li>
</template>

<script setup>
import { ref } from "vue";
let rotate = ref(null);
function filerotate(e) {
  rotate.value.style.transformOrigin = "left top";

  rotate.value.style.transform = "rotate(5deg)";

  //   let shadow = document.getElementsByClassName("shadow");
  //   shadow.tranform.rotate = "30deg";
  //   console.log(e);
}
</script>

<style lang="less" scoped>
.filenew {
  position: relative;
  margin-bottom: 84px;
  padding-left: 20px;
}
// .file {
//   position: absolute;
//   left: 20px;
// }
.creatcontent {
  position: relative;
  width: 210px;
  height: 148px;
  border-radius: 0px 4px 4px 4px;
  clip-path: polygon(35% 0, 40% 13%, 100% 13%, 100% 100%, 0 100%, 0 0);
  text-align: left;
  text-indent: 10px;
  color: white;
  box-shadow: 5px 5px rgba(15, 174, 254);
  .creatfile {
    font-size: 12px;
  }
  background: rgba(221, 237, 255, 0.35);
  backdrop-filter: blur(45px);
}

.shadow {
  position: absolute;
  top: 5px;
  left: 27px;
  width: 210px;
  height: 148px;
  border-radius: 0px 4px 4px 4px;
  clip-path: polygon(35% 0, 40% 13%, 100% 13%, 100% 100%, 0 100%, 0 0);
  background: linear-gradient(
    90deg,
    rgba(30, 111, 255, 1) 0%,
    rgba(138, 204, 237, 1) 100%
  );
  z-index: -1;
  transform: rotate(0deg);
}

.plus {
  position: absolute;
  bottom: 40px;
  left: 30px;
}
.progress {
  position: absolute;
  bottom: 10px;
  right: 30px;
}
</style>