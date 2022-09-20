<template>
    <div wrapper>
        <!-- 问卷内容部分 -->
        <div class="wrapper extrachange">
            <!-- 进度条 -->
            <div class="zhedang"></div>
            <div class="progress" @click="scrollTo($event)">
                <div class="outer-thumb" ref="thumb">
                    <div class="bluebcg" ref="bluebcg" :style="{ height: `${bluebcg_height}px` }"></div>
                </div>
                <div class="text" ref="text">0%</div>
            </div>

            <div class="content" ref="content" @scroll="onScroll($event)">
                <!-- 题目 -->
                <!-- 第一层循环 item, i -->
                <div class="main" v-for="(item, i) of survey.questionList" :key="item.questionId"
                    :style="{ height: `${37.5 * item.option.length}px` }">
                    <div class="questiontitle">
                        {{ item.questiontitle }}
                    </div>
                    <!-- 第二层循环 elem,index -->
                    <div class="ques" v-for="(elem, index) of item.option" :key="index">
                        <input type="radio" class="input" :name="item.questionId"  :id="elem.optionId"    :value="elem.detail" ref="option" disabled >
                        <p>{{ elem.detail }}</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>

import { inject, onMounted, ref, computed, reactive } from 'vue'
import axios from 'axios'

// ------------------接受survey父组件传过来的参数。-------------------------------
const props = defineProps(['surveyObj']);
// 从父组件拿到数据
const surveyObj = computed(() => props.surveyObj)


// 封装一个survey
const survey = reactive({});
survey.questionList = [];
for (let i in surveyObj.value.questionInfoMap) {
    let obj = {};
    obj.questionId = i;
    obj.questiontitle = surveyObj.value.questionInfoMap[i].info;
    obj.option = [];
    for (let j in surveyObj.value.optionMap[i]) {
        obj.option.push({
        optionId: surveyObj.value.optionMap[i][j].id,
          detail:surveyObj.value.optionMap[i][j].detail
        });
    }
    survey.questionList.push(obj); 
}
survey.seleted = [];
for (let i in surveyObj.value.answerMap) {
      survey.seleted.push(surveyObj.value.answerMap[i][0].optionId);
}
console.log('survey',survey);

const option = ref(null);
onMounted(() => {
    option.value.forEach(item => {

     if (survey.seleted.includes(item.id/1)) {
         console.log(1);
         item.checked = true;
   }    
})
})



// --- 滚动条部分的变量和方法 ---
const thumb = ref(null);
const text = ref(null);
const content = ref(null);
// 滚动条的蓝色背景的dom
const bluebcg = ref(null);
let bluebcg_height = ref(0);
// 中转变量
let temp;
// 滚动条
const scrollDistence = ref(0);
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
    position: relative;
    top: 0;
    left: 0;
    z-index: -1;
}

// 供调用
.public_title() {
    display: block;
    font-family: '思源黑体';
    font-size: 36*@a;
    font-weight: 500;
    letter-spacing: 0*@a;
    line-height: 44*@a;
    vertical-align: middle;
    position: relative;

    &::after {
        content: '';
        width: 100%;
        height: 3px;
        background-color: #1e6fff;
        position: absolute;
        bottom: -2px;
        left: 0;
    }
}

// 供调用
.public_sectitle() {
    font-family: '思源黑体';
    font-size: 20*@a;
    font-weight: 500;
    letter-spacing: 0*@a;
    line-height: 24*@a;
    color: rgba(30, 111, 255, 1);
    text-align: left;
    vertical-align: middle;
}

.public_wrapper() {
    width: 1190*@a;
    height: 810*@a;
    background-color: #fff;
    position: relative;
    left: -0*@a;
    right: 0;
    top: 0;
    // top:-15*@a;  
    margin: 0 auto;
    box-sizing: border-box;
    // background-color: #bfa;
    padding: 0;
    box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.1);
    z-index: 10;
}

// 介绍页面部分
.wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-start;

    .title {
        .public_title();
        text-align: center;
        position: absolute;
        top: 70*@a;
        left: 0;
        right: 0;
        margin: auto;
        width: 350px;
        white-space: pre-wrap;
    }

    .second-title {
        .public_sectitle();
        position: absolute;
        // t304
        top: 220*@a;
        left: 203*@a;
    }

    .para {
        width: @breakpoint;
        font-family: '思源黑体';
        font-size: 16*@a;
        font-weight: 400;
        letter-spacing: 0*@a;
        line-height: 22*@a;
        color: rgba(0, 0, 0, 1);
        text-align: left;
        vertical-align: middle;
        position: absolute;
        top: 260*@a;
        left: 203*@a;
        white-space: pre-wrap;
    }

    .btn {
        width: 240*@a;
        height: 64*@a;
        position: absolute;
        left: 450*@a;
        top: 440*@a;
        background-color: rgba(30, 111, 255, 1);
        font-size: 20*@a;
        font-weight: 500;
        letter-spacing: 0*@a;
        line-height: 28*@a;
        color: rgba(255, 255, 255, 1);
        text-align: left;
        vertical-align: top;
        border-radius: 6*@a;
    }


}

// 答题内容部分
// 头部的文字解释
.topbox {
    margin: 40px 0 30px 40px;
    display: flex;
    flex-direction: column;

    .top_title {
        .public_title();
        width: 625px;
    }

    .top_sectitle {
        .public_sectitle();
        font-size: 18px;
        margin-top: 12px;
    }

    .para_wrapper {
        width: 1050px;

        .top_para {
            font-family: '思源黑体';
            font-size: 12.4px;
            line-height: 22px;
            font-weight: 400;
        }
    }
}



// 问卷题目内容部分
.content {
    top: 80px;
    width: 1055px;
    height: 450px;
    overflow: auto;
    position: absolute;
    flex: 1;
    left: 40px;
    // background-color: pink;
    .main {
        background-color: white;
        height: 300px;
        width: 855px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 20px;    
        .ques {
            display: flex;
        }

        .input {
            display: block;
            width: 16px;
            height: 16px;
            margin-right: 5px;
        }
    }

    .questiontitle {
        font-size: 16px;
        font-family: '思源黑体';
        display: flex;
        width: 740px;
        justify-content: space-between;
        position: relative;
        left: 5px;

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
        margin-left: 45px;
        font-size: 14px;
        font-family: '思源黑体';
        position: relative;
        // 滑块      
    }

    // 问卷内容完成提交按钮
    .submit {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        width: 240px;
        height: 60px;
        margin: 20px auto;
        background-color: rgba(30, 111, 255, 1);
        cursor: pointer;
        border-radius: 10px;
        font-size: 20px;
        color:rgb(255,255,255);

        &:hover {
            background-color: #4791ff;
        }

        &:active {
            background-color: #0f52d9;
        }
    }
}




.finish-wrapper {
    width: 100%;
    height: 100%;

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


//  遮挡原来的
.zhedang {
    position: absolute;
    right: 55px;
    background-color: white;
    // background-color: pink;
    width: 10px;
    height: 500px;
    z-index: 10;
    bottom: 20px;
}

//   滚动条
.progress {
    position: absolute;
    z-index: 1;
    height: 300px;
    width: 8px;
    bottom: 165px;
    right: 155px;
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
        bottom: -40px;
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
</style>