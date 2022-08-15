<template>
  <div class="wrapper">
     <div class="circle-wrapper">
        <div class="headcircle"></div>
     </div>
    <img src="/tangible.png" class="pic1">
    <h2 class="title">贝尔宾团队角色理论<br>-团队角色自测问卷</h2>
    <p class="second-title">问卷介绍：</p>
    <p class="para">对下列问题的回答，可能在不同程度上描绘了您的行为。每题有8句话，请将10分分配给这8个句子。<br><br>分配的原则是：最体现您行为的句子分最高，以此类推。最极端的情况可能是10分全部分配给其中一句话。请根据您的实际情<br>况填入您每题的分数，系统会自动计算出每个角色的得分。得分最高的2-3个角色便是您的团队角色。                   </p>
    <el-button type="primary" class="btn">开始问卷</el-button>
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="circle3"></div>
  </div>

</template>

<script setup>
// import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

</script>

<style scoped lang='less'>
@a:0.75px;
.wrapper{
    width: 1240*@a;
    height: 810*@a;
    background-color: #fff;
    position: relative;
    left: 0;
    right: 0;
    top:100*@a;
    margin:auto;
    box-sizing: border-box;
    .circle-wrapper{
        width: 500*@a;
        height: 500*@a;
        overflow: hidden;
    }
    .headcircle{
        width: 420*@a;
        height: 420*@a;
        border-radius: 50%;
        border: 1*@a solid #6e98ff;
        transform: translateX(-50%) translateY(-50%);
        background-color:rgba(235, 245, 255, 1);;
    }
    .pic1{
        width: 100*@a;
        height: 100*@a;
        position: absolute;
        right: 0;
        top: 0;
    }
    .title{
        font-family: '思源黑体';
        font-size: 36*@a;
        font-weight: 500;
        letter-spacing: 0*@a;
        line-height: 44*@a;
        text-align: center;
        vertical-align: middle;
        position: absolute;
        top: 140*@a;
        left: 0;
        right: 0;
        margin: auto;
    }
    .second-title{
        font-family: '思源黑体';
        font-size: 16*@a;
        font-weight: 500;
        letter-spacing: 0*@a;
        line-height: 24*@a;
        color: rgba(30, 111, 255, 1);
        text-align: left;
        vertical-align: middle;
        position: absolute;
        top: 304*@a;
        left: 253*@a;
    }
    .para{
        font-family: '思源黑体';
        font-size: 14*@a;
        font-weight: 400;
        letter-spacing: 0*@a;
        line-height: 22*@a;
        color: rgba(0, 0, 0, 1);
        text-align: left;
        vertical-align: middle;
        position: absolute;
        top: 340*@a;
        left: 253*@a;
    }
    .btn{
        width: 240*@a;
        height: 64*@a;
        position: absolute;
        left: 500*@a;
        bottom: 115*@a;
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
        width: 240*@a;
        height: 240*@a;
        border-radius: 50%;
        background-color:rgba(235, 245, 255, 1);
        position:absolute;
        top: 605*@a;
        left: 905*@a;
    }
    .circle2{
        width: 208*@a;
        height: 208*@a;
        border-radius: 50%;
        background-color:rgba(71, 145, 255, 1);
        position:absolute;
        top: 562*@a;
        left: 992*@a;
        z-index: 2;
    }
    .circle3{
        width: 174*@a;
        height: 174*@a;
        border-radius: 50%;
        background-color:rgba(30, 111, 255, 1);
        position:absolute;
        top: 551*@a;
        left: 1096*@a;
    }
}

</style>