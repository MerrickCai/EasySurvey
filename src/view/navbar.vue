<script setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
import { useStore } from "../PiniaStores/index.js";
const datas = useStore();
function logOut() {
    if (datas.user.status === false) {
        alert("您尚未登录");
        return false;
    }
    if (localStorage.getItem("account") && localStorage.getItem("password")) {
        //移除自动登录
        localStorage.removeItem("account");
        localStorage.removeItem("password");
    }
    //清空暂存用户数据
    datas.user.status = false;
    datas.user.account = 0;
    datas.user.password = 0;
    datas.user.userId = 0;
    datas.user.token = 0;
    datas.user.refreshtoken = 0;
    // 跳转登录注册页面
    datas.navShow = false;
    console.log(route);
    router.push({
        path: "/login",
        query: { redirect: route.fullPath },
    });
}
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
                    <div button @click="router.push('/surveynew')">创建问卷</div>
                    <div img><img src="/navbar_1.png" @click="router.push('survey/66')"/></div>
                    <div img avatar @click="router.push('/404404')">
                        <img src="/navbar_3.jpg" />
                    </div>
                    <div img @click="logOut"><img src="/navbar_2.png" /></div>
                </div>
            </Transition>
        </div>
    </nav>
</template>

<style lang="less" scoped>
@navSpan: 90px;
@navHeight: 60px;

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
        transition: all 0.2s ease-in-out 0s;

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

        >.navbar-enter-active,
        >.navbar-leave-active {
            transition: all 0.2s ease-in-out 0s;
        }

        >.navbar-enter-from,
        >.navbar-leave-to {
            transform: translateX(10px);
            filter: opacity(0);
        }

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