<template>
  <ul class="filesum">
    <li class="creatfile">
      <!-- 使得文件阴影定位 -->
      <div class="file">
        <div class="creatcontent">
          <span class="creatfile">创建问卷</span>
          <span class="plus">
            <el-icon color="white" :size="5 * 5"><Plus /></el-icon>
          </span>
          <!-- 进度条 -->
          <span class="progress">
            <el-progress
              type="circle"
              :percentage="0"
              :width="90"
              :height="90"
            />
          </span>
        </div>
        <!-- 文件阴影 -->
        <div class="shadow"></div>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { Plus } from "@element-plus/icons-vue";
</script>

<style lang="less" scoped>
/* .creattitle {
  position: relative;
  width: 10rem;
  height: 2.7rem;
  border-radius: 4px 4px 0px 0px;
  background: rgba(138, 204, 237, 1);
  text-align: left;
  text-indent: 2rem;
  line-height: 2.7rem;
  color: white;
  clip-path: polygon(80% 0, 100% 100%, 0 100%, 0 0);
  z-index: 1;
} */

/* .creattitle::after {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  width: 2.7rem;
  height: 2.7rem;
  border-top: 1.35rem solid white;
  border-right: 1.35rem solid white;
  border-bottom: 1.35rem solid transparent;
  border-left: 1.35rem solid transparent;
  z-index: -1;
  filter: drop-shadow(2px 2px 2px rgba(15, 174, 254, 1));
  box-shadow: red 0 0 6px inset;
}  */
/* 
.titleshadow {
  position: absolute;
  top: 0;
  left: 80%;
  float: right;
  width: 0.5rem;
  height: 2.7rem;
  background-color: rgba(15, 174, 254, 1);
  clip-path: polygon(80% 0, 100% 0, 100% 100%);
  z-index: 10;
} */

.filesum {
  height: 600px;
  width: 300px;
  padding: 0px 20px;
}
.file {
  position: relative;
}
.creatcontent {
  position: relative;
  width: 210px;
  height: 148px;
  border-radius: 0px 4px 4px 4px;
  // background: rgba(138, 204, 237, 1);
  clip-path: polygon(35% 0, 40% 13%, 100% 13%, 100% 100%, 0 100%, 0 0);
  text-align: left;
  text-indent: 10px;
  color: white;
  box-shadow: 5px 5px rgba(15, 174, 254);
  .creatfile {
    font-size: 12px;
  }
  background: rgba(221, 237, 255, 0.35);

  // border: 1px solid rgba(0, 0, 0, 1);

  backdrop-filter: blur(45px);
}

.shadow {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 210px;
  height: 148px;
  border-radius: 0px 4px 4px 4px;
  clip-path: polygon(35% 0, 40% 13%, 100% 13%, 100% 100%, 0 100%, 0 0);
  // background-color: rgba(54, 175, 236, 0.3);
  background: linear-gradient(
    90deg,
    rgba(30, 111, 255, 1) 0%,
    rgba(138, 204, 237, 1) 100%
  );
  z-index: -1;
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