<template>
<div wrapper>
            <!-- 进度条 -->
            <!-- <div class="zhedang"></div> -->
            <div class="progress" @click="scrollTo($event)">
                <div class="outer-thumb" ref="thumb">
                    <div class="bluebcg" ref="bluebcg" :style="{ height: `${bluebcg_height}px` }"></div>
                </div>
                <div class="text" ref="text">0%</div>
            </div>
            <!-- 进度条 -->

            <!--问卷区域-->
            <div class="content" ref="content" @scroll="onScroll($event)">
                <!-- 题目 -->
                <!-- 第一层循环 item, i -->
                <div class="main" v-for="(item, i) of survey.questionList" :key="item.questionId"
                    :style="{ height: `${37.5 * item.question.length}px` }">
                    <div class="questiontitle">
                        {{ item.questiontitle }}
                        <p class="scoretips">可支配分数
                            <span class="score">0</span>
                        </p>
                    </div>
                    <!-- 第二层循环 elem,index -->
                    <div class="questionList" v-for="(elem, index) of item.question" :key="index">
                        {{ elem.detail }}
                        <div class="slide" :style="{ backgroundColor: `#e5e5e5` }">
                            <!--400为slide的总宽度，根据分数总数来定每次滑块滑多少-->
                            <div class="Gradient"
                                :style="{ width: `${(elem.value) * (400 / (barArr[i].length - 1))}px` }">
                            </div>
                            <!-- 第三层循环 b,j -->
                            <div v-for="(b, j) of barArr[i]" :key="i" :class="j % 2 === 0 ? 'doublebar' : 'bar'">
                                <span class="num" v-if="!(j % 2)">{{ j }}</span>
                            </div>
                            <img class="thumb" :style="{ left: `${(elem.value) * (400 / (barArr[i].length - 1))}px` }"
                            v-lazy="elem.value === 0 ? '/assets/disable.png' : '/assets/blue.png'">
                            <span class="edit">{{elem.value}}<img v-lazy="'/assets/icon-edit.png'"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

</template>

<script setup>
import { inject, ref, computed, nextTick,onMounted ,reactive} from 'vue';
import { useStore } from '../../Stores/index.js'
import axios from 'axios';

// ------------------接受survey父组件传过来的参数。-------------------------------
const props = defineProps(['surveyObj']);
// 从父组件拿到数据
const surveyObj = computed(() => props.surveyObj)
// console.log('aaa', surveyObj.value);


// 封装一个survey
const survey = reactive({});
survey.questionList = [];
for (let i in surveyObj.value.questionInfoMap) {
    let obj = {};
    obj.questionId = i;
    obj.questiontitle = surveyObj.value.questionInfoMap[i].info;
    obj.question = [];
    obj.secscore = surveyObj.value.optionMap[i][0].dominate;
    for (let j in surveyObj.value.answerMap[i]) {        
        let obj2 = {};
        obj2.value = surveyObj.value.answerMap[i][j].status;
        obj2.detail = surveyObj.value.optionMap[i][j].detail;
        obj.question.push(obj2);
    }
    survey.questionList.push(obj);
}
console.log(survey);







// -----------  滚动条部分的变量和方法 ----------------
const thumb = ref(null);
const text = ref(null);
const content = ref(null);
// 滚动条的蓝色背景的dom
const bluebcg = ref(null);
let bluebcg_height = ref(0);
// 中转变量
let temp;
// 滚动条
const scrollDistence = ref(0)
function scrollTo(e) {
    if (scrollDistence.value === 0) {
        //此为滚动距离scrollTop最大值（e.currentTarget.offsetHeight == e.currentTarget.clientHeight）
        scrollDistence.value = content.value.scrollHeight - content.value.offsetHeight;
    }
    // 此页面滚动条为300px
    //转换(e.offsetY是鼠标点击进度条的位置[0,300]，进度条总长300px)
    content.value.scrollTop = (scrollDistence.value) * (e.offsetY / 300) - 8;
    text.value.innerHTML = `${Math.ceil((e.offsetY / 300) * 100)} %`;

}
function onScroll(e) {
    if (scrollDistence.value === 0) {
        scrollDistence.value = content.value.scrollHeight - content.value.offsetHeight;
    }
    //转换
    thumb.value.setAttribute('style', `top: ${(300) * (content.value.scrollTop / scrollDistence.value) - 8}px`);
    text.value.innerHTML = `${Math.ceil((content.value.scrollTop / scrollDistence.value) * 100) > 100 ? 100 : Math.ceil((content.value.scrollTop / scrollDistence.value) * 100)} %`
    temp = thumb.value.style.top.split("");
    temp.pop();
    temp.pop();
    temp = temp.join("") / 1 + 8;
    bluebcg_height.value = temp;
}




