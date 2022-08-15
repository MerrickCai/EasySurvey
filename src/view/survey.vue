<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function routerPush(path) {
    router.push({ path })
}
</script>

<template>
    <!--标签-->
    <div id="wrapper">
        <div class="tag_wrapper">
            <div active @click="routerPush('/survey1')">
                <span>威廉斯创造力倾向表A</span>
            </div>
            <div @click="routerPush('/survey2')">
                <span>威廉斯创造力倾向表B</span>
            </div>
            <div @click="routerPush('/survey3')">
                <span>贝尔宾团队理论测试</span>
            </div>
        </div>
        <!--问卷-->
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<style lang="less" scoped>
@tag_wrapperHeight: 2rem;
@themeColor1: rgba(30, 111, 255, 1);
@themeColor2: rgba(235, 245, 255, 1);

div#wrapper {
    display: block;
    height: 100%;
    width: calc(100% - 12px);
    margin: 0 6px;

    >div.tag_wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        height: @tag_wrapperHeight;
        width: 100%;
        padding-left: 10px;

        >div {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: auto;
            margin-right: 5px;
            padding: 10px 30px 5px 30px;
            position: relative;
            background-color: @themeColor2;
            clip-path: polygon(0 0, 85% 0, 100% 100%, 0% 100%);
            border-radius: 4px 4px 0 4px;

            &::before {
                content: '';
                position: absolute;
                top: 60%;
                left: 10px;
                height: 12px;
                width: 12px;
                transform: translate(0, -50%);
                border: solid 1px rgba(0, 0, 0, 1);
                border-radius: 50%;
            }

            &:hover {
                cursor: pointer;
            }

            &[active] {
                background-color: @themeColor1;

                &::before {
                    border: solid 1px rgba(255, 255, 255, 1);
                }

                span {
                    color: rgb(255, 255, 255);
                }
            }

            span {
                font-size: 0.7rem;
                color: rgb(0, 0, 0);
            }
        }
    }

    >div.container {
        display: block;
        height: calc(100% - @tag_wrapperHeight);
        width: 100%;
    }
}
</style>