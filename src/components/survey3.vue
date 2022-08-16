<template>
  <div class="wrapper" v-if="!jump">
     <div class="circle-wrapper">
        <div class="headcircle"></div>
     </div>
    <img src="/tangible.png" class="pic1">  
    <h2 class="title">{{survey3.info_title1}}<br>{{survey3.info_title2}}</h2>
    <p class="second-title">{{survey3.info_sec_title}}</p>
    <p class="para">{{survey3.info_para1}}<br><br>{{survey3.info_para2}}<br>{{survey3.info_para3}}</p>
    <el-button type="primary" class="btn" @click="totop">{{survey3.btn_info}}</el-button>
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="circle3"></div>
    </div>

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
                    {{elem}}
                      <div class="slider-demo-block slide">
                        <!-- <el-slider  :step="10" show-stops  size="small"  placement="right"/> -->
                    </div>
                </div>
            </div>
       </div>
    </div>
</template>

<script setup>
import { ref,computed} from 'vue';
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
function totop(){
    jump.value = true;
}
  const top = {
    title: '贝尔宾团队角色理论-团队角色自测问卷',
    sec_title: '问卷介绍：',
    para1: '对下列问题的回答，可能在不同程度上描绘了您的行为。每题有8句话，请将10分分配给这8个句子。',
    para2:'分配的原则是：最体现您行为的句子分最高，以此类推。最极端的情况可能是10分全部分配给其中一句话。请根据您的实际情况填入您每题的分数，系统会自动计算出每个角色的得分。得分最高的2-3个角色',
    para3:'便是您的团队角色。'
  }

const questionList = [
    {
       id:1,
       questiontitle: '一、我认为我能为团队做出的贡献是：',
       question:['A. 我能很快地发现并把握住新的机遇。','B. 我能与各种类型的人一起合作共事。','C. 我生来就爱出主意。','D. 我的能力在于，一旦发现某些对实现集体目标很有价值的人，我就及时把他们推荐出来','E. 我能把事情办成，这主要靠我个人的实力。','F.如果最终能导致有益的结果，我愿面对暂时的冷遇。','G. 我通常能意识到什么是现实的，什么是可能的。','H. 在选择行动方案时，我能不带倾向性，也不带偏见地提出一个合理的方案。'],
       score:10
    },
    {
       id:2,
       questiontitle: '一、我认为我能为团队做出的贡献是：',
       question:['A. 我能很快地发现并把握住新的机遇。','B. 我能与各种类型的人一起合作共事。','C. 我生来就爱出主意。','D. 我的能力在于，一旦发现某些对实现集体目标很有价值的人，我就及时把他们推荐出来','E. 我能把事情办成，这主要靠我个人的实力。','F.如果最终能导致有益的结果，我愿面对暂时的冷遇。','G. 我通常能意识到什么是现实的，什么是可能的。','H. 在选择行动方案时，我能不带倾向性，也不带偏见地提出一个合理的方案。'],
       score:10
    }
]

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
            top: '';
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
    // top:100*@a; 
    margin:0 auto;
    box-sizing: border-box;
    padding: 0;
    background-color: pink;
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
    top: 240px;
    left: 50px;
    .main{
        background-color: #bfa;
        height: 330px;
         width: 900px;
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
            left: -5px;
        }

    }
    .questionList{
        margin-left: 45px;
        font-size: 14px;
        font-family: '思源黑体';
    }


}



</style>
