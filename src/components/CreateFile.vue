<template>
  <ul class="filesum">
    <el-scrollbar max-height="600px">
      <file v-for="item in amount" :key="item"></file>
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
    </el-scrollbar>
  </ul>
</template>
<script setup>
import { Plus } from "@element-plus/icons-vue";
import file from "./file.vue";
import { ref } from "vue";
const amount = ref(3);

function scrollLeft() {
  let bar = document.getElementsByName("el-scrollbar");
  bar.scrollLeft = "30px";
}
</script>

<style lang="less" scoped>
.filesum {
  height: 600px;
  width: 300px;
  padding: 0px 20px;
  .el-scrollbar {
    width: 300px;
    --el-scrollbar-opacity: 0.3;
    --el-scrollbar-bg-color: rgba(71, 145, 255, 1);
    --el-scrollbar-hover-opacity: 0.5;
    --el-scrollbar-hover-bg-color: rgba(71, 145, 255, 1);

    .el-scrollbar__bar {
      width: 8px;
      position: absolute;
      right: 0;
    }
  }
}
.creatfile {
  padding-left: 20px;
  .file {
    position: relative;
  }
}

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
  left: 5px;
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