<template>
  <ul>
    <li class="creatfile">
      <!-- <div class="creattitle">添加问卷</div>
      <span class="titleshadow"></span> -->
      <div class="file">
        <div class="creatcontent">
          <span>创建问卷</span>
          <span class="plus">
            <el-icon color="white" :size="5 * 5"><Plus /></el-icon>
          </span>
          <span class="progress">
            <el-progress
              type="circle"
              :percentage="0"
              :width="90"
              :height="90"
            />
          </span>
        </div>
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
.file {
  position: relative;
}
.creatcontent {
  position: relative;
  width: 21rem;
  height: 14.8rem;
  border-radius: 0px 4px 4px 4px;
  background: rgba(138, 204, 237, 1);
  clip-path: polygon(30% 0, 35% 13%, 100% 13%, 100% 100%, 0 100%, 0 0);
  text-align: left;
  text-indent: 1rem;
  color: white;
  box-shadow: 0.5rem 0.5rem rgba(15, 174, 254);
}

.shadow {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  width: 21rem;
  height: 14.8rem;
  border-radius: 0px 4px 4px 4px;
  clip-path: polygon(30% 0, 35% 13%, 100% 13%, 100% 100%, 0 100%, 0 0);
  background-color: rgba(54, 175, 236, 0.3);
  z-index: -1;
}

.plus {
  position: absolute;
  bottom: 4rem;
  left: 3rem;
}
.progress {
  position: absolute;
  bottom: 1rem;
  right: 3rem;
}
</style>