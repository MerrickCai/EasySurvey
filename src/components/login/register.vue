<script setup>
//登陆注册页视图切换
import { reactive, inject } from 'vue'
const viewId = inject('viewId')
//注册逻辑
const user = reactive({ account: '', password: '', agree: false })
import { useStore } from "../../PiniaStores/index.js"
const datas = useStore()
import axios from 'axios'
//表单验证
function validate(account, password) {
    if (!/^1[0-9]{10}$/.test(account)) { //1开头，11位数字
        alert('请输入正确的手机号')
        return false
    }
    if (!/^[0-9a-zA-Z_!.]{8,20}$/.test(password)) { //8-20位字母数字+特殊字符（_!.）
    alert('请输入8-20位仅含数字、字母和部分特殊字符的密码');
        return false
    }
    return true
}
async function register(account, password, agree) {
    if (!validate(account, password)) { //表单验证
        return false
    }
    if (agree === false) { //确认用户是否同意《用户隐私协议》
        alert('请点击同意《用户隐私协议》按钮')
        return true
    }
    if (datas.user.status === true) { //确认用户是否登录
        alert('您已经登录')
        return true
    }
    await axios({
        url: 'https://q.denglu1.cn/user/regist',
        method: 'post',
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
        data: { "phone_number": account, "password": password }
    }).then((response) => {
        if (response.data.code === 200) { //注册成功=>意味着登录成功
            //写入用户数据
            datas.user.status = true
            datas.user.account = account
            datas.user.password = password
            datas.user.userId = response.data.data.userId
            datas.user.token = response.data.data.token
            datas.user.refreshtoken = response.data.data.refreshtoken
            //默认记住账号密码到本地
            localStorage.setItem('account', account)
            localStorage.setItem('password', password)
            //跳转填写地区和年龄弹窗
            viewId.value = 3
        } else { //response.data.code === 400=>重复注册
            alert('请勿重复注册')
        }
    }).catch((error) => {//注册失败
        alert('由于网络问题注册失败')
        console.log(error)
    })
}
</script>

<template>
    <div class="wrapper">
        <div class="title">用户注册</div>
        <div class="imgUpload">
            <img src="/circle.png" alt="默认头像" />
            <div button>
                <div>+上传头像</div>
            </div>
        </div>
        <div class="typeArea">
            <input type="text" v-model="user.account" placeholder="请输入用户名 / 手机号 / Email" />
            <input type="password" v-model="user.password" placeholder="设置密码（8-20位字母、数字或特殊符号）" />
        </div>
        <div class="functionArea">
            <input type="checkbox" v-model="user.agree" />
            <div>我同意<span>《用户隐私协议》</span>和<span>《隐私条款》</span></div>
        </div>
        <div button>
            <div @click="register(user.account, user.password, user.agree)">创建用户</div>
        </div>
        <div class="buttom">已有账号？<span @click="viewId = 1">立即登录</span></div>
    </div>
</template>

<style lang="less" scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 450px;
    width: 420px;

    >div.title {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-end;
        height: 70px;
        width: 70%;
        font-size: 20px;
        font-weight: bold;
        color: rgba(0, 0, 0, 1);
    }

    >div.imgUpload {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        height: 100px;
        width: 70%;

        >img {
            display: block;
            height: 50px;
            width: auto;
            object-fit: cover;
            margin-right: 18px;
        }

        >div[button] {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: flex-end;
            height: 50px;
            width: auto;

            >div {
                font-size: 14px;
                color: rgba(255, 255, 255, 1);
                background-color: rgba(30, 111, 255, 1);
                padding: 2px 5px;
                border-radius: 5px;
                cursor: pointer;
                margin-bottom: 5px;
            }
        }
    }

    >div.typeArea {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        height: 110px;
        width: 70%;
        color: rgba(30, 111, 255, 1);

        >input {
            outline: none;
            height: 45px;
            width: 100%;
            border-radius: 10px;
            border: solid 1px rgba(217, 217, 217, 1);
            background-color: rgb(255, 255, 255);
            text-indent: 12px;
            font-size: 13px;

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
        justify-content: flex-start;
        align-items: center;
        height: 50px;
        width: 70%;

        >input {
            display: block;
            height: 13px;
            width: 13px;
            cursor: pointer;
            position: relative;
            margin: 0 10px 0 5px;

            &::after {
                content: '';
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

        >div {
            display: block;
            font-size: 12px;
            color: rgba(217, 217, 217, 1);

            >span {
                color: rgba(71, 145, 255, 1);
                cursor: pointer;
            }
        }
    }

    >div[button] {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 80px;
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

    >div.buttom {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        height: 40px;
        width: auto;
        font-size: 12px;
        color: rgba(217, 217, 217, 1);

        >span {
            color: rgba(71, 145, 255, 1);
            cursor: pointer;
        }
    }
}
</style>