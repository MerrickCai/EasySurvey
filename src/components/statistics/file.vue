<template >
  <li class="filenew" @click="filerotate($event, index)" draggable="true" @dragstart="startDrag($event)">
    <!-- 使得文件阴影定位 -->
    <div class="file">
      <div class="creatcontent">
        <div class="filetop">
          <span class="share" @click="sharefile"></span>
          <span class="creat">问卷{{ index + 1 }}</span>
          <span class="delete" @click="delfile">×</span>
        </div>
        <span class="filename">{{ item.title }}</span>
        <span class="filenum">有效问卷数</span>
        <!-- 进度条 -->
        <span class="progress">
          <el-progress type="circle" :percentage="
            (props.item.effectiveNumber / props.item.totalNumber) * 100
          " :width="90" :height="90" :stroke-width="8" :show-text="false" />
          <span class="number">{{ item.effectiveNumber }}</span>
          <span class="fen">份</span>
        </span>
      </div>
      <!-- 文件阴影 -->
      <div :class="[clickrotate == index ? shadowclick : '', shadow]"></div>
    </div>
  </li>
</template>

<script setup>
import axios from "axios";
import clipboard3 from "vue-clipboard3";
import { ref, watch, inject } from "vue";
import emitter from "../../mitt/mitt.js";
import { useStore } from "../../Stores/pinia.js";
const datas = useStore();




const emit = defineEmits(["update:clickrotate", "deletefile"]);
const props = defineProps(["index", "clickrotate", "item"]);

//点击文件夹阴影旋转
let shadow = ref("shadow");
let shadowclick = ref("shadowclick");

function filerotate(e, index) {
  //修改父组件传来的clickrotate
  emit("update:clickrotate", index);
  //传被点击问卷id
  emitter.emit("filenum", props.item.id);
}
//拖拽文件
function startDrag(e) {
  e.dataTransfer.dropEffect = "move";
  e.dataTransfer.effectAllowed = "move";
}

async function delfile() {
  ElMessageBox.confirm(
    '确定删除吗?',
    '删除题目',
    {
      distinguishCancelAndClose: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    })
    .then(() => {
      async () => {
        axios({
          url: `https://q.denglu1.cn/api/deleteQuestion/${parseInt(props.item.id)}`,
          method: "get",
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            token: await datas.getToken()
          },
        })
          .then((response) => {
            console.log("要删除的问卷", response);
          })
          .catch((error) => {
            console.log(error);
          });
        //传递删除信号给父组件，更新dom
        emit("deletefile", props.index);
      }
    })
    .catch(() => {
    })
}

//分享问卷
const { toClipboard } = clipboard3();
async function sharefile() {
  try {
    await toClipboard("https://q.denglu1.cn/survey/" + props.item.id);
    ElMessage({
      message: '链接复制成功!',
      type: 'success',
    })
  } catch (error) {
    ElMessage.error('链接复制失败!')
  }
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
  clip-path: polygon(40% 0, 41% 1%, 41.5% 2%, 45% 13%, 99% 11.5%, 99.5% 12%, 100% 13%, 100% 100%, 0 100%, 0 3%, 0.5% 1%, 1% 0.5%);
  text-align: left;
  text-indent: 10px;
  color: white;
  box-shadow: 5px 5px rgba(15, 174, 254);
  background: rgba(221, 237, 255, 0.35);
  backdrop-filter: blur(45px);

  .filetop {
    display: flex;

    .share {
      cursor: pointer;
      position: absolute;
      left: 10px;
      top: 3px;
      width: 16px;
      height: 16px;
      background-image: url(/assets/share.png);
      background-size: cover;
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
      right: 50%;
      transform: translate(70%);
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
  clip-path: polygon(40% 0, 41% 1%, 41.5% 2%, 45% 13%, 99% 11.5%, 99.5% 12%, 100% 13%, 100% 100%, 0 100%, 0 3%, 0.5% 1%, 1% 0.5%);
  background: linear-gradient(90deg,
      rgba(30, 111, 255, 1) 0%,
      rgba(138, 204, 237, 1) 100%);
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