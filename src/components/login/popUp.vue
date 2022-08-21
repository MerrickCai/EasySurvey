<script setup>
import { reactive } from 'vue'
//跳过
function jump() {
    if (route.query.redirect) { //判断用户是否从其他页面过来
        router.push({ path: route.query.redirect })
    } else {
        router.push({ path: '/' })
    }
}
//信息填写逻辑
const user = reactive({ area: '', age: '' })
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
import axios from 'axios'
import { useStore } from "../../PiniaStores/index.js"
const datas = useStore()
//表单验证
function validate(age) {
    if (!/^[0-9]{1,3}$/.test(age)) {
        alert('请输入正确的年龄')
        return false
    }
    return true
}
//地区数据
import area from '../../PiniaStores/area.js'
const props = {
    expandTrigger: 'hover',
    children: 'childs',
    value: 'name',
    label: 'name'
}
//上传交互
async function upLoad(area, age) {
    if (!validate(age)) { //表单验证
        return false
    }
    await axios({
        url: 'https://q.denglu1.cn/user/updateMessage',
        method: 'post',
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
        headers: { 'token': datas.user.token },
        data: {
            id: datas.user.userId,
            age: age,
            province: area[0],
        }
    }).then((response) => {
        console.log(response)
        //写入用户数据
        datas.user.age = age
        datas.user.area = area[0]
        console.log(datas.user)
        if (route.query.redirect) { //判断用户是否从其他页面过来
            router.push({ path: route.query.redirect })
        } else {
            router.push({ path: '/' })
        }
    }).catch((error) => {//上传失败
        console.log(error)
    })
}
</script>

<template>
    <div class="wrapper">
        <div class="titleArea">
            <p>为了保证问卷质量</p>
            <p>我们希望获知您的如下信息</p>
        </div>
        <div class="typeArea">
            <div class="title">
                <div>所在地区</div>
            </div>
            <div areaSelect>
                <el-cascader v-model="user.area" placeholder="请选择所在地区" :options="area" :props="props" separator=" " />
            </div>
            <div class="title">
                <div>您的年龄</div>
            </div>
            <input type="text" v-model="user.age" placeholder="请输入您的年龄" />
        </div>
        <div button>
            <div @click="jump">跳过</div>
            <div @click="upLoad(user.area, user.age)">确认</div>
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
                    content: '';
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
            background-color: rgba(30, 111, 255, 1);
            border-radius: 10px;
            width: 35%;
            color: rgba(255, 255, 255, 1);
            font-size: 14px;
            cursor: pointer;
        }
    }
}
</style>