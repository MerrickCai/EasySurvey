<template>
    <div class="wapper">
        <div class="title">问题反馈</div>
        <form class="content">
            <span>
                <input type="checkbox" id="caton">
                <label for="caton">使用卡顿</label>
            </span>
            <span>
                <input type="checkbox" id="bug">
                <label for="bug">bug</label>
            </span>
            <span>
                <input type="checkbox" id="boundary">
                <label for="boundary">界面美观</label>
            </span>
            <span>
                <input type="checkbox" id="statistics">
                <label for="statistics">数据处理</label>
            </span>
            <span>
                <input type="checkbox" id="create">
                <label for="create">创建问卷</label>
            </span>
            <span>
                <input type="checkbox" id="push">
                <label for="push">发布问卷</label>
            </span>
            <span>
                <input type="checkbox" id="else">
                <label for="else">其他</label>
            </span>
            <p class="opinion" @click="focus" :class="{border:blue==true}">
                <textarea name="" id="" style="resize:none;border: none;outline: none;" @focus="blue=true"
                    @blur="blue=false"></textarea>
                <input type="file">
            </p>
            <div class="push">
                <input type="submit" value="发送">
            </div>
        </form>
    </div>
</template>
<script setup>
import { ref } from "vue"
let blue = ref(false)
function focus() {
    let textarea = document.getElementsByTagName("textarea")
    textarea[0].focus()
}
</script>
<style scoped lang="less">
.wapper {
    display: flex;
    flex-direction: column;

    .title {
        padding: 44px 0 0 46px;
        font-size: 20px;
        font-weight: 500;
        letter-spacing: 0px;
        line-height: 28px;
        color: rgba(0, 0, 0, 1);
        text-align: left;
        vertical-align: top;

        @media(max-width:@breakpoint) {
            padding: 30px 0 0 5px;
        }
    }

    .content {
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-between;
        margin: 36px 142px 0 88px;

        @media(max-width:572px) {
            margin: 15px 40px 0 50px;


        }

        >span {
            display: block;
            width: 25%;
            margin-bottom: 36px;

            @media(max-width:@breakpoint) {
                width: 88px;
                margin-bottom: 0px;
            }

        }

        .opinion {
            display: block;
            height: auto;
            width: 100%;
            border: 1px solid rgba(229, 229, 229, 1);

            textarea {
                width: 100%;
                height: 200px;
            }

        }

        >p.border {
            border: 1px solid rgba(30, 111, 255, 1);
        }

        .push {
            display: flex;
            flex-direction: row-reverse;
            width: 100%;

            input {
                width: 180px;
                height: 36px;
                opacity: 1;
                border-radius: 4px;
                background: rgba(30, 111, 255, 1);
                border: 0px;
                margin-top: 30px;
                font-size: 12px;
                font-weight: 400;
                line-height: 20px;
                color: rgba(255, 255, 255, 1);
                text-align: center;
                vertical-align: top;

                @media(max-width:572px) {
                    margin-top: 20px;
                    margin-right: 36px;
                }
            }
        }


    }
}
</style>