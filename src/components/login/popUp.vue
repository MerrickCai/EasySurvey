<script setup>
import { onMounted, reactive, ref, computed, watch } from "vue"
import axios from "axios"
import { useStore } from "../../Stores/index.js"
import { useRouter, useRoute } from "vue-router"
import { ElMessage } from 'element-plus'
const datas = useStore()
const router = useRouter()
const route = useRoute()




//---------------------------跳过逻辑 -----------------------------
const count = ref(5)
const countShow = computed(() => {
  if (count.value !== 0) {
    return ` (${count.value})`
  } else {
    return ``
  }
})
const jump_cursor = ref('default')
onMounted(() => {
  let id
  function countDown() {
    if (count.value === 1) {
      clearInterval(id)
      jump_cursor.value = 'pointer'
    }
    count.value--
  }
  id = setInterval(countDown, 1000)
})
function jump() {
  if (count.value !== 0) { //判断倒计时是否结束
    ElMessage({
      message: '请稍后跳过',
      type: 'warning',
      duration: 3000,
      showClose: true,
      center: true
    })
    return false
  }
  if (route.query.redirect) { //判断用户是否从其他页面过来
    ElMessage({
      message: '跳过成功',
      type: 'success',
      duration: 3000,
      showClose: true,
      center: true
    })
    router.push({ path: route.query.redirect })
  } else {
    router.push({ path: "/" })
  }
}
//--------------------------- 跳过按钮逻辑 -----------------------------




//--------------------------- 确定按钮变色逻辑 -----------------------------
const confirmStyle = reactive({
  bgColor: 'rgba(235, 245, 255, 1)',
  color: 'rgba(140, 140, 140, 1)',
  cursor: 'default'
})
const confirm = reactive({
  area: false,
  age: false
})
watch(confirm, (n, o) => {
  if (n.area && n.age) {
    confirmStyle.bgColor = 'rgba(30, 111, 255, 1)'
    confirmStyle.color = 'rgba(255, 255, 255, 1)'
    confirmStyle.cursor = 'pointer'
  }
})
//--------------------------- 确定按钮变色逻辑 -----------------------------




//--------------------------- 地区数据 -----------------------------
import area from "../../Stores/area.js"
const props = {
  expandTrigger: "hover",
  children: "childs",
  value: "name",
  label: "name",
}
//--------------------------- 地区数据 -----------------------------




//--------------------------- 账号密码规则验证 -----------------------------
function validate(age) {
  if (!/^[0-9]{1,3}$/.test(age)) { //1-3位数字
    ElMessage({
      message: '请输入正确的年龄',
      type: 'warning',
      duration: 3000,
      showClose: true,
      center: true
    })
    return false
  }
  return true
}
//--------------------------- 账号密码规则验证 -----------------------------




//--------------------------- 检查用户之前填写的地区年龄 -----------------------------
const title = reactive({
  p1: '为了保证问卷质量',
  p2: '我们希望获知您的如下信息'
})
const user = reactive({ area: [], age: "" })
axios({
  url: `https://q.denglu1.cn/api/user/getUserMessage/${datas.user.userId}`,
  method: "get",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  headers: { token: datas.user.token },
}).then((response) => {
  const data = response.data.data
  console.log(data)
  if (data.province && data.age) {
    title.p1 = '系统已自动保存您上次填写信息'
    title.p2 = '请检查是否有误'
    user.area = data.province
    user.age = data.age
    confirm.area = true
    confirm.age = true
  }
}).catch((error) => {
  console.log(error)
})
//--------------------------- 检查用户之前填写的地区年龄 -----------------------------




