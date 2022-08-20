<script setup>
//路由
import { useRouter } from 'vue-router'
const router = useRouter()
//顶部导航栏组件的展示（除logo外的控件）
import { useStore } from '../PiniaStores/index.js'
const datas = useStore()
</script>

<template>
    <nav>
        <div logo @click="router.push('/')">
            <img src="/logo.png" />
            <div>问卷易</div>
        </div>
        <div links>
            <Transition name="navbar">
                <div v-show="datas.navShow">
                    <div button @click="router.push('/survey')">创建问卷</div>
                    <div img @click="router.push('/404404')"><img src="/navbar_1.png" /></div>
                    <div img avatar @click="router.push('/404')"><img src="/navbar_3.jpg" /></div>
                    <div img @click="router.push('/login')"><img src="/navbar_2.png" /></div>
                </div>
            </Transition>
        </div>
    </nav>
</template>

<style lang="less" scoped>
@navSpan: 90px;
@navHeight: 60px;

.navbar-enter-active,
.navbar-leave-active {
    transition: all 0.2s linear 0s;
}

.navbar-enter-from,
.navbar-leave-to {
    transform: translateX(10px);
    filter: opacity(0);
}

nav {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    height: @navSpan;
    width: var(--safe_area);

    >div[logo] {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        height: @navHeight;
        width: auto;
        cursor: pointer;
        transition: transform 0.4s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;

        &:hover {
            transform: scale(1.1);
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

    >div[links] {
        flex: 1;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-end;
        align-items: center;
        height: @navHeight;
        width: auto;
        overflow: hidden;

        >div {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: center;
            align-items: center;
            height: calc(@navHeight - 10px);
            width: auto;

            >div[button] {
                display: block;
                height: calc(@navHeight - 20px);
                width: auto;
                margin-right: 4rem;
                padding: 0 15px;
                background-color: rgba(71, 145, 255, 1);
                border-radius: 10px;
                color: rgb(255, 255, 255);
                font-size: 1.6rem;
                line-height: calc(@navHeight - 20px);
                cursor: pointer;
            }

            >div[img] {
                display: block;
                height: calc(@navHeight - 20px);
                width: auto;
                margin-right: 4rem;
                cursor: pointer;

                >img {
                    display: block;
                    height: 100%;
                    width: auto;
                    object-fit: contain;
                }

                &[avatar] {
                    >img {
                        display: block;
                        height: calc(@navHeight - 20px);
                        width: calc(@navHeight - 20px);
                        border-radius: 50%;
                        object-fit: cover;
                    }
                }
            }
        }
    }
}
</style>