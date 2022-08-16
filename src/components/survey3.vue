<template>
  <div class="wrapper" v-if="!jump">
     <div class="circle-wrapper">
        <div class="headcircle"></div>
     </div>
    <img src="/tangible.png" class="pic1">  
    <h2 class="title">{{survey3.info_title1}}<br>{{survey3.info_title2}}</h2>
    <p class="second-title">{{survey3.info_sec_title}}</p>
    <p class="para">{{survey3.info_para1}}<br><br>{{survey3.info_para2}}<br>{{survey3.info_para3}}</p>
    <el-button type="primary" class="btn" @click="toContent">{{survey3.btn_info}}</el-button>
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="circle3"></div>
    </div>


<!-- 问卷内容部分 -->
    <div class="wrapper" v-if="jump">
       <div class="topbox">
        <h2 class="top_title">{{top.title}}</h2>
        <h5 class="top_sectitle">{{top.sec_title}}</h5>
        <div class="para_wrapper">
           <p class="top_para">{{top.para1}}</p>
           <p class="top_para">{{top.para2}}</p>
           <p class="top_para">{{top.para3}}</p>
        </div>
       </div>
       <div class="content">
            <div class="main" v-for="item of questionList" :key="item.id">
                <div class="questiontitle">{{item.questiontitle}}
                   <p class="scoretips">可支配分数
                     <span class="score">{{item.score}}</span>
                   </p>
                </div>
                <div class="questionList" v-for="(elem,index) of item.question" :key="index">
                    {{elem.detail}}
                        <div class="slide">
                            <div class="bar1" @click="elem.value = 0"></div>
                            <div class="bar2" @click="elem.value = 1"></div>
                            <div class="bar3" @click="elem.value = 2"></div>
                            <div class="bar4" @click="elem.value = 3"></div>
                            <div class="bar5" @click="elem.value = 4"></div>
                            <div class="bar6" @click="elem.value = 5"></div>
                            <div class="bar7" @click="elem.value = 6"></div>
                            <div class="bar8" @click="elem.value = 7"></div>
                            <div class="bar9" @click="elem.value = 8"></div>
                            <div class="bar10" @click="elem.value= 9"></div>
                            <div class="bar11" @click="elem.value=10"></div>
                        <div class="thumb" :style="{ left: `${-6+(elem.value)*40}px` }"></div>	
                    </div>
                </div>
            </div>
       </div>
    </div>
</template>

<script setup>
import { ref,computed,reactive} from 'vue';
const survey3 = {
    info_title1 : '贝尔宾团队角色理论',
    info_title2 :'-团队角色自测问卷',
    info_sec_title : '问卷介绍：',
    info_para1 : '对下列问题的回答，可能在不同程度上描绘了您的行为。每题有8句话，请将10分分配给这8个句子。',
    info_para2 : '分配的原则是：最体现您行为的句子分最高，以此类推。最极端的情况可能是10分全部分配给其中一句话。请根据您的实际情',
    info_para3: '况填入您每题的分数，系统会自动计算出每个角色的得分。得分最高的2-3个角色便是您的团队角色。',
    btn_info:'开始问卷'
}


let jump = ref(false);
function toContent(){
    jump.value = true;
}
  const top = {
    title: '贝尔宾团队角色理论-团队角色自测问卷',
    sec_title: '问卷介绍：',
    para1: '对下列问题的回答，可能在不同程度上描绘了您的行为。每题有8句话，请将10分分配给这8个句子。',
    para2:'分配的原则是：最体现您行为的句子分最高，以此类推。最极端的情况可能是10分全部分配给其中一句话。请根据您的实际情况填入您每题的分数，系统会自动计算出每个角色的得分。得分最高的2-3个角色',
    para3:'便是您的团队角色。'
  }