//--------------------------- 提交信息 -----------------------------
async function upLoad(area, age) {
  if (!(confirm.area && confirm.age)) { //用户没填完
    ElMessage({
      message: '请填写以上信息',
      type: 'warning',
      duration: 3000,
      showClose: true,
      center: true
    })
    return false
  }
  if (!validate(age)) { //表单验证
    return false
  }
  await axios({
    url: "https://q.denglu1.cn/api/user/updateMessage",
    method: "post",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
    headers: { token: datas.user.token },
    data: {
      id: datas.user.userId,
      age: age,
      province: area,
    },
  })
    .then((response) => {
      //写入用户数据
      datas.user.age = age
      datas.user.area = area
      ElMessage({
        message: '信息获取成功',
        type: 'success',
        duration: 3000,
        showClose: true,
        center: true
      })
      if (route.query.redirect) { //判断用户是否从其他页面过来
        router.push({ path: route.query.redirect })
      } else {
        router.push({ path: "/" })
      }
    })
    .catch((error) => {//上传失败
      ElMessage({
        message: '由于网络问题上传失败',
        type: 'error',
        duration: 3000,
        showClose: true,
        center: true
      })
      console.log(error)
    })
}
//--------------------------- 提交信息 -----------------------------
</script>

<template>
  <div class="wrapper">

    <div class="titleArea">
      <p>{{ title.p1 }}</p>
      <p>{{ title.p2 }}</p>
    </div>

    <div class="typeArea">
      <div class="title">
        <div>所在地区</div>
      </div>
      <div areaSelect>
        <el-cascader @change="confirm.area = true" v-model="user.area" placeholder="请选择您所在地区" :options="area"
          :props="props" separator=" " />
      </div>
      <div class="title">
        <div>年龄</div>
      </div>
      <input @change="confirm.age = true" @input="confirm.age = true" type="text" v-model="user.age"
        placeholder="请输入您的年龄" />
    </div>

    <div button>
      <div jump @click="jump">跳过{{ countShow }}</div>
      <div confirm @click="upLoad(user.area, user.age)">确认</div>
    </div>

  </div>
</template>

<style lang="less" scoped>
div.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 400px;
  width: 420px;

  @media (max-width:800px) {
    width: 100%;
  }

  >div.titleArea {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    height: 100px;
    width: 100%;

    >p {
      display: block;
      font-size: 18px;
      color: rgba(0, 0, 0, 1);
      font-weight: bold;

      &:nth-of-type(1) {
        margin-bottom: 5px;
      }
    }
  }

  >div.typeArea {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    height: 200px;
    width: 70%;

    >div[areaSelect] {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 45px;
      width: 100%;
      margin-bottom: 10px;

      :deep(.el-input__inner) {
        color: rgba(30, 111, 255, 1);
      }

      :deep(.el-cascader, .el-tooltip__trigger, .el-tooltip__trigger) {
        width: 100%;
        height: 45px;
      }

      :deep(.el-input, .el-input--suffix) {
        outline: none;
        width: 100%;
        height: 45px;
      }

      :deep(.el-input__wrapper) {
        outline: none;
        border-radius: 10px;
        box-shadow: none;
        border: solid 1px #d9d9d9;
      }

      :deep(.el-input__inner) {
        &::placeholder {
          color: rgba(217, 217, 217, 1);
        }
      }
    }

    >div.title {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      height: 30px;
      width: 100%;
      margin-bottom: 10px;

      >div {
        color: rgba(0, 0, 0, 1);
        font-size: 16px;
        position: relative;
        padding-left: 7px;

        &::before {
          content: "";
          position: absolute;
          z-index: 1;
          left: 0;
          top: 0;
          height: 100%;
          width: 3px;
          background-color: rgba(30, 111, 255, 1);
        }
      }
    }

    >input {
      display: block;
      outline: none;
      height: 45px;
      width: 100%;
      border-radius: 10px;
      border: solid 1px rgba(217, 217, 217, 1);
      background-color: rgb(255, 255, 255);
      text-indent: 12px;
      font-size: 13px;
      color: rgba(30, 111, 255, 1);

      &::placeholder {
        color: rgba(217, 217, 217, 1);
      }
    }
  }

  >div[button] {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 100px;
    width: 70%;

    >div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 35px;
      background-color: rgba(235, 245, 255, 1);
      border-radius: 10px;
      width: 35%;
      color: rgba(140, 140, 140, 1);
      font-size: 14px;
      cursor: pointer;

      &[jump] {
        cursor: v-bind('jump_cursor');
      }

      &[confirm] {
        background-color: v-bind('confirmStyle.bgColor');
        color: v-bind('confirmStyle.color');
        cursor: v-bind('confirmStyle.cursor');
      }
    }
  }
}
</style>