//--------- 用来给上面的模板计算每次thumb应该移动多少的------
const barArr = new Array(survey.questionList.length).fill(0).map((item, index) => new Array(survey.questionList[index].secscore + 1));

</script>


<style scoped lang='less'>
@a: 1px;

div[wrapper] {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    top: 0;
    left: 0;
    z-index: -1;
    
}



//  遮挡原来的
.zhedang {
    position: absolute;
    right: 40px;
    width: 10px;
    height: 500px;
    background-color: white;
    z-index: 10;
    bottom: 70px;
}

//   滚动条
.progress {
    position: absolute;
    z-index: 1;
    height: 300px;
    width: 8px;
    bottom: 150px;
    right: 75px;
    border-radius: 5px;
    background-color: rgba(204, 204, 204, 1);
    cursor: pointer;

    .outer-thumb {
        content: '';
        position: absolute;
        z-index: 2;
        height: 12px;
        width: 12px;
        top: 0;
        left: -2px;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 1);
        cursor: pointer;

        // 为了使白色按钮盖过蓝色背景   
        &::before {
            content: '';
            width: 100%;
            height: 100%;
            border-radius: 5px;
            position: absolute;
            background-color: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
        }

        .bluebcg {
            background-color: #4791ff;
            width: 8px;
            position: absolute;
            bottom: 8px;
            height: 200px;
            left: 2px;
            z-index: -9;
            border-radius: 5px;
            pointer-events: none;
        }
    }

    .text {
        position: absolute;
        z-index: 1;
        height: 18px;
        width: 50px;
        bottom: -20px;
        left: -22px;
        color: rgba(30, 111, 255, 1);
        text-align: center;
        font-size: 16px;
        line-height: 18px;
    }

    // 进度条分段
    .progress-part {
        width: 8px;
        pointer-events: none;

        //    border-radius: 5px;   
        &:first-child {
            border-radius: 5px 5px 0 0;
        }

        &:last-child {
            border-radius: 0 0 5px 5px;
        }
    }
}

