<template>
<!-- 介绍页 -->
<div class="wrapper" v-if="jump===1">
     <div class="circle-wrapper">
        <div class="headcircle"></div>
     </div> -->
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
<div class="wrapper extrachange" v-if="jump===2">
    <img src="/tangible.png" class="pic1">  
       <div class="topbox">
        <h2 class="top_title">{{top.title}}</h2>
        <h5 class="top_sectitle">{{top.sec_title}}</h5>
        <div class="para_wrapper">
           <p class="top_para">{{top.para1}}</p>
           <p class="top_para">{{top.para2}}</p>
           <p class="top_para">{{top.para3}}</p>
        </div>
       </div>
       <!-- 滚动条 -->
        <div class="zhedang" ></div>
        <div class="progress" @click="scrollTo($event)">
            <div class="outer-thumb" ref="thumb" >
                <div class="bluebcg"  :style="{height:`${bluebcg_height}px`}"></div>
            </div>
            <div class="text" ref="text">0%</div>
        </div>
       <div class="content" ref="content" @scroll="onScroll($event)">
        <!-- 进度条 -->
            <div class="main" v-for="item of questionList" :key="item.id" >
                <div class="questiontitle"  ref="questiontitle"   :style="{border:`${item.titleBorder}px solid red`}">{{item.questiontitle}}
                   <p class="scoretips">可支配分数
                     <span class="score">{{item.score}}</span>
                   </p>
                </div>
                <div class="questionList" v-for="(elem,index) of item.question" :key="index">
                    {{elem.detail}}
                        <div class="slide" :style="{backgroundColor:`${item.bcg}`}">
                            <div class="Gradient" :style="{ width:`${(elem.value)*40}px` }"></div>
                            <div class="bar1" @click="distributeScore(elem,item,0)"></div>
                            <div class="bar2" @click="distributeScore(elem,item,1)"></div>
                            <div class="bar3" @click="distributeScore(elem,item,2)"></div>
                            <div class="bar4" @click="distributeScore(elem,item,3)"></div>
                            <div class="bar5" @click="distributeScore(elem,item,4)"></div>
                            <div class="bar6" @click="distributeScore(elem,item,5)"></div>
                            <div class="bar7" @click="distributeScore(elem,item,6)"></div>
                            <div class="bar8" @click="distributeScore(elem,item,7)"></div>
                            <div class="bar9" @click="distributeScore(elem,item,8)"></div>
                            <div class="bar10" @click="distributeScore(elem,item,9)"></div>
                            <div class="bar11" @click="distributeScore(elem,item,10)"></div>
                            <img class="thumb" :style="{ left: `${-6 + (elem.value) * 40}px`}"  :src="elem.value===0 ? item.silderSrc : '/blue.png' ">	
                            <span class="edit"  v-show="!elem.isEdit" @click="editHandle(elem,index)">{{elem.value}}<img src="/icon-edit.png"></span>
                            <input class="editinput" type="text" v-show="elem.isEdit" @blur="editHandle2(elem,item,$event)"  @keydown.enter="editHandle2(elem,item,$event)"  :value="elem.value" ref="myRef">
                    </div>                          
                </div>
            </div>
           <el-button type="primary" class="submit" @click="toFinish()">提交问卷</el-button>
       </div>
    </div>                   

<!-- 问卷完成部分 -->
<div class="finish-wrapper" v-if="jump===3">
     <div class="innerbox">
        <div class="finish-title">
           <h2>您已完成</h2>
           <h3>贝尔宾团队角色理论<br>-团队角色自测问卷</h3>
           <p>感谢您的答题，本次问卷已全部结束</p>
        </div>
      <el-button type="primary" class="finish-submit">完成答题</el-button>
     </div>
</div>
</template>

