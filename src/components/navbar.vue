<script setup>
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
function routerPush(path) {
    router.push({ path })
}
import { useStore } from '../PiniaStores/index.js'
const datas = useStore()
</script>

<template>
    <nav>
        <div logo>
            <div button @click="routerPush('/')">
                <img src="/logo.png" />
                <div>问卷易</div>
            </div>
        </div>
        <div links>
            <template v-if="datas.navShow">
                <div button @click="routerPush('/statistics')">统计数据</div>
                <div img @click="routerPush('/pinia')"><img src="/navbar_1.png" /></div>
                <div img avatar @click="routerPush('/404')"><img src="/navbar_3.jpg" /></div>
                <div img @click="routerPush('/login')"><img src="/navbar_2.png" /></div>
            </template>
        </div>
    </nav>
</template>

<style lang="less" scoped>
@nav: 70px;
@navHeight: 50px;
@themeColor: rgb(30, 111, 255);
@themeColor_faint: rgba(30, 113, 255, 0.8);

nav {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    height: @nav;
    width: var(--safe_area);
    position: fixed;
    z-index: 10;
    top: 0;
    left: calc((100% - var(--safe_area))/2);

    >div[logo] {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        height: @navHeight;
        width: auto;

        >div[button] {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: auto;

            &:hover {
                cursor: pointer;
            }

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
                color: rgb(0, 0, 0);
                font-size: 1.5rem;
                line-height: @navHeight;
            }
        }
    }

    >div[links] {
        flex: 1;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-end;
        align-items: center;
        height: @navHeight;
        width: auto;

        >div[button] {
            display: block;
            height: 100%;
            width: auto;
            margin-right: 2rem;
            padding: 0 10px;
            background-color: @themeColor_faint;
            border-radius: 20px;
            color: rgb(255, 255, 255);
            font-size: 1rem;
            line-height: @navHeight;
            transition: all 0.3s linear 0s;

            &:hover {
                background-color: @themeColor;
                cursor: pointer;
            }
        }

        >div[img] {
            display: block;
            height: 100%;
            width: auto;
            margin-right: 2rem;

            &[avatar] {
                >img {
                    display: block;
                    height: @navHeight;
                    width: @navHeight;
                    border-radius: 50%;
                    object-fit: cover;
                }
            }

            &:hover {
                cursor: pointer;
            }

            >img {
                display: block;
                height: 100%;
                width: auto;
                object-fit: contain;
            }
        }
    }
}
</style>