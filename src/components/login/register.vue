<script setup>
import { inject } from 'vue'
const viewId = inject('viewId')
const dataArr = [
    {
        name: 'username',
        tips: '请输入用户名'
    },
    {
        name: 'phone',
        tips: '请输入手机号'
    },
    {
        name: 'password',
        tips: '设置密码（8-20位字母、数字或特殊符号）'
    },]

let mes = reactive([]);
dataArr.forEach(item => {
    mes.push(item.tips)
});
function showDetail(item, index) {
    mes[index] = item.tips;
}
</script>

<template>

    <div class='register_wrapper'>
        <div class="innerbox">
            <h2>用户注册</h2>
            <img src="/circle.png" class="head" alt="">
            <el-button type="primary" class="upload">+上传头像</el-button><br>
            <div class="inputArr">
                <input type="text" class='input' v-for="(item, index) of dataArr " :key="index" :placeholder=mes[index]
                    :name="item.name" @focus="mes[index] = ''" @blur="showDetail(item, index)">
            </div>
        </div>

        <input type="checkbox" class="checkbox" id="checkbox1" name="">
        <p class="checkbox_detail">我同意<a href="">《用户隐私协议》</a>和<a href="">《隐私条款》</a></p>

        <el-button type="primary" class="sumbit">创建用户</el-button><br>
        <p class="login">已有账号？<a @click="show = !show">立即登录</a>
        </p>
    </div>

</template>

<style lang="less" scoped>
.register_wrapper {
    height: 500px;
    width: 450px;
    position: relative;

    .innerbox {
        position: absolute;
        left: 80*0.9px;
        top: 60*0.9px;

        img.head {
            width: 48*0.9px;
            height: 48*0.9px;
            position: absolute;
            left: 8*0.9px;
            top: 55*0.9px;
        }

        .upload {
            width: 80*0.9px;
            height: 22*0.9px;
            position: absolute;
            left: 86*0.9px;
            top: 71*0.9px;
            font-size: 10px;
            padding: 10px;
            background-color: rgba(30, 111, 255, 1);
        }

    }

    p {
        display: inline;
    }

    h2 {
        font-weight: bold;
        letter-spacing: 0*0.9px;
        line-height: 28*0.9px;
        font-size: 23px;
        float: left;
    }

    .inputArr {
        width: 320*0.9px;
        height: 200*0.9px;
        position: absolute;
        top: 118*0.9px;
        left: 0*0.9px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: b;

        .input {
            width: 350*0.9px;
            height: 54*0.9px;
            margin-top: 6*0.9px;
            text-indent: 14*0.9px;
            border: 1*0.9px solid rgba(217, 217, 217, 1);
            border-radius: 5*0.9px;
            outline: none;

            &::placeholder {
                font-size: 12*0.9px;
                letter-spacing: 0*0.9px;
                line-height: 20*0.9px;
                color: rgba(217, 217, 217, 1);
                text-align: left;
                vertical-align: top;
            }
        }
    }

    .checkbox {
        position: absolute;
        left: 91*0.9px;
        bottom: 129*0.9px;
        height: 15px;
        width: 15px;
        cursor: pointer;

        &::after {
            content: ' ';
            display: block;
            position: absolute;
            z-index: 5;
            top: 0;
            left: 0;
            width: 13px;
            height: 13px;
            padding-left: 1px;
            font-size: 10px;
            font-weight: bold;
            text-align: center;
            background-color: rgb(255, 255, 255);
            border: rgba(217, 217, 217, 1) solid 1px;
        }

        &:checked::after {
            content: "✓";
            color: rgba(255, 250, 250, 1);
            background-color: rgba(30, 111, 255, 1);
            background-clip: padding-box;
            border: transparent;
        }
    }

    .checkbox_detail {
        position: absolute;
        left: 120*0.9px;
        bottom: 127.7*0.9px;
        font-size: 10px;
        font-weight: 400;
        letter-spacing: 0*0.9px;
        line-height: 20*0.9px;
        color: rgba(217, 217, 217, 1);

        a {
            color: rgba(71, 145, 255, 1);
        }
    }

    .sumbit {
        width: 350*0.9px;
        height: 54*0.9px;
        position: absolute;
        left: 80*0.9px;
        bottom: 52*0.9px;
        background-color: rgba(30, 111, 255, 1);
        border-radius: 10px;
    }

    .login {
        font-size: 10*0.9px;
        font-weight: 400;
        letter-spacing: 0*0.9px;
        line-height: 20*0.9px;
        position: absolute;
        bottom: 22*0.9px;
        left: 184*0.9px;
        color: rgba(217, 217, 217, 1);

        a {
            color: rgba(71, 145, 255, 1);
            cursor: pointer;
        }
    }

}
</style>