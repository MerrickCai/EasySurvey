<template>
    <div class="wapper">
        <div class="title">问卷记录</div>
    </div>
</template>
<script setup>
import axios from "axios";
import { useStore } from "../../Stores/pinia.js";
const datas = useStore();
function getted() {
    axios({
        url: `https://q.denglu1.cn/api/user/questionnaireList/${datas.user.userId}`,
        method: "get",
        withCredentials: true,
        headers: { "Content-Type": "application/json", token: datas.getToken() },

    })
        .then((response) => {
            console.log("用户填写过的所有问卷信息", response);
        })
        .catch((error) => {
            console.log(error);
        });
}
getted();
function getinfor() {
    axios({
        url: `https://q.denglu1.cn/api/user/questionnaire/${datas.user.userId}`,
        method: "get",
        withCredentials: true,
        headers: { "Content-Type": "application/json", token: datas.getToken() },
    })
        .then((response) => {
            console.log("用户发布的所有问卷信息", response);
        })
        .catch((error) => {
            console.log(error);
        });
}
getinfor();
</script>
<style scoped lang="less">
.wapper {
    display: flex;
    flex-direction: column;

    .title {
        padding: 44px 0 0 46px;
        font-size: 20px;
        font-weight: 500;
        letter-spacing: 0px;
        line-height: 28px;
        color: rgba(0, 0, 0, 1);
        text-align: left;
        vertical-align: top;

        @media(max-width:@breakpoint) {
            padding: 30px 0 0 5px;
        }
    }
}
</style>