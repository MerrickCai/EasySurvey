<template>
  <ul class="filesum">
    <li class="creatfile" @click="router.push('/surveynew')">
      <!-- 使得文件阴影定位 -->
      <div class="file">
        <div class="creatcontent">
          <div class="filetop">
            <span class="creat">创建问卷</span>

          </div>
          <span class="plus">
            <el-icon color="white" :size="5 * 5">
              <Plus />
            </el-icon>
          </span>
          <!-- 进度条 -->
          <span class="progress">
            <el-progress type="circle" :percentage="0" :width="90" :height="90" :stroke-width="8" :show-text="false" />
          </span>
        </div>
        <!-- 文件阴影 -->
        <div class="shadow"></div>
      </div>
    </li>
    <file v-for="(item, index) of fileall[0]" :key="item" :item="item" :index="index" :clickrotate="clickrotate"
      @update:clickrotate="(n) => (clickrotate = n)" @deletefile="(index) => fileall[0].splice(index, 1)"></file>
  </ul>
</template>

<script setup>
import { Plus } from "@element-plus/icons-vue";
import file from "./file.vue";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import emitter from "../../mitt/mitt.js";
import { useStore } from "../../Stores/pinia.js";
const router = useRouter();
const datas = useStore();



// 删除用户时,文件上的有效问卷数减一
emitter.on("change", () => {
  fileall[0][clickrotate.value].effectiveNumber -= 1
})

let fileall = reactive([]);

async function getinfor() {
  axios({
    url: `https://q.denglu1.cn/api/user/questionnaire/${datas.user.userId}`,
    method: "get",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      token: await datas.getToken()
    },
  })
    .then((response) => {
      console.log("用户发布的所有问卷信息", response);
      fileall.push(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
getinfor();

//问卷旋转
let clickrotate = ref(null);
</script>

<style lang="less" scoped>
.filesum {
  height: 680px;
  width: 300px;
  padding: 0px 20px;
  overflow: auto;

  &:hover&::-webkit-scrollbar {
    display: block;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  &::-webkit-scrollbar-track {
    height: 450px;
    width: 10px;
    background: rgba(245, 245, 245, 1);
  }
}

.creatfile {
  padding-left: 20px;
  cursor: pointer;

  .file {
    position: relative;
  }
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

    img {
      position: absolute;
      left: 3px;
      top: 3px;
    }

    .creat {
      position: absolute;
      top: 3px;
      left: 10px;
    }

    .delete {
      position: absolute;
      left: 60px;
      top: 3px;
    }

    span {
      font-size: 12px;
    }
  }
}

.shadow {
  position: absolute;
  top: 5px;
  left: 7px;
  width: 210px;
  height: 148px;
  border-radius: 0px 4px 4px 4px;
  clip-path: polygon(40% 0, 41% 1%, 41.5% 2%, 45% 13%, 99% 11.5%, 99.5% 12%, 100% 13%, 100% 100%, 0 100%, 0 3%, 0.5% 1%, 1% 0.5%);
  background: linear-gradient(90deg,
      rgba(30, 111, 255, 1) 0%,
      rgba(138, 204, 237, 1) 100%);
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