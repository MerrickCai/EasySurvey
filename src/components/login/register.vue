<script setup>
import { useStore } from "../../Stores/pinia.js"
import { reactive, inject } from "vue"
import { useRouter } from "vue-router"
const datas = useStore()
const router = useRouter()



//--------------------------- 视图切换 -----------------------------
const viewId = inject("viewId")
//--------------------------- 视图切换 -----------------------------



//--------------------------- 账号密码规则验证 -----------------------------
function validate(account, password, passwordConfirm) {
    if (!/^[0-9]{10,11}$/.test(account)) { //10-11位纯数字
        ElMessage({
            message: '请输入正确的手机号或学号',
            type: 'warning',
            duration: 3000,
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
            duration: 3000,
            showClose: true,
            center: true
        })
        return false
    }
    if (password !== passwordConfirm) {
        ElMessage({
            message: '两次输入的密码不一致，请重新输入',
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



//--------------------------- 注册逻辑-----------------------------
const user = reactive({ account: '', password: '', passwordConfirm: '', agree: false })

async function register(account, password, passwordConfirm, agree) {

    if (agree === false) { // 确认用户是否同意《用户隐私协议》
        ElMessage({
            message: '请点击同意《用户隐私协议》按钮',
            type: 'warning',
            duration: 3000,
            showClose: true,
            center: true
        })
        return false
    }

    if (!validate(account, password, passwordConfirm)) { // 表单验证
        return false
    }

    if (datas.user.status === true) { //确认用户是否登录
        ElMessage({
            message: '您已经登录',
            type: 'success',
            duration: 3000,
            showClose: true,
            center: true
        })
        router.push('/')
        return true
    }

    const result = await datas.register(account, password)

    if (result) {

        ElMessage({
            message: '注册成功',
            type: 'success',
            duration: 3000,
            showClose: true,
            center: true
        })

        const User = JSON.parse(localStorage.getItem('User'))

        await datas.getUserMessage(User.token)

        console.log(datas.user)

        //注册成功跳转
        if (route.query.redirect) { //判断用户是否从其他页面过来
            router.push({ path: route.query.redirect })
        } else {
            router.push({ path: "/" })
        }

    } else {

        ElMessage({
            message: '请勿重复注册',
            type: 'error',
            duration: 3000,
            showClose: true,
            center: true
        })

    }

}
//--------------------------- 注册逻辑-----------------------------


//------------------------------ 开发中 ------------------------------------
function Dev(str) {
    ElMessage({
        message: `${str}开发中`,
        type: 'warning',
        duration: 3000,
        showClose: true,
        center: true
    })
}
//------------------------------ 开发中 ------------------------------------
</script>

<template>
    <div class="wrapper">
        <div class="title">用户注册</div>
        <div class="imgUpload">
            <img v-lazy="'/assets/circle.png'" alt="默认头像" />
            <div button>
                <div @click="Dev('上传头像')">+上传头像</div>
            </div>
        </div>
        <div class="typeArea" @keydown.enter="register(user.account, user.password,user.passwordConfirm, user.agree)">
            <input type="text" v-model="user.account" placeholder="请输入手机号或学号" />
            <input type="password" v-model="user.password" placeholder="请输入密码：8-20位字母数字+特殊字符" />
            <input type="password" v-model="user.passwordConfirm" placeholder="确认密码" />
        </div>
        <div class="functionArea">
            <input type="checkbox" v-model="user.agree" />
            <div>我同意<span>《用户隐私协议》</span>和<span>《隐私条款》</span></div>
        </div>
        <div button>
            <div @click="register(user.account, user.password,user.passwordConfirm, user.agree)">创建用户</div>
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

    @media (max-width:@breakpoint) {
        width: 100%;
    }

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
        height: 70px;
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
        height: 170px;
        width: 70%;
        color: rgba(30, 111, 255, 1);

        >input {
            outline: none;
            height: 44px;
            width: 100%;
            border-radius: 10px;
            border: solid 1px rgba(217, 217, 217, 1);
            background-color: rgb(255, 255, 255);
            text-indent: 12px;
            font-size: 13px;
            color: rgba(30, 111, 255, 1);

            &:nth-child(1) {
                margin-bottom: 19px;
            }

            &:nth-child(2) {
                margin-bottom: 19px;
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
        height: 40px;
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
        height: 60px;
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