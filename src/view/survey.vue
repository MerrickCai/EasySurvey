<script setup>
</script>

<template>
    <div id="wrapper">
        <div class="tag_wrapper">
            <router-link :to="{ path: '/survey1' }" active-class="active">
                <span>威廉斯创造力倾向表A</span>
            </router-link>
            <router-link :to="{ path: '/survey2' }" active-class="active">
                <span>威廉斯创造力倾向表B</span>
            </router-link>
            <router-link :to="{ path: '/survey3' }" active-class="active">
                <span>贝尔宾团队理论测试</span>
            </router-link>
        </div>
        <div class="container">
            <!--子路由容器-->
            <router-view></router-view>
        </div>
    </div>
</template>

<style lang="less" scoped>
@tag_wrapperHeight: 40px;
@themeColor1: rgba(30, 111, 255, 1);
@themeColor2: rgba(235, 245, 255, 1);

div#wrapper {
    display: block;
    height: 100%;
    width: calc(100% - 14px);
    margin: 0 7px;

    >div.tag_wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        height: @tag_wrapperHeight;
        width: 100%;
        padding-left: 10px;

        >a {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: auto;
            margin-right: 5px;
            padding: 5px 30px 5px 30px;
            position: relative;
            background-color: @themeColor2;
            clip-path: polygon(0 0, 85% 0, 100% 100%, 0% 100%);
            border-radius: 4px 0 0 0;

            &::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 10px;
                height: 12px;
                width: 12px;
                transform: translate(0, -50%);
                border: solid 1px rgba(0, 0, 0, 1);
                border-radius: 50%;
            }

            span {
                font-size: 0.7rem;
                color: rgb(0, 0, 0);
            }

            &:hover {
                cursor: pointer;
            }

            &.active {
                background-color: @themeColor1;

                &::before {
                    border: solid 1px rgba(255, 255, 255, 1);
                }

                span {
                    color: rgb(255, 255, 255);
                }
            }
        }
    }

    >div.container {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        height: calc(100% - @tag_wrapperHeight - 10px);
        width: 100%;
        position: relative;
        top: 0;
        left: 0;
        border-radius: 5px;
        box-shadow: 0px 5px 10px 0 rgba(73, 107, 158, 0.1);
    }
}
</style>