<script setup>
import { ref, computed, reactive, watch, onMounted, nextTick,onBeforeUnmount,toRef } from 'vue';
// 介绍部分的静态数据
const survey3 = {
    info_title1 : '贝尔宾团队角色理论',
    info_title2 :'-团队角色自测问卷',
    info_sec_title : '问卷介绍：',
    info_para1 : '对下列问题的回答，可能在不同程度上描绘了您的行为。每题有8句话，请将10分分配给这8个句子。',
    info_para2 : '分配的原则是：最体现您行为的句子分最高，以此类推。最极端的情况可能是10分全部分配给其中一句话。请根据您的实际情',
    info_para3: '况填入您每题的分数，系统会自动计算出每个角色的得分。得分最高的2-3个角色便是您的团队角色。',
    btn_info:'开始问卷'
}

// 跳转：介绍页==>答题页
let jump = ref(1);
function toContent(){
    jump.value = 2;
}

// 跳转：答题页==>完成页
function toFinish() {
    let flag = true;
    const uncomplete = [];
    questionList.forEach(item => {
        item.titleBorder = 0;
        if (item.score !== 0) {
            flag = false;
            uncomplete.push(item.id);   
            item.titleBorder = 1;
        }
    });
    console.log(uncomplete);
    console.log(questiontitle.value[0].offsetTop);
    
    let fisrtreturn = uncomplete[0] - 1;
    if (uncomplete.length) {
        content.value.scrollTop = questiontitle.value[fisrtreturn].offsetTop;
    }
   
   if(!flag) return
    jump.value = 3;

}

const questiontitle = ref(null);


// 答题部分的静态数据
 const top = {
    title: '贝尔宾团队角色理论-团队角色自测问卷',
    sec_title: '问卷介绍：',
    para1: '对下列问题的回答，可能在不同程度上描绘了您的行为。每题有8句话，请将10分分配给这8个句子。',
    para2:'分配的原则是：最体现您行为的句子分最高，以此类推。最极端的情况可能是10分全部分配给其中一句话。请根据您的实际情况填入您每题的分数，系统会自动计算出每个角色的得分。得分最高的2-3个角色',
    para3:'便是您的团队角色。'
}
  
