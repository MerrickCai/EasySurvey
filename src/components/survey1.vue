<script setup>

</script>

<template>
    <div class="container">
        <div class="decoration1"></div>
        <div class="decoration2"></div>
        <div class="decoration3"></div>
        <div class="decoration4"></div>
        <div class="content">
            <p title>威廉斯创造力倾向表</p>
            <p intro>
                <span intro_title>问卷介绍：</span>
                <span
                    intro_content>威廉斯创造力倾向表通过测验个人的一些性格特点包括冒险性、好奇性、想象力和挑战性，来测量个人的创造性倾向。这是一份帮助你了解自己创造力的练习。在下列的句子中，共有三种情形，“完全符合”、“部分符合”、“完全不符合”，选择最符合你自身情况的选项。
                    切记，凭你自己的真实的感觉作答，选择最符合你自身情况的选项。</span>
                <span warn_title>注意：</span>
                <span warn_content>每一题都要做，不要花太多的时间去想。
                    所有的题目都没有“正确答案”，凭你读每一句子后的第一印象作答。 虽然没有时间限制，但应尽可能地争取以较快的速度完成，愈快愈好。</span>
            </p>
            <p button>开始答题</p>
        </div>
    </div>
</template>

<style lang="less" scoped>
@themeColor: rgba(30, 111, 255, 1);

div.container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    height: calc(100% - 10px);
    width: 100%;
    position: relative;
    overflow: hidden;
    box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.1);

    >div.content {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        height: auto;
        width: auto;

        p[title] {
            display: block;
            height: auto;
            width: auto;
            margin-bottom: 50px;
            position: relative;
            font-size: 2rem;
            color: rgba(0, 0, 0, 1);

            &::after {
                content: '';
                display: block;
                position: absolute;
                bottom: -1px;
                right: 0;
                height: 4px;
                width: 100%;
                background-color: @themeColor;
                border-radius: 5px;
            }
        }

        p[intro] {
            display: block;
            height: auto;
            width: 70%;
            margin-bottom: 100px;

            span[intro_title] {
                display: block;
                height: auto;
                width: auto;
                margin-bottom: 10px;
                font-size: 0.8rem;
                color: @themeColor;
            }

            span[intro_content] {
                display: block;
                height: auto;
                width: auto;
                margin-bottom: 20px;
                font-size: 0.8rem;
                color: rgba(0, 0, 0, 1);
            }

            span[warn_title] {
                display: block;
                height: auto;
                width: auto;
                margin-bottom: 10px;
                font-size: 0.8rem;
                color: rgba(0, 0, 0, 1);
            }

            span[warn_content] {
                display: block;
                height: auto;
                width: auto;
                font-size: 0.8rem;
                color: rgba(0, 0, 0, 1);
            }
        }

        p[button] {
            display: block;
            height: auto;
            width: auto;
            padding: 20px 60px;
            background-color: @themeColor;
            color: rgb(255, 255, 255);
            font-size: 0.9rem;

            &:hover {
                cursor: pointer;
            }
        }
    }

    >div.decoration1 {
        display: block;
        height: 400px;
        width: 400px;
        position: absolute;
        z-index: -10;
        top: 0;
        left: 0;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background-color: rgba(235, 245, 255, 1);
    }

    >div.decoration2 {
        display: block;
        height: 150px;
        width: 150px;
        position: absolute;
        z-index: -10;
        bottom: 40px;
        right: 50px;
        border-radius: 50%;
        background-color: rgba(71, 145, 255, 1);
    }

    >div.decoration3 {
        display: block;
        height: 100px;
        width: 100px;
        position: absolute;
        z-index: -11;
        bottom: 80px;
        right: 0;
        border-radius: 50%;
        background-color: rgba(30, 111, 255, 1);
    }

    >div.decoration4 {
        display: block;
        height: 170px;
        width: 170px;
        position: absolute;
        z-index: -12;
        bottom: 0;
        right: 100px;
        border-radius: 50%;
        background-color: rgba(235, 245, 255, 1);
    }
}
</style>