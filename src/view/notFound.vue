<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
    <div class="wrapper">
        <p>
            页面丢失了
        </p>
        <div button @click="router.push('/')">回到首页</div>
    </div>
</template>

<style lang="less" scoped>
div.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    p {
        color: rgb(0, 0, 0);
        font-size: 30px;
    }

    div[button] {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 70px;
        width: 180px;
        margin-top: 50px;
        background-color: rgba(30, 113, 255, 0.8);
        border-radius: 20px;
        color: rgb(255, 255, 255);
        font-size: 20px;
        transition: all 0.2s ease-in-out 0s;
        cursor: pointer;

        &:hover {
            transform: scale(1.1);
            background-color: rgba(30, 113, 255, 1);
        }
    }
}
</style>