// 问卷数据
const questionList = reactive([
    {
        id: 1,
        questiontitle: '一、我认为我能为团队做出的贡献是：',
        question: [
            {
                detail: 'A. 我能很快地发现并把握住新的机遇。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'B. 我能与各种类型的人一起合作共事。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'C. 我生来就爱出主意。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'D. 我的能力在于，一旦发现某些对实现集体目标很有价值的人，我就及时把他们推荐出来',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'E. 我能把事情办成，这主要靠我个人的实力。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'F.如果最终能导致有益的结果，我愿面对暂时的冷遇。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'G. 我通常能意识到什么是现实的，什么是可能的。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'H. 在选择行动方案时，我能不带倾向性，也不带偏见地提出一个合理的方案。',
                value: 0,
                isEdit: false,
            }],
        score: 10,
     // slider的背景颜色
        bcg: '#f5f5f5',
    //滑块的样式
        silderSrc: '/blue.png',
        titleBorder:0
    },
    {
        id: 2,
        questiontitle: '二、在团队中，我可能有的弱点是：',
        question: [
            {
                detail: 'A.如果会议没有得到很好的组织、控制和主持，我会感到不痛快。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'B.我容易对那些有高见而又没有适当地发表出来的人表现得过于宽容。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'C.只要集体在讨论新的观点，我总是说的太多。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'D.我的客观算法，使我很难与同事们打成一片。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'E.在一定要把事情办成的情况下，我有时使人感到特别强硬以至专断。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'F.可能由于我过分重视集体的气氛，我发现自己很难与众不同。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'G.我易于陷入突发的想象之中，而忘了正在进行的事情。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'H.我的同事认为我过分注意细节，总有不必要的担心，怕把事情搞糟。',
                value: 0,
                isEdit: false,
            }],
        score: 10,
     // slider的背景颜色
        bcg: '#f5f5f5',
    //滑块的样式
        silderSrc: '/blue.png',
        titleBorder:0
    },
    {
        id: 3,
            questiontitle: '三、当我与其他人共同进行一项工作时：',
        question: [
            {
                detail: 'A.我有在不施加任何压力的情况下，去影响其他人的能力。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'B.我随时注意防止粗心和工作中的疏忽。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'C.我愿意施加压力以换取行动，确保会议不是在浪费时间或离题太远。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'D.在提出独到见解方面，我是数一数二的。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'E.对于与大家共同利益有关的积极建议我总是乐于支持的。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'F.我热衷寻求最新的思想和新的发展。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'G.我相信我的判断能力有助于做出正确的决策。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'H.我能使人放心的是，对那些最基本的工作，我都能组织得“井井有条”。',
                value: 0,
                isEdit: false,
            }],
        score: 10,
     // slider的背景颜色
        bcg: '#f5f5f5',
    //滑块的样式
        silderSrc: '/blue.png',
        titleBorder:0
        
    },
    {
        id: 4,
        questiontitle: '四、我在工作团队中的特征是：',
        question: [
            {
                detail: 'A.我有兴趣更多地了解我的同事。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'B.我经常向别人的见解进行挑战或坚持自己的意见。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'C.在辩论中，我通常能找到论据去推翻那些不甚有理的主张。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'D.我认为，只要计划必须开始执行，我有推动工作运转的才能。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'E. 我有意避免使自己太突出或出人意料。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'F.对承担的任何工作，我都能做到尽善尽美。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'G. 我乐于与工作团队以外的人进行联系。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'H. 尽管我对所有的观点都感兴趣，但这并不影响我在必要的时候下决心。',
                value: 0,
                isEdit: false,
            }],
        score: 10,
     // slider的背景颜色
        bcg: '#f5f5f5',
    //滑块的样式
        silderSrc: '/blue.png',
        titleBorder:0
    },
    {
        id: 5,
        questiontitle: '五、在工作中，我得到满足，因为：',
        question: [
            {
                detail: 'A. 我喜欢分析情况，权衡所有可能的选择。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'B. 我对寻找解决问题的可行方案感兴趣。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'C. 我感到，我在促进良好的工作关系。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'D. 我能对决策有强烈的影响。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'E. 我能适应那些有新意的人。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'F.我能使人们在某项必要的行动上达成一致意见。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'G. 我感到我的身上有一种能使我全身心地投入到工作中去的气质。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'H. 我很高兴能找到一块可以发挥我想象力的天地。',
                value: 0,
                isEdit: false,
            }],
        score: 10,
     // slider的背景颜色
        bcg: '#f5f5f5',
    //滑块的样式
        silderSrc: '/blue.png',
        titleBorder:0
    },
    {
        id: 6,
        questiontitle: '六、如果突然给我一件困难的工作，而且时间有限，人员不熟：',
        question: [
            {
                detail: 'A. 在有新方案之前，我宁愿先躲进角落，拟定出一个解脱困境的方案。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'B. 我比较愿意与那些表现出积极态度的人一道工作。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'C. 我会设想通过用人所长的方法来减轻工作负担。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'D. 我天生的紧迫感，将有助于我们不会落在计划后面。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'E. 我认为我能保持头脑冷静，富有条理地思考问题。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'F.尽管困难重重，我也能保证目标始终如一。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'G. 如果集体工作没有进展，我会采取积极措施去加以推动。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'H. 我愿意展开广泛的讨论意在激发新思想，推动工作。',
                value: 0,
                isEdit: false,
            }],
        score: 10,
     // slider的背景颜色
        bcg: '#f5f5f5',
    //滑块的样式
        silderSrc: '/blue.png',
        titleBorder:0
    },
    {
        id: 7,
        questiontitle: '七、对于那些在团队工作中或与周围人共事时所遇到的问题：',
        question: [
            {
                detail: 'A. 我很容易对那些阻碍前进的人表现出不耐烦。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'B. 别人可能批评我太重分析而缺少直觉。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'C. 我有做好工作的愿望，能确保工作的持续进展。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'D. 我常常容易产生厌烦感，需要一、二个有激情的人使我振作起来。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'E. 如果目标不明确， 让我起步是很困难的。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'F.对于我遇到的复杂问题，我有时不善于加以解释和澄清。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'G. 对于那些我不能做的事，我有意识地求助于他人。',
                value: 0,
                isEdit: false,
            },
            {
                detail: 'H. 当我与真正的对立面发生冲突时，我没有把握使对方理解我的观点。',
                value: 0,
                isEdit: false,
            }],
        score: 10,
     // slider的背景颜色
        bcg: '#f5f5f5',
    //滑块的样式
        silderSrc: '/blue.png',
        titleBorder:0
    },
]);


