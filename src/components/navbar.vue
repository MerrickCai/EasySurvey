<script setup>
// import { useRouter, useRoute } from 'vue-router'
// const router = useRouter()
// const route = useRoute()
// function backhome() {
//     router.push({
//         path: '/'
//     })
// }
</script>

<template>
    <nav>
        <div id="logo">
            <router-link to="/">问卷易</router-link>
        </div>
        <div>
            <el-button type="primary" round>
                <router-link to="/pinia">pinia测试</router-link>
            </el-button>
            <el-button type="primary" round>
                <router-link to="/login">登录/注册</router-link>
            </el-button>
            <el-button type="primary" round>
                <router-link :to="`/${Math.floor(Math.random() * 100)}`">404页</router-link>
            </el-button>
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
    margin: 0 auto;
    height: 70px;
    width: var(--safe_area);
    position: fixed;
    z-index: 1000;
    top: 0;
    left: calc((100% - var(--safe_area))/2);

    #logo {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        height: auto;
        width: 30%;

        a {
            color: rgb(0, 0, 0);
            font-size: 1.5rem;
        }
    }

    a {
        display: inline-block;
        margin: 5px;
        padding: 5px;
        text-decoration: none;
        color: rgb(0, 0, 0);
        font-size: 1rem;
    }
}
</style>