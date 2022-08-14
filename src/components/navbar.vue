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
            <router-link to="/"><img src="/logo.png" />
                <div>问卷易</div>
            </router-link>
        </div>
        <div class="links">
            <router-link to="/404">
                <div>创建问卷</div>
            </router-link>
            <router-link to="/pinia"><img src="/navbar_1.png" /></router-link>
            <router-link to="/statistics">
                <div>统计数据</div>
            </router-link>
            <router-link to="/login"><img src="/navbar_2.png" /></router-link>

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
    height: 80px;
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
        height: 60px;
        width: auto;

        >a {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: auto;
            line-height: 60px;
            color: rgb(0, 0, 0);
            font-size: 1.5rem;
            text-decoration: none;

            >img {
                display: block;
                height: 100%;
                width: auto;
                object-fit: contain;
            }

            >div {
                display: block;
                height: 100%;
                width: auto;
                object-fit: contain;
            }
        }
    }

    >div.links {
        flex: 1;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-end;
        align-items: center;
        height: 60px;
        width: auto;

        >a {
            display: block;
            height: 40px;
            margin-right: 2rem;
            width: auto;
            line-height: 40px;
            font-size: 1rem;
            text-decoration: none;

            >img {
                display: block;
                height: 100%;
                width: auto;
                object-fit: contain;
            }

            >div {
                display: block;
                height: 100%;
                width: auto;
                padding: 0 10px;
                background-color: var(--theme_color);
                border-radius: 15px;
                color: rgb(255, 255, 255);
                font-size: 0.8rem;
            }
        }
    }
}
</style>