<template>
  <li>
    <!-- 题目最上方 -->
    <p class="itemnav">
      <select name="" class="type" @change="typechange(index)">
        <option>单选</option>
        <option>多选</option>
        <option>文本</option>
      </select>
      <i class="additem" @click="addamount(), updatescroll()">+</i>
      <i
        class="delitem"
        @click="deleteamount(quesitem.id)"
        ref="deletematrix"
        @mousemove="cursorfail"
        >×</i
      >
    </p>
    <!-- 主题目 -->
    <p class="questitle">
      <span>{{ mixfile.indexOf(quesitem) + 1 }}</span>
      <textarea
      type="text"
        v-model="quesitem.question.detail"
        placeholder="请输入题目标题">
       
      </textarea>
    </p>
    <!-- 次级单选 -->
    <div class="radiotype" v-if="titletype=='单选'">
      <p class="optionall" v-for="(con, index) in quesitem.options">
        <span class="circle"></span>
        <input
          type="text"
          placeholder="请输入题目标题"
          v-model="con.detail"
        />
        <i
          class="deloption"
          @click="deleoption(index, con)"
          >×</i
        >
      </p>
      <p class="addoption">
        <i class="additem" @click="addaoption()">+</i>
        <span>添加选项</span>
      </p>
    </div>
    <!-- 次级多选 -->
    <div class="checkboxtype" v-if="titletype=='多选'">
      <p class="optionall" v-for="(con, i) in quesitem.options">
        <span class="fang"></span>
        <input
          type="text"
          v-model="con.detail"
          placeholder="请输入题目标题"
        />
        <i
          class="deloption"
          @click="deleoption(i)"
          >×</i
        >
      </p>
      <p class="addoption">
        <i class="additem" @click="addaoption()">+</i>
        <span>添加选项</span>
      </p>
  </div>
  <!-- 次级文本 -->
    <div class="texttype" v-if="titletype=='文本'">
    <p class="quesarea"></p></div>

  </li>
</template>

<script setup>
import { ref, nextTick, inject, reactive, onMounted } from "vue";
import { nanoid } from "nanoid";
const props = defineProps(["quesitem", "mixfile", "mixreceive", "mixdeleteques","index"]);
let titletype=ref('单选')
//
onMounted(()=>{
  // 用于保存了题目后再次切换回创建问卷单选和多选的类型不会出错

  var selecttype=document.getElementsByTagName('select')
  //使下拉框处的选项按题目的type类型定义
  selecttype[props.index].options[props.quesitem.question.type].selected=true
  //使创建的问卷类型的次级选项显现
  titletype.value=selecttype[props.index].options[props.quesitem.question.type].text
})

//存储选项
var option=[]
function typechange(index) {
    
    var obj=document.getElementsByTagName('select')
    //obj.selectedIndex为选中的option的索引,obj.options[obj.selectedIndex].text为选中的文本
    titletype.value=obj[index].options[obj[index].selectedIndex].text
    props.quesitem.question.type=obj[index].selectedIndex
    // 问卷类型为文本类型,删去次级选项的键值
    if(obj[index].selectedIndex==2) {
      option.splice(0,option.length)
      //储存主题目中单选和多选原写下的题目，使得切换到文本再切换回去后不会丢失
      props.quesitem.options.forEach((item)=>{
        option.push(JSON.parse(JSON.stringify(item)))
      })
     delete props.quesitem.options
    }
    if((obj[index].selectedIndex==0||obj[index].selectedIndex==1)&&!props.quesitem.options){
      props.quesitem.options=option
    }
}
//鼠标滚轮在添加新题目时滑动到底部
let { scroll, updatescroll } = inject("changescroll");
//添加问题
function addamount() {
  const quesobj = {
    id: nanoid(),
    question: { detail: "", type: 0 },
    options: [{ detail: "" }],
  };
  props.mixreceive(quesobj);
}
//删除问题
let deletematrix = ref(null);
function cursorfail() {
  if (props.mixfile.length == 1) {
    deletematrix.value.style.cursor = "not-allowed";
  }
  if (props.mixfile.length != 1) {
    deletematrix.value.style.cursor = "pointer";
  }
}
function deleteamount(id) {
  if (props.mixfile.length != 1) {
    props.mixdeleteques(id);
  }
}

