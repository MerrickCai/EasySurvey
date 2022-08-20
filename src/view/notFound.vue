<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function routerPush(path) {
    router.push({ path })
}
</script>

<template>
    <div class="wrapper">
        <p>
            找不到页面
        </p>
        <div button @click="routerPush('/')">返回首页</div>
    </div>
</template>

<style lang="less" scoped>
@themeColor: rgb(30, 111, 255);
@themeColor_faint: rgba(30, 113, 255, 0.8);

div.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    p {
        color: rgb(0, 0, 0);
        font-size: 3rem;
    }

    div[button] {
        display: block;
        height: auto;
        width: auto;
        margin-top: 20px;
        padding: 20px 30px;
        background-color: @themeColor_faint;
        border-radius: 50px;
        color: rgb(255, 255, 255);
        font-size: 3rem;
        transition: all 0.2s ease-in-out 0s;

        &:hover {
            background-color: @themeColor;
            cursor: pointer;
        }
    }
}
</style>