// 分配分数
function distributeScore(elem, item, num){
     let newValue = num;
     let oldValue = elem.value
    if (item.score <= 0) {
        if (oldValue <= newValue) {
            return  
        } 
    }
    if (item.score < (newValue - oldValue)) return;

      elem.value = num;
      item.score = 10;
      item.question.forEach(e => {
        item.score -= e.value;
      });
    //   按照分数，如果分配完了背景颜色改变
    if (item.score === 0) {
        item.bcg = '#e5e5e5';
        item.silderSrc = '/disable.png';
    }
    if (item.score > 0) {
        item.bcg = '#f5f5f5';
        item.silderSrc = '/blue.png';
    }
    // console.log(elem.value);
    //  console.log(-6+(elem.value)*40);
     
     
}
const myRef = ref(null);

// 切换至编辑
function editHandle(elem, index) {
    elem.isEdit = true;
    // 默认获取焦点
    nextTick(() => {
      myRef.value[index].focus()
    });

}

// 编辑状态保存分数
function editHandle2(elem,item, e) {
       elem.isEdit = false;
    if (isNaN(e.target.value) || e.target.value > 10 || e.target.value < 0) {
        alert('分数仅限定在0~10之间');
        return
    } 
   distributeScore(elem,item,e.target.value)
}

const thumb = ref(null);
const text = ref(null);
const content = ref(null);
// 滚动条的蓝色背景
// const bluebcg = ref(null);
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
    text.value.innerHTML = `${Math.ceil((content.value.scrollTop / scrollDistence.value) * 100)} %`
    temp = thumb.value.style.top.split("");
    temp.pop();
    temp.pop();
    temp = temp.join("") / 1 + 8;
    bluebcg_height.value= temp;
}

// 点击提交后的判断逻辑




</script>

<style scoped lang='less'>
@a:1px;
// 供调用
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
// 供调用
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

// 介绍页面部分
.wrapper{
    width: 1190*@a;
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
    box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.1);
    z-index: 10;
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
        top: 0px;
        right:0*@a;
        object-fit: contain;
        transform: scale(1.07);
        z-index: 11000;
        background-color: white;
        border: none;
        outline: none;
        
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
        bottom: -20*@a;
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
        right:-25.4px;
    }
}


// 答题内容部分
// 头部的文字解释
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

 //  遮挡原来的
.zhedang{
        position: absolute;
        right: 7px;
        background-color: white;
        width: 10px;
        height: 500px;
        z-index: 10;
        bottom: 0;
}