//添加次级选项
function addaoption() {
  props.quesitem.options.push({ detail: "" });
}
// 删除次级选项
function deleoption(id, con) {
  if (props.quesitem.options.length != 1) {
    props.quesitem.options.splice(id, 1);
  }

}
</script>

<style lang="less" scoped>
li {
//   height: 200px;
  // box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.25);

  .itemnav {
    display: flex;
    align-items: center;
    width: 100%;
    height: 30px;
    position: relative;
    #type {
      width: 60px;
      height: 24px;
      margin: 0 34px;
      text-align: center;
      line-height: 24px;
      opacity: 1;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(217, 217, 217, 1);
    }
    i {
      font-style: normal;
    }
    .additem {
      cursor: pointer;
      position: absolute;
      right: 70px;
      font-size: 25px;
      font-weight: 400;
      color: rgba(30, 111, 255, 1);
    }
    .delitem {
      cursor: pointer;
      position: absolute;
      right: 30px;
      font-size: 25px;
      font-weight: 400;
      color: rgba(30, 111, 255, 1);
    }
  }
  .questitle {
    display: flex;
    margin: 5px 40px 5px 39px;
    font-size: 16px;
    font-weight: 500;
    border: 1px solid transparent;
    color: rgba(0, 0, 0, 1);
    word-wrap: break-word; //超出页面自动换行
    &:hover {
      border: 1px dashed rgba(30, 111, 255, 1);
    }
    // .titlecon {
    //   width: 700px;
    //   height: fit-content;
    //   margin-left: 5px;
    // }
    // input[type="text"] {
    //   /* 清除原有input样式 */
    //   -web-kit-appearance: none;
    //   -moz-appearance: none;
    //   outline: 0;
    //   /* 设置我们要的样式 */
    //   width: 700px;
    //   height: 20px;
    //   opacity: 1;
    //   text-align: left;
    //   border: none;
    //   margin-left: 5px;
    //   margin-top: 3px;
    // }
    textarea {
      -web-kit-appearance: none;
      outline: 0;

      width: 700px;
      // height: 20px;
      opacity: 1;
      text-align: left;
      border: none;
      margin-left: 5px;
      margin-top: 3px;
      resize: none;
      // overflow: hidden;
}
  }
    .optionall {
      display: flex;
      height: 20px;
      height: fit-content;
      margin: 5px 0 5px 37px;
      .circle {
        width: 18px;
        height: 18px;
        border: 2px solid rgba(217, 217, 217, 1);
        border-radius: 100%;
      }
       .fang {
        width: 18px;
        height: 18px;
        border: 2px solid rgba(217, 217, 217, 1);
      }
      .option {
        display: block;
        width: 500px;
        height: fit-content;
        word-wrap: break-word; //超出页面自动换行

        margin-left: 5px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
      input[type="text"] {
        /* 清除原有input样式 */
        -web-kit-appearance: none;
        // -moz-appearance: none;
        outline: 0;
        /* 设置我们要的样式 */
        width: 700px;
        height: 20px;
        opacity: 1;
        text-align: left;
        border: none;
        margin-left: 5px;
      }
      .deloption {
        cursor: pointer;
        font-size: 20px;
        font-weight: 400;
        color: rgba(30, 111, 255, 1);
        font-style: normal;
      }
    }
  
  .addoption {
    display: flex;
    .additem {
      cursor: pointer;
      margin-left: 37px;
      font-size: 25px;
      font-weight: 400;
      color: rgba(30, 111, 255, 1);
      font-style: normal;
    }
    span {
      cursor: default;
      margin-top: 10px;
      margin-left: 10px;
      opacity: 1;
      text-align: left;
      border-width: 0;
    }
  }


    .quesarea {
    width: 600px;
    height: 30px;
    margin-left: 34px;
    border: 1px solid rgba(217, 217, 217, 1);
    margin-bottom: 20px;
  }
   
}
</style>