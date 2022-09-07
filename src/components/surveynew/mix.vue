<template>
  <li>


    <div class="itemnav">
      <select name="" class="type" @change="typechange(index)">
        <option>单选</option>
        <option>多选</option>
        <option>文本</option>
      </select>
      <i class="additem" @click="addamount(), updatescroll()">+</i>
      <i class="delitem" @click="deleteamount(quesitem.id)" ref="deletematrix" @mousemove="cursorfail">×</i>
    </div>


    <div class="questitle">
      <span>{{ mixfile.indexOf(quesitem) + 1 }}</span>
      <el-input v-model="quesitem.question.detail" autosize type="textarea" placeholder="请输入题目标题" />
    </div>


    <template v-if="titletype=='单选'">
      <div class="quesbox radiotype">
        <el-scrollbar>
          <p class="optionall" v-for="(con, index) in quesitem.options">
            <span class="circle"></span>
            <input type="text" ref="optiontitle" placeholder="请输入选项内容" v-model="con.detail"
              @blur="optionshow[index] = false" @keyup.enter="optionshow[index] = false" />
            <i class="deloption" @click="deleoption(index, con)" ref="deleteo" @mousemove="opcursorfail">×</i>
          </p>
          <p class="addoption">
            <i class="additem" @click="addaoption()">+</i>
            <span>添加选项</span>
          </p>
        </el-scrollbar>
      </div>
    </template>


    <template v-else-if="titletype=='多选'">
      <div class="quesbox checkboxtype">
        <el-scrollbar>
          <p class="optionall" v-for="(con, i) in quesitem.options">
            <span class="fang"></span>
            <input type="text" ref="optiontitle" v-model="con.detail" placeholder="请输入选项内容"
              @blur="optionshow[i] = false" @keyup.enter="optionshow[i] = false" />
            <i class="deloption" @click="deleoption(i)" ref="deleteo" @mousemove="opcursorfail">×</i>
          </p>
          <p class="addoption">
            <i class="additem" @click="addaoption()">+</i>
            <span>添加选项</span>
          </p>
        </el-scrollbar>
      </div>
    </template>


    <template v-else>
      <div class="quesbox texttype">
        <p class="quesarea"></p>
      </div>
    </template>


  </li>
</template>

<script setup>
import { ref, nextTick, inject, reactive, onMounted } from "vue";
import { nanoid } from "nanoid";
const props = defineProps(["quesitem", "mixfile", "mixreceive", "mixdeleteques", "index"]);
let titletype = ref('单选')
//
onMounted(() => {
  var selecttype = document.getElementsByTagName('select')
  selecttype[props.index].options[props.quesitem.question.type].selected = true
  titletype.value = selecttype[props.index].options[props.quesitem.question.type].text
})

//存储选项
var option = []
function typechange(index) {

  var obj = document.getElementsByTagName('select')
  console.log(obj);
  //obj.selectedIndex为选中的option的索引,obj.options[obj.selectedIndex].text为选中的文本
  titletype.value = obj[index].options[obj[index].selectedIndex].text
  props.quesitem.question.type = obj[index].selectedIndex
  if (obj[index].selectedIndex == 2) {
    option.splice(0, option.length)
    props.quesitem.options.forEach((item) => {
      option.push(JSON.parse(JSON.stringify(item)))
    })
    delete props.quesitem.options
  }
  if ((obj[index].selectedIndex == 0 || obj[index].selectedIndex == 1) && !props.quesitem.options) {
    props.quesitem.options = option
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
//次级题目
const value1 = ref(true);
//题目标题
// let questitle = ref(null);
// let questitleshow = ref(true);
// function changeqlshow() {
//   questitleshow.value = false;
//   nextTick(() => {
//     questitle.value.focus();
//   });
// }
//选项题目标题
let optiontitle = ref([]);
let optionshow = ref([]);

function optionsshow(index, con) {
  optionshow.value[index] = true;
  nextTick(() => {
    optiontitle.value[index].focus();
  });
}
//添加选项
function addaoption() {
  props.quesitem.options.push({ detail: "" });
}
function deleoption(id, con) {
  console.log(con);
  if (props.quesitem.options.length != 1) {
    props.quesitem.options.splice(id, 1);
  }
  console.log(props.quesitem);
}
</script>

<style lang="less" scoped>
li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

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

  div.questitle {
    display: flex;
    height: auto;
    width: 100%;
    padding: 5px;

    span {
      font-size: 16px;
      font-weight: 500;
      margin-right: 5px;
      color: rgba(0, 0, 0, 1);
    }

    >div.el-textarea {
      display: block;

      :deep(textarea) {
        display: block;
        height: auto;
        width: 100%;
        height: auto;
        font-size: 15px;
        color: #000000;
        outline: none;
        resize: none;
        border: none;
        padding: 5px;
        box-shadow: none;

        &:focus {
          box-shadow: 0 0 0 1px rgba(71, 145, 255, 1);
        }
      }
    }
  }

  >.quesbox {
    display: block;
    height: auto;
    width: 100%;
  }

  .el-scrollbar {
    width: 100%;
    --el-scrollbar-opacity: 0.3;
    --el-scrollbar-bg-color: rgba(71, 145, 255, 1);
    --el-scrollbar-hover-opacity: 0.5;
    --el-scrollbar-hover-bg-color: rgba(71, 145, 255, 1);

    .el-scrollbar__bar {
      width: 8px;
      position: absolute;
      right: 0;
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
        -moz-appearance: none;
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