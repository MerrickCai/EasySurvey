<script setup>
import { useRouter, useRoute } from "vue-router"
import { useStore } from "../Stores/pinia.js"
const router = useRouter()
const route = useRoute()
const datas = useStore()



// ----------------------------------- 退出登录 ----------------------------------
function logOut() {

    if (datas.user.status === false) { //用户在不需要登录的页面
        router.push("/login")
        return false
    }

    ElMessage({
        message: '已为您退出登录',
        type: 'success',
        duration: 3000,
        showClose: true,
        center: true
    })

    if (localStorage.getItem("User")) { //移除自动登录
        localStorage.removeItem("User")
    }

    datas.user.status = false

    // 跳转登录注册页面
    router.push({
        path: "/login",
        query: { redirect: route.fullPath },
    })

}
// ----------------------------------- 退出登录 ----------------------------------




// ----------------------------------- 开发中通知 ----------------------------------
function devpop() {
    ElMessage({
        message: '开发中',
        type: 'warning',
        duration: 3000,
        showClose: true,
        center: true
    })
}
// ----------------------------------- 开发中通知 ----------------------------------




// ----------------------------------- logo点击事件 ----------------------------------
function toHome() {
    if (datas.user.status === false) {
        ElMessage({
            message: '请您先登录',
            type: 'warning',
            duration: 3000,
            showClose: true,
            center: true
        })
    } else {
        router.push('/')
    }
}
// ----------------------------------- logo点击事件 ----------------------------------
</script>

<template>
    <nav>
        <div logo @click="toHome">
            <img v-lazy="'/assets/logo.png'" />
            <div>问卷易</div>
        </div>
        <div links>
            <Transition name="navbar">
                <div v-show="datas.navShow">
                    <div button @click="router.push('/surveynew')">创建问卷</div>
                    <div img @click="devpop"><img v-lazy="'/assets/navbar_1.png'" /></div>
                    <div img avatar @click="router.push(`/user/${ datas.user.userId}`)"><img
                            v-lazy="'/assets/circle.png'" /></div>
                    <div img @click="logOut"><img v-lazy="'/assets/navbar_2.png'" /></div>
                </div>
            </Transition>
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
            font-size: 28px;
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
            height: calc(@navHeight - 15px);
            width: auto;

            >div[button] {
                display: block;
                height: calc(@navHeight - 15px);
                width: auto;
                margin-right: 40px;
                padding: 0 10px;
                background-color: rgba(71, 145, 255, 1);
                border-radius: 10px;
                color: rgb(255, 255, 255);
                font-size: 16px;
                line-height: calc(@navHeight - 15px);
                cursor: pointer;

                @media (max-width:@breakpoint) {
                    margin-right: 10px;
                }
            }

            >div[img] {
                display: block;
                height: calc(@navHeight - 15px);
                width: auto;
                margin-right: 40px;
                cursor: pointer;

                @media (max-width:@breakpoint) {
                    margin-right: 10px;
                }

                >img {
                    display: block;
                    height: 100%;
                    width: auto;
                    object-fit: contain;
                }

                &[avatar] {
                    >img {
                        display: block;
                        height: calc(@navHeight - 15px);
                        width: calc(@navHeight - 15px);
                        border-radius: 50%;
                        object-fit: cover;
                    }
                }
            }
        }
    }
}
</style>