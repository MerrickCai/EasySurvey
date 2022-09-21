<template>
  <div class="wrapper">
    <!-- <span class="infoList" v-for="(value, key) in user">
      {{ key }}: {{ value }}
    </span>
    <el-button type="primary" @click="QuestionnaireRecords">查看填写过的问卷</el-button> -->
    <div class="usertype">
      <span @click="userchoose = 0" :class="{ userclick:userchoose==0}">个人信息</span>
      <span @click="userchoose=1" :class="{ userclick:userchoose==1}">修改密码</span>
      <span @click="userchoose=2" :class="{ userclick:userchoose==2}">问卷记录</span>
      <span @click="userchoose=3" :class="{ userclick:userchoose==3}">用户反馈</span>
    </div>
    <div class="uesrcon">
      <component :is="componentview" :user="user"></component>
    </div>
  </div>
</template>

<script setup>
import { Finished } from "@element-plus/icons-vue";
import axios from "axios";
import { ref, reactive, computed } from "vue";
import { useStore } from "../../Stores/pinia.js";
import usermas from "./usermas.vue"
import password from "./password.vue"
const datas = useStore();
const user = reactive({
  account: datas.user.account,
  age: datas.user.age,
  area: datas.user.area,
  email: datas.user.email,
  password: datas.user.password,
  picture: datas.user.picture,
  refreshtoken: datas.user.refreshtoken,
  userId: datas.user.userId,
  username: datas.user.username,
});

let userchoose = ref(1)
let viewlist = [usermas, password]
let componentview = computed(() => viewlist[userchoose.value])
function userch() {

  console.log(componentview);
  console.log(1);
}

console.log("视图", componentview);
console.log("user数据", datas.user);
console.log("user", user);
axios({
  url: `https://q.denglu1.cn/api/user/getUserMessage/`,
  method: "get",
  withCredentials: true,
  headers: { token: datas.getToken() },
})
  .then((response) => {
    // console.log(response);
    user["用户名"] = response.data.data.username;
    user["年龄"] = response.data.data.age;
    user["邮箱"] = response.data.data.email;
    user["手机号码"] = response.data.data.phone_number;
    user["头像"] = response.data.data.picture;
    user["省份"] = response.data.data.province;
  })
  .catch((error) => {
    console.log(error);
  });

function QuestionnaireRecords() {
  axios({
    url: `https://q.denglu1.cn/api/user/questionnaireList/${datas.user.userId}`,
    method: "get",
    withCredentials: true,
    headers: { token: datas.getToken() },
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>
<style scoped lang='less'>
div.wrapper {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .infoList {
    overflow: hidden;
    width: 400px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-family: "思源黑体";
    color: black;
    border: 1px solid red;
  }

  .usertype {
    display: flex;
    flex-wrap: wrap;
    width: 295px;
    height: 400px;
    opacity: 1;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.1);
    padding: 47px 0;

    >span {
      cursor: pointer;
      width: 295px;
      height: 72px;
      opacity: 1;
      background: rgba(255, 255, 255, 1);
      text-align: center;
      line-height: 72px;

      &.userclick {
        background: rgba(30, 111, 255, 1);
        ;
      }
    }
  }

  .uesrcon {
    width: 875px;
    height: 600px;
    opacity: 1;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.1);
  }
}
</style>