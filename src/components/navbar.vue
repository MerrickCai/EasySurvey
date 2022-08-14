<script setup>
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
function backhome() {
    router.push({
        path: '/'
    })
}
</script>

<template>
    <nav>
        <div class="logo">
            <img src="/logo.png" />
            <router-link to="/">问卷易</router-link>
        </div>
        <div class="links">
            <router-link to="/pinia">pinia测试</router-link>
            <router-link to="/login">登录/注册</router-link>
            <router-link :to="`/${Math.floor(Math.random() * 100)}`">404页</router-link>
        </div>
    </nav>
</template>

<style lang="less" scoped>
nav {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    height: 60px;
    width: var(--safe_area);
    position: fixed;
    z-index: 1000;
    top: 0;
    left: calc((100% - var(--safe_area))/2);

    >div.logo {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 20%;

        img {
            display: block;
            height: 100%;
            width: auto;
            object-fit: contain;
        }

        a {
            display: block;
            height: 100%;
            width: auto;
            line-height: 60px;
            color: rgb(0, 0, 0);
            font-size: 1.7rem;
            text-decoration: none;
        }
    }

    >div.links {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-end;
        align-items: center;
        height: 100%;
        width: 80%;

        a {
            display: block;
            height: 100%;
            margin-right: 10px;
            width: auto;
            line-height: 60px;
            color: rgb(0, 142, 250);
            font-size: 1rem;
            text-decoration: none;
        }
    }
}
</style>