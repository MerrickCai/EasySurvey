<template>
    <div class='wrapper'>
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
        <p class="login">已有账号？<router-link to="/login/AccountLogin">立即登录</router-link>
        </p>
    </div>
</template>

<script setup>
import { computed, ref, watch, reactive } from 'vue';
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

<style scoped lang='less'>
@a: 0.8px;

.wrapper {
    width: 500*@a;
    height: 550*@a;
    position: absolute;
    top: -50*@a;
    box-shadow: 0*@a 6*@a 30*@a 0*@a rgba(73, 107, 158, 0.1);
    border-radius: 6*@a;
    background-color: white;
    user-select: none;
    -webkit-user-drag: none;

    .innerbox {
        position: absolute;
        left: 80*@a;
        top: 60*@a;

        img.head {
            width: 48*@a;
            height: 48*@a;
            position: absolute;
            left: 8*@a;
            top: 55*@a;
        }

        .upload {
            width: 80*@a;
            height: 22*@a;
            position: absolute;
            left: 86*@a;
            top: 71*@a;
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
        letter-spacing: 0*@a;
        line-height: 28*@a;
        font-size: 23px;
        float: left;
    }

    .inputArr {
        width: 320*@a;
        height: 200*@a;
        position: absolute;
        top: 118*@a;
        left: 0*@a;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: b;

        .input {
            width: 350*@a;
            height: 54*@a;
            margin-top: 6*@a;
            text-indent: 14*@a;
            border: 1*@a solid rgba(217, 217, 217, 1);
            border-radius: 5*@a;
            outline: none;

            &::placeholder {
                font-size: 12*@a;
                letter-spacing: 0*@a;
                line-height: 20*@a;
                color: rgba(217, 217, 217, 1);
                text-align: left;
                vertical-align: top;
            }
        }
    }

    .checkbox {
        position: absolute;
        left: 91*@a;
        bottom: 129*@a;
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
        left: 120*@a;
        bottom: 127.7*@a;
        font-size: 10px;
        font-weight: 400;
        letter-spacing: 0*@a;
        line-height: 20*@a;
        color: rgba(217, 217, 217, 1);

        a {
            color: rgba(71, 145, 255, 1);
        }
    }

    .sumbit {
        width: 350*@a;
        height: 54*@a;
        position: absolute;
        left: 80*@a;
        bottom: 52*@a;
        background-color: rgba(30, 111, 255, 1);
        border-radius: 10px;
    }

    .login {
        font-size: 10*@a;
        font-weight: 400;
        letter-spacing: 0*@a;
        line-height: 20*@a;
        position: absolute;
        bottom: 22*@a;
        left: 184*@a;
        color: rgba(217, 217, 217, 1);

        a {
            color: rgba(71, 145, 255, 1);
        }
    }

}
</style>