// 问卷题目内容部分
.content {
    position: absolute;
    left: 10px;
    width: 1100px;
    height: 450px;
    overflow: auto;
    scrollbar-width: none; /* Firefox */
       &::-webkit-scrollbar {
           display: none; /* Chrome Safari */
       }
    .main {
        background-color: white;
        height: 300px;
        width: 1065px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 38px;
    }

    .questiontitle {
        font-size: 16px;
        font-family: '思源黑体';
        display: flex;
        width: 740px;
        justify-content: space-between;
        position: relative;
        left: 5px;

        .score {
            display: inline-block;
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background-color: #447eff;
            color: white;
            text-align: center;
            line-height: 24px;
            font-size: 12px;
            padding-right: 1px;
            position: absolute;
            top: 0px;
            margin-left: 3px;
        }

        .scoretips {
            font-family: '思源黑体';
            text-align: center;
            // transform: translateY(5px);
            height: 26px;
            line-height: 26px;
            transform: translateX(-35px);
            // background-color: black;
        }

        &::before {
            content: '';
            background-color: #1e6fff;
            width: 3px;
            height: 24px;
            position: absolute;
            left: -5px;
            top: 0;
            z-index: 9999;
        }
    }

    .questionList {
        // margin-left: 15px;
        font-size: 12px;
        font-family: '思源黑体';
        position: relative;
        margin-top: 12px;
        // background-color: pink;

        // 滑块
        .slide {
            // 400+4（其中的4为末尾一个bar的宽度，所以总宽度为404。
            width: 404px;
            height: 8px;
            background-color: #f5f5f5;
            box-sizing: border-box;
            position: absolute;
            right: 100px;
            bottom: 6px;
            display: flex;
            justify-content: space-between;
            @Width: 400px;

            .barStyle() {
                width: 4px;
                height: 11px;
                border-radius: 2px;
                background-color: rgba(204, 204, 204, 1);
                transform: translateY(-3px);
                cursor: pointer;
            }

            .bar {
                .barStyle();
            }

            .num {
                position: absolute;
                top: -15px;
                right: -5px;
                height: 15px;
                width: 15px;
                color: #cccccc;
                font-size: 8px;
                text-align: center;
                display: block;
            }

            .doublebar {
                .barStyle();
                transform: translateY(-7px);
                height: 15px;
            }

            .Gradient {
                width: 0px;
                height: 8px;
                background: linear-gradient(90deg, rgba(194, 225, 254, 1) 0%, #78a5f1 100%);
                position: absolute;
                left: 0;
                z-index: 9;
                pointer-events: none;
                transition: all 0.2s linear;
            }

            @thumbSize: 14px;
            @themeColor: #1e6fff;

            img.thumb {
                position: absolute;
                // z-index: 2;
                bottom: -2px;
                // left: calc(0px - @thumbSize/2); //thumbSize=24px
                height: @thumbSize;
                width: @thumbSize;
                object-fit: cover;
                transform: translateX(-5px);
                // border-radius: 5px;
                transition: all 0.2s linear;
                z-index: 10;
            }

            .edit {
                display: inline-block;
                width: 24px;
                height: 14px;
                position: absolute;
                right: -40px;
                bottom: 0px;
                cursor: pointer;
                font-size: 10px;
                color: rgba(140, 140, 140, 1);
                display: flex;
                text-align: left;
                justify-content: space-between;

                img {
                    width: 16px;
                    height: 16px;
                }
            }

            .editinput {
                width: 24px;
                height: 16px;
                outline: none;
                border: #4791ff 1px solid;
                text-align: center;
                color: rgba(140, 140, 140, 1);
                ;
                position: absolute;
                right: -42px;
                bottom: 0px;
            }
        }

    }

    // 问卷内容完成提交按钮
    .submit {
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 180px;
        height: 40px;
        background-color: rgba(30, 111, 255, 1);
        margin-top: 40px;

        &:hover {
            background-color: #4791ff;
        }

        &:active {
            background-color: #0f52d9;
        }

        // &:focus
        // &:active{
        //     background-color: green;
        // }
        // &.is-active{
        //     background-color: #bfa;
        // }
    }
}


// 对最外层wrapper的微调
div.extrachange {
    width: 1210px;
}



// 完成问卷页面的样式
.finish-wrapper {
    width: 100%;
    height: 100%;

    // background-color: pink;
    .innerbox {
        width: 400px;
        height: 380px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .finish-title {
            width: 365px;
            height: 190px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            text-align: center;

            h2 {
                font-family: '思源黑体';
                font-size: 36px;
                font-weight: 500;
                letter-spacing: 0px;
                line-height: 44px;
                margin-left: -18px;

                &::after {
                    content: '✔';
                    color: white;
                    font-size: 24px;
                    width: 36px;
                    height: 36px;
                    background: radial-gradient(104.2% 104.2%, rgba(30, 111, 255, 1) 0%, rgba(170, 203, 255, 1) 100%);
                    border-radius: 50%;
                    position: absolute;
                    margin-left: 8px;
                    top: 5px;
                    text-align: center;
                    line-height: 36px;
                }
            }

            h3 {
                font-family: '思源黑体';
                font-size: 36px;
                font-weight: 500;
                letter-spacing: 0px;
                line-height: 44px;
                color: rgba(30, 111, 255, 1);
            }

            p {
                font-family: '思源黑体';
                font-size: 20px;
                font-weight: 400;
                letter-spacing: 0px;
                line-height: 28px;
                color: rgba(0, 0, 0, 1);
                text-align: center;
            }
        }

        .finish-submit {
            width: 180px;
            height: 45px;
            background-color: rgba(30, 111, 255, 1);
            margin-top: 40px;

            &:hover {
                background-color: #4791ff;
            }

            &:active {
                background-color: #0f52d9;
            }
        }
    }

}
</style>
