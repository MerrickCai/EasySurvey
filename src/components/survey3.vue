<template>
  <div class="wrapper">
     <div class="circle-wrapper">
        <div class="headcircle"></div>
     </div>
    <img src="/tangible.png" class="pic1">  
    <h2 class="title">{{survey3.info_title1}}<br>{{survey3.info_title2}}</h2>
    <p class="second-title">{{survey3.info_sec_title}}</p>
    <p class="para">{{survey3.info_para1}}<br><br>{{survey3.info_para2}}<br>{{survey3.info_para3}}</p>
    <el-button type="primary" class="btn">{{survey3.btn_info}}</el-button>
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="circle3"></div>
  </div>
</template>

<script setup>
const survey3 = {
    info_title1 : '贝尔宾团队角色理论',
    info_title2 :'-团队角色自测问卷',
    info_sec_title : '问卷介绍：',
    info_para1 : '对下列问题的回答，可能在不同程度上描绘了您的行为。每题有8句话，请将10分分配给这8个句子。',
    info_para2 : '分配的原则是：最体现您行为的句子分最高，以此类推。最极端的情况可能是10分全部分配给其中一句话。请根据您的实际情',
    info_para3: '况填入您每题的分数，系统会自动计算出每个角色的得分。得分最高的2-3个角色便是您的团队角色。',
    btn_info:'开始问卷'
 }
</script>

<style scoped lang='less'>
@a:1px;
.wrapper{
    width: 1180*@a;
    height: 810*@a;
    background-color: #fff;
    position: relative;
    left: -3*@a;
    right: 0;
    // top:100*@a; 
    margin:auto;
    box-sizing: border-box;
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
        font-family: '思源黑体';
        font-size: 36*@a;
        font-weight: 500;
        letter-spacing: 0*@a;
        line-height: 44*@a;
        text-align: center;
        vertical-align: middle;
        position: absolute;
        top: 70*@a;
        left: 0;
        right: 0;
        margin: auto;
    }
    .second-title{
        font-family: '思源黑体';
        font-size: 20*@a;
        font-weight: 500;
        letter-spacing: 0*@a;
        line-height: 24*@a;
        color: rgba(30, 111, 255, 1);
        text-align: left;
        vertical-align: middle;
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
</style>