//   滚动条
 .progress{
        position: absolute;
        z-index: 1;
        height: 300px;
        width: 8px;
        bottom: 65px;
        right:35px;
        border-radius: 5px;
        background-color: rgba(204, 204, 204, 1);
        cursor: pointer;
            .outer-thumb{
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
                &::before{
                    content: '';
                    width: 100%;
                    height: 100%;
                    border-radius: 5px;
                    position: absolute;
                    background-color: rgba(255, 255, 255, 1);
                    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
                }
                .bluebcg{
                    background-color: #4791ff;
                    width: 8px;
                    position: absolute;
                    bottom: 8px;
                    height: 200px;
                    left: 2px;
                    z-index: -99;
                    border-radius: 5px;
                    pointer-events: none;
                }
          }
          .text{
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
}

// 问卷题目内容部分
.content{
    position: absolute;
    top: 200px;
    left: 50px;
    width: 1155px;
    height: 350px;
    overflow: auto;
    .main{
        background-color: white;
        height: 300px;
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
            top: 0px;
            margin-left: 3px;
         }
        .scoretips{
            font-family: '思源黑体';
            text-align: center;
            // transform: translateY(5px);
            height: 26px;
            line-height: 26px;
            transform: translateX(-35px);
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
            right: 30px;
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
        .Gradient{
            width: 0px;
            height: 8px;
            background: linear-gradient(90deg, rgba(194, 225, 254, 1) 0%, #78a5f1 100%);
            position: absolute;
            left: 0;
            z-index: 9;
            pointer-events: none;
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
            img.thumb {
                position: absolute;
                // z-index: 2;
                bottom: -2px;
                // left: calc(0px - @thumbSize/2); //thumbSize=24px
                height: @thumbSize;
                width: @thumbSize;
                object-fit: cover;
                // border-radius: 5px;
                transition: all 0.2s linear;
                z-index: 10;
                // &::before {
                //     content: '';
                //     position: absolute;
                //     top: calc((@thumbSize - 7px)/2);
                //     left: calc((@thumbSize - 6px)/2);
                //     height: 6px;
                //     width: 1px;
                //     background-color: rgb(255, 255, 255);
                // }

                // &::after {
                //     content: '';
                //     position: absolute;
                //     top: calc((@thumbSize - 7px)/2);
                //     left: calc((@thumbSize + 5px)/2);
                //     height:6px;
                //     width: 1px;
                //     background-color: rgb(255, 255, 255);
                // }
            }
            .edit{
                display: inline-block;
                width: 24px;
                height: 14px;
                position: absolute;
                right: -40px;
                bottom:0px;
                cursor: pointer;
                font-size: 10px;
                color:rgba(140, 140, 140, 1);
                display: flex;
                text-align: left;
                justify-content: space-between;
                img{
                    width: 16px;
                    height: 16px;
                }
            }
              .editinput{
                  width: 24px;
                  height: 16px;
                  outline: none;
                  border: #4791ff 1px solid;
                   text-align: center;
                  color: rgba(140, 140, 140, 1);;
                  position: absolute;
                  right: -42px;
                  bottom: 0px;      
                }
        }

    }
    
// 问卷内容完成提交按钮
    .submit{
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 180px;
        height: 40px;
        background-color: rgba(30, 111, 255, 1);
        margin-top: 40px;
        &:hover{
            background-color: #4791ff;
        }
        &:active{
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
div.extrachange{
    width: 1210px;
}




// 完成问卷页面的样式
.finish-wrapper{
    width: 100%;
    height: 100%;
    // background-color: pink;
    .innerbox{
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
      .finish-title{
        width: 365px;
        height: 190px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: center;
         h2{
            font-family: '思源黑体';
            font-size: 36px;
            font-weight: 500;
            letter-spacing: 0px;
            line-height: 44px;
            margin-left: -18px;
            &::after{
                content: '✔';
                color:white;
                font-size: 24px;
                width:36px;
                height:36px;
                background: radial-gradient(104.2% 104.2%, rgba(30, 111, 255, 1) 0%, rgba(170, 203, 255, 1) 100%);
                border-radius: 50%;
                position: absolute;
                margin-left:8px;
                top: 5px;
                text-align: center;
                line-height: 36px;
            }
         }
         h3{
            font-family: '思源黑体';
            font-size: 36px;
            font-weight: 500;
            letter-spacing: 0px;
            line-height: 44px;
            color: rgba(30, 111, 255, 1);
         }
         p{
            font-family: '思源黑体';
            font-size: 20px;
            font-weight: 400;
            letter-spacing: 0px;
            line-height: 28px;
            color: rgba(0, 0, 0, 1);
            text-align: center;
         }
      }
       .finish-submit{
        width: 180px;
        height: 45px;
        background-color: rgba(30, 111, 255, 1);
        margin-top: 40px;
        &:hover{
            background-color: #4791ff;
        }
        &:active{
            background-color: #0f52d9;
        }
       }
    }

}

</style>
