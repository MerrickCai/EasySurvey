<script setup>
//路由
import { useRouter } from 'vue-router'
const router = useRouter()
function routerPush(path) {
    router.push({ path })
}

//Pinia数据
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
                <div button @click="routerPush('/survey')">创建问卷</div>
                <div img @click="routerPush('/dev')"><img src="/navbar_1.png" /></div>
                <div img avatar @click="routerPush('/dev')"><img src="/navbar_3.jpg" /></div>
                <div img @click="routerPush('/login')"><img src="/navbar_2.png" /></div>
            </template>
        </div>
    </nav>
</template>

<style lang="less" scoped>
@nav: 80px;
@navHeight: 60px;
@themeColor1: rgb(30, 111, 255);
@themeColor2: rgba(30, 113, 255, 0.8);
@themeColor3: rgba(71, 145, 255, 1);


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
                font-size: 2.8rem;
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
        height: calc(@navHeight - 10px);
        width: auto;

        >div[button] {
            display: block;
            height: 80%;
            width: auto;
            margin-right: 4rem;
            padding: 0 15px;
            background-color: @themeColor3;
            border-radius: 10px;
            color: rgb(255, 255, 255);
            font-size: 1.6rem;
            line-height: calc((@navHeight - 10px)*0.8);

            &:hover {
                cursor: pointer;
            }
        }

        >div[img] {
            display: block;
            height: 80%;
            width: auto;
            margin-right: 4rem;

            &[avatar] {
                >img {
                    display: block;
                    height: calc(@navHeight*0.8);
                    width: calc(@navHeight*0.8);
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