<template >
  <li
    class="filenew"
    @click="filerotate($event, index)"
    draggable="true"
    @dragstart="startDrag($event)"
  >
    <!-- 使得文件阴影定位 -->
    <div class="file">
      <div class="creatcontent">
        <div class="filetop">
          <img src="/share.png" alt="" />
          <span class="creat">问卷{{ index + 1 }}</span>
          <span class="delete" @click="delfile">×</span>
        </div>
        <span class="filename">{{ item.title }}</span>
        <span class="filenum">有效问卷数</span>
        <!-- 进度条 -->
        <span class="progress">
          <el-progress
            type="circle"
            :percentage="0"
            :width="90"
            :height="90"
            :stroke-width="80"
            :show-text="false"
          />
          <span class="number">{{ item.totalNumber }}</span>
          <span class="fen">份</span>
        </span>
      </div>
      <!-- 文件阴影 -->
      <div :class="[clickrotate == index ? shadowclick : '', shadow]"></div>
    </div>
  </li>
</template>

<script setup>
import { ref } from "vue";
import emitter from "../../mitt";
import { useStore } from "../../PiniaStores/index.js";
const datas = useStore();
import axios from "axios";
const emit = defineEmits(["update:clickrotate"]);
const props = defineProps(["index", "clickrotate", "item"]);

//点击文件夹阴影旋转
let shadow = ref("shadow");
let shadowclick = ref("shadowclick");

function filerotate(e, index) {
  //修改父组件传来的clickrotate
  emit("update:clickrotate", index);
  emitter.emit("filenum", props.item.id);
}
//拖拽文件
function startDrag(e) {
  e.dataTransfer.dropEffect = "move";
  e.dataTransfer.effectAllowed = "move";
}
function delfile() {
  axios({
    url: `https://q.denglu1.cn/deleteQuestion/${parseInt(props.item.id)}`,
    method: "get",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
    headers: { token: datas.user.token },
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>

<style lang="less" scoped>
.filenew {
  position: relative;
  margin-top: 84px;
  padding-left: 20px;
}
.creatcontent {
  position: relative;
  width: 210px;
  height: 148px;
  border-radius: 0px 4px 4px 4px;
  clip-path: polygon(40% 0, 45% 13%, 100% 13%, 100% 100%, 0 100%, 0 0);
  text-align: left;
  text-indent: 10px;
  color: white;
  box-shadow: 5px 5px rgba(15, 174, 254);
  background: rgba(221, 237, 255, 0.35);
  backdrop-filter: blur(45px);

  .filetop {
    display: flex;

    img {
      cursor: pointer;
      position: absolute;
      left: 10px;
      top: 3px;
    }

    .creat {
      position: absolute;
      top: 3px;
      left: 20px;
    }

    .delete {
      cursor: pointer;
      position: absolute;
      left: 64px;
      top: 3px;
    }

    span {
      font-size: 12px;
    }
  }

  .filename {
    position: absolute;
    left: 10px;
    bottom: 60px;
    width: 82px;
    text-align: center;
    word-wrap: break-word; //超出页面自动换行
    font-size: 12px;
    font-weight: 700;
  }

  .filenum {
    position: absolute;
    left: 15px;
    bottom: 30px;
    font-size: 10px;
    font-weight: 400;
    text-align: center;
  }

  .progress {
    position: absolute;
    bottom: 10px;
    right: 20px;

    .number {
      position: absolute;
      bottom: 35px;
      right: 20px;
      font-size: 20px;
      font-weight: 500;
      text-align: center;
    }

    .fen {
      position: absolute;
      bottom: 32px;
      right: 9px;
      font-size: 10px;
      font-weight: 400;
      text-align: center;
    }
  }
}

.shadow {
  position: absolute;
  top: 5px;
  left: 27px;
  width: 210px;
  height: 148px;
  border-radius: 0px 4px 4px 4px;
  clip-path: polygon(40% 0, 45% 13%, 100% 13%, 100% 100%, 0 100%, 0 0);
  background: linear-gradient(
    90deg,
    rgba(30, 111, 255, 1) 0%,
    rgba(138, 204, 237, 1) 100%
  );
  z-index: -1;
  transform-origin: left top;
}

.shadowclick {
  animation: rotate 0.35s forwards;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(5deg);
  }
}
</style>