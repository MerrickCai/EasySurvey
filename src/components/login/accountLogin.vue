<script setup>
import axios from "axios"
import { useStore } from "../../Stores/index.js"
const datas = useStore()
import { useRouter } from "vue-router"
const router = useRouter()
import { ElMessage } from 'element-plus'

//--------------------------- 视图切换 -----------------------------
import { reactive, inject } from "vue"
const viewId = inject("viewId")
//--------------------------- 视图切换 -----------------------------



//--------------------------- 账号密码规则验证 -----------------------------
function validate(account, password) {
  if (!/^[0-9]{10,11}$/.test(account)) { //10-11位纯数字
    ElMessage({
      message: '请输入正确的手机号或学号',
      type: 'warning',
      duration: 4000,
      showClose: true,
      center: true
    })
    return false
  }
  // 8-20位字母数字+特殊字符
  if (!/^[0-9a-zA-Z~!@#$%^&*()_+`\-={}:";'<>?,.\/]{8,20}$/.test(password)) {
    ElMessage({
      message: '请输入正确的密码: 8-20位字母数字+特殊字符',
      type: 'warning',
      duration: 4000,
      showClose: true,
      center: true
    })
    return false
  }
  return true
}
//--------------------------- 账号密码规则验证 -----------------------------



//--------------------------- 登录逻辑-----------------------------
const user = reactive({ account: "", password: "", remember: false })
async function login(account, password, remember) {
  if (!validate(account, password)) { // 表单验证
    return false
  }
  if (datas.user.status === true) { //确认用户是否登录
    ElMessage({
      message: '您已经登录',
      type: 'success',
      duration: 4000,
      showClose: true,
      center: true
    })
    router.push('/')
    return true
  }
  await axios({
    url: "https://q.denglu1.cn/api/user/login",
    method: "post",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
    data: { phone_number: account, password: password },
  })
    .then((response) => {
      console.log(response)
      if (response.data.code === 200) { //账号密码正确
        ElMessage({
          message: '登录成功',
          type: 'success',
          duration: 4000,
          showClose: true,
          center: true
        })
        //写入用户数据
        datas.user.status = true
        datas.user.account = account
        datas.user.password = password
        datas.user.userId = response.data.data.userId
        datas.user.token = response.data.data.token
        datas.user.refreshtoken = response.data.data.refreshtoken
        if (remember) { // 确认用户是否自动登录
            localStorage.setItem('account', btoa(account))
            localStorage.setItem('password', btoa(password))
        }
        //跳转填写地区和年龄弹窗
        viewId.value = 3
      } else { //response.data.code === 401
        ElMessage({
          message: '账号密码错误，请重新输入',
          type: 'error',
          duration: 4000,
          showClose: true,
          center: true
        })
      }
    })
    .catch((error) => {
      ElMessage({
        message: '由于网络问题登录失败',
        type: 'error',
        duration: 4000,
        showClose: true,
        center: true
      })
      console.log(error)
    })
}
//--------------------------- 登录逻辑-----------------------------




//------------------------------ 开发中 ------------------------------------
function Dev(str) {
    ElMessage({
        message: `${str}开发中`,
        type: 'warning',
        duration: 4000,
        showClose: true,
        center: true
    })
}
//------------------------------ 开发中 ------------------------------------
</script>

<template>
  <div class="wrapper">

    <div class="selectArea">
      <a @click="Dev('微信登录')">微信登录</a>
      <a active @click="viewId = 1">账号登录</a>
    </div>

    <div class="typeArea">
      <input type="text" v-model="user.account" placeholder="请输入手机号或者学号" />
      <input type="password" v-model="user.password" placeholder="请输入登录密码" />
    </div>

    <div class="functionArea">
      <div remember>
        <input type="checkbox" id="checkbox" v-model="user.remember" />
        <p><label for="checkbox">下次自动登录</label></p>
      </div>
      <a @click="viewId = 2">立即注册</a>
    </div>

    <div button @click="login(user.account, user.password, user.remember)">
      <div>登录</div>
    </div>

  </div>
</template>

<style lang="less" scoped>
div.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400px;
  width: 420px;

  @media (max-width:800px) {
    width: 100%;
  }

  >div.selectArea {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
    height: 80px;
    width: 70%;

    >a {
      display: block;
      position: relative;
      font-size: 19px;
      font-weight: bold;
      margin-right: 15px;
      color: rgba(217, 217, 217, 1);
      cursor: pointer;

      &[active] {
        color: rgb(0, 0, 0);

        &::before {
          content: "";
          position: absolute;
          left: 25%;
          bottom: -12px;
          height: 5px;
          width: 50%;
          background-color: rgba(30, 111, 255, 1);
          border-radius: 10px;
        }
      }

      &:not([active]):hover {
        color: rgb(0, 0, 0);
      }
    }
  }

  >div.typeArea {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    height: 150px;
    width: 70%;

    >input {
      outline: none;
      height: 45px;
      width: 100%;
      border-radius: 10px;
      border: solid 1px rgba(217, 217, 217, 1);
      background-color: rgb(255, 255, 255);
      text-indent: 12px;
      font-size: 13px;
      color: rgba(30, 111, 255, 1);

      &:nth-child(1) {
        margin-bottom: 15px;
      }

      &::placeholder {
        color: rgba(217, 217, 217, 1);
      }
    }
  }

  >div.functionArea {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    height: 70px;
    width: 70%;

    >div[remember] {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 50px;

      >input {
        display: block;
        height: 13px;
        width: 13px;
        cursor: pointer;
        position: relative;
        margin: 0 10px;

        &::after {
          content: "";
          position: absolute;
          z-index: 1;
          top: 0;
          left: 0;
          display: block;
          width: 13px;
          height: 13px;
          font-size: 13px;
          font-weight: bold;
          line-height: 15px;
          text-align: center;
          background-color: rgb(255, 255, 255);
          border: rgba(217, 217, 217, 1) solid 1px;
        }

        &:checked::after {
          content: "✓";
          width: 15px;
          height: 15px;
          color: rgba(255, 250, 250, 1);
          background-color: rgba(30, 111, 255, 1);
          border: none;
        }
      }

      >p {
        display: block;
        font-size: 13px;
        color: rgba(217, 217, 217, 1);

        >label {
          cursor: pointer;
        }
      }
    }

    >a {
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      height: 50px;
      font-size: 13px;
      color: rgba(71, 145, 255, 1);
      cursor: pointer;
    }
  }

  >div[button] {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100px;
    width: 70%;

    >div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 45px;
      background-color: rgba(30, 111, 255, 1);
      border-radius: 10px;
      width: 100%;
      color: rgba(255, 255, 255, 1);
      font-size: 16px;
      cursor: pointer;
    }
  }
}
</style>