const questionList = reactive([
    {
        id: 1,
        questiontitle: '一、我认为我能为团队做出的贡献是：',
        question: [
            {
                detail: 'A. 我能很快地发现并把握住新的机遇。',
                value: 0
            },
            {
                detail: 'B. 我能与各种类型的人一起合作共事。',
                value: 0
            },
            {
                detail: 'C. 我生来就爱出主意。',
                value: 0
            },
            {
                detail: 'D. 我的能力在于，一旦发现某些对实现集体目标很有价值的人，我就及时把他们推荐出来',
                value: 0
            },
            {
                detail: 'E. 我能把事情办成，这主要靠我个人的实力。',
                value: 0
            },
            {
                detail: 'F.如果最终能导致有益的结果，我愿面对暂时的冷遇。',
                value: 0
            },
            {
                detail: 'G. 我通常能意识到什么是现实的，什么是可能的。',
                value: 0
            },
            {
                detail: 'H. 在选择行动方案时，我能不带倾向性，也不带偏见地提出一个合理的方案。',
                value: 0
            }],
        score: 10,

    },
    {
        id: 2,
        questiontitle: '一、我认为我能为团队做出的贡献是：',
        question: [
            {
                detail: 'A. 我能很快地发现并把握住新的机遇。',
                value: 0
            },
            {
                detail: 'B. 我能与各种类型的人一起合作共事。',
                value: 0
            },
            {
                detail: 'C. 我生来就爱出主意。',
                value: 0
            },
            {
                detail: 'D. 我的能力在于，一旦发现某些对实现集体目标很有价值的人，我就及时把他们推荐出来',
                value: 0
            },
            {
                detail: 'E. 我能把事情办成，这主要靠我个人的实力。',
                value: 0
            },
            {
                detail: 'F.如果最终能导致有益的结果，我愿面对暂时的冷遇。',
                value: 0
            },
            {
                detail: 'G. 我通常能意识到什么是现实的，什么是可能的。',
                value: 0
            },
            {
                detail: 'H. 在选择行动方案时，我能不带倾向性，也不带偏见地提出一个合理的方案。',
                value: 0
            }],
        score: 10,

    },
]);

</script>

<style scoped lang='less'>
@a:1px;
.public_title(){
        display: block;
        font-family: '思源黑体';
        font-size: 36*@a;
        font-weight: 500;
        letter-spacing: 0*@a;
        line-height: 44*@a;
        vertical-align: middle;
        position: relative;
        &::after{
            content: '';
            width: 100%;
            height: 3px;
            background-color: #1e6fff;
            position: absolute;
            bottom: -2px;
            left: 0;
        }
}

.public_sectitle(){
        font-family: '思源黑体';
        font-size: 20*@a;
        font-weight: 500;
        letter-spacing: 0*@a;
        line-height: 24*@a;
        color: rgba(30, 111, 255, 1);
        text-align: left;
        vertical-align: middle;
}

.wrapper{
    width: 1180*@a;
    height: 810*@a;
    background-color: #fff;
    position: relative;
    left: -3*@a;
    right: 0;
    top: 0;
    // top:-15*@a;  
    margin:0 auto;
    box-sizing: border-box;
    // background-color: #bfa;
    padding: 0;
    .circle-wrapper{
        width: 490*@a;
        height: 490*@a;
        overflow: hidden;
    }
    .headcircle{
        width: 400*@a;
        height: 400*@a;
        border-radius: 50%;
        transform: translateX(-50%) translateY(-50%);
        background-color:rgba(235, 245, 255, 1);;
    }
    .pic1{
        display: block;
        height: 108*@a;
        width: 120*@a;
        position: absolute;
        z-index: 2;
        top: 0;
        right:-6*@a;
        object-fit: contain;
        transform: scale(1.07);
        z-index: 2;
        background-color: white;
    }
    .title{
       .public_title();
        text-align: center;
        position: absolute;
        top: 70*@a;
        left: 0;
        right: 0;
        margin: auto;
        width: 324px;
    }
    .second-title{
       .public_sectitle();
        position: absolute;
        // t304
        top: 220*@a;
        left: 203*@a;
    }
    .para{
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
    }
    .btn{
        width: 240*@a;
        height: 64*@a;
        position: absolute;
        left: 450*@a;
        top: 440*@a;
        background-color:rgba(30, 111, 255, 1);
        font-size: 20*@a;
        font-weight: 500;
        letter-spacing: 0*@a;
        line-height: 28*@a;
        color: rgba(255, 255, 255, 1);
        text-align: left;
        vertical-align: top;
        border-radius: 6*@a;
    }
    .circle1{
        width: 170*@a;
        height: 170*@a;
        border-radius: 50%;
        background-color:rgba(235, 245, 255, 1);
        position:absolute;
        bottom: 0;
        right: 94*@a;
    }
    .circle2{
        width: 150*@a;
        height: 150*@a;
        border-radius: 50%;
        background-color:rgba(71, 145, 255, 1);
        position:absolute;
        bottom: 40*@a;
        right: 44*@a;
        z-index: 2;
    }
    .circle3{
        width: 100*@a;
        height: 100*@a;
        border-radius: 50%;
        background-color:rgba(30, 111, 255, 1);
        position:absolute;
        bottom: 80*@a;
        right:-5.4px;
    }
}


// 答题内容部分
.topbox{
    position: absolute;
    left: 40px;
    top: 40px;
    display: flex;
    flex-direction: column;
    .top_title{
    .public_title();  
      width: 625px;
    }
    .top_sectitle{
      .public_sectitle();
      font-size: 18px;
      margin-top: 12px;
    }
    .para_wrapper{
        .top_para{
          font-family: '思源黑体';
          font-size: 12.4px;
          line-height: 22px;
          font-weight: 400;
        }
    }
}

.content{
    position: absolute;
    top: 200px;
    left: 50px;
    width: 1105px;
    height: 400px;
    overflow: auto;
    .main{
        background-color: white;
        height: 380px;
         width: 1065px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 20px;
    }
    .questiontitle{
        font-size: 16px;
        font-family: '思源黑体';
        display: flex;
        width: 740px;
        justify-content: space-between;
        position: relative;
        left: 5px;
        .score{
            display: inline-block;
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background-color: #447eff;
            color: white;
            text-align: center;
            line-height: 24px;  
            font-size: 12px;
            padding-right: 1px ;
            position: absolute;
            top: 2px;
            margin-left: 2px;
         }
        .scoretips{
            font-family: '思源黑体';
            text-align: center;
            // transform: translateY(5px);
            height: 26px;
            line-height: 26px;
            // background-color: black;
        }
        &::before{
             content: '';
             background-color: #1e6fff;
             width: 3px;
             height: 24px;
             position: absolute;
             left:-5px;
             top: 0;
             z-index: 9999;
          }   
    }
    .questionList{
        margin-left: 45px;
        font-size: 14px;
        font-family: '思源黑体';
        position: relative;
        // 滑块
        .slide{
            width: 400px;
            height: 8px;
            background-color:#f5f5f5;
            position: absolute;
            right: 0;
            bottom: 6px;
        @Width:400px;
        .barStyle(){
                position: absolute;
                z-index: 1;
                bottom: 0px;
                width: 3px;
                height: 11px;
                border-radius: 4px;
                background-color: rgba(204, 204, 204, 1);
                cursor: pointer;
                &::before {
                    position: absolute;
                    top: -15px;
                    right: 4px;
                    height: 1px;
                    width: 1px;
                    color: #cccccc;
                    font-size: 8px;
            }
        }
         div.bar1 {
            left: -2px;
            .barStyle();
            &::before {
                content: '0';
            }
            height: 15px;
        }
        div.bar2 {
            left: calc(-2px + (@Width/10)*1);
            .barStyle();
            &::before {
                content: '';
            }
        }
        div.bar3 {
            left: calc(-2px + (@Width/10)*2);
             &::before {
                content: '2';
            }
            .barStyle();
            height: 15px;
        }
        div.bar4 {
            left: calc(-2px + (@Width/10)*3);
            .barStyle();
            &::before {
                content: '';
            }
        }
        div.bar5 {
            position: absolute;
            left: calc(-2px + (@Width/10)*4);
            &::before {
                content: '4';
            }
            .barStyle();
            height: 15px;
        }

        div.bar6 {
            left: calc(-2px + (@Width/10)*5);
            .barStyle();
            &::before {
                content: '';
            }
        }
        div.bar7 {
            left: calc(-2px + (@Width/10)*6);
            &::before {
                content: '6';
            }
            .barStyle();
            height: 15px;
        }
        div.bar8 {
            left: calc(-2px + (@Width/10)*7);
            .barStyle();
            &::before {
                content: '';
            }
        }
        div.bar9 {
            left: calc(-2px + (@Width/10)*8);
            &::before{
                 content: '8';
            }
            .barStyle();
            height: 15px;
        }
        div.bar10 {
            left: calc(-2px + (@Width/10)*9);
            .barStyle();
            &::before {
                content: '';
            }
        }        
        div.bar11 {
            left: calc(-2px + (@Width/10)*10);
            .barStyle();
            &::before{
                 content: '10';
                 right: 8px;
            }
            height: 15px;
        }
         @thumbSize:14px;
         @themeColor:#1e6fff;
            div.thumb {
                position: absolute;
                z-index: 2;
                bottom: -2px;
                left: calc(0px - @thumbSize/2); //thumbSize=24px
                height: @thumbSize;
                width: @thumbSize;
                background-color: @themeColor;
                border-radius: 5px;
                transition: all 0.2s linear;

                &::before {
                    content: '';
                    position: absolute;
                    top: calc((@thumbSize - 7px)/2);
                    left: calc((@thumbSize - 6px)/2);
                    height: 6px;
                    width: 1px;
                    background-color: rgb(255, 255, 255);
                }

                &::after {
                    content: '';
                    position: absolute;
                    top: calc((@thumbSize - 7px)/2);
                    left: calc((@thumbSize + 5px)/2);
                    height:6px;
                    width: 1px;
                    background-color: rgb(255, 255, 255);
                }
            }
        }

    }


}





</style>
