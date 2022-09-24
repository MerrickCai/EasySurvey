<template>
  <li>
    <div class="itemnav">

      <select name="" class="type" @change="typechange(index)">
        <option>单选</option>
        <option>多选</option>
        <option>文本</option>
      </select>
      <span class="additem" @click="addamount(), updatescroll()">+</span>
      <span class="delitem" @click="deleteamount(quesitem.id)" ref="deletematrix" @mousemove="cursorfail">×</span>

    </div>


    <div class="questitle">
      <span>{{ content.mixfile.indexOf(quesitem) + 1 }}</span>
      <el-input v-model="quesitem.question.detail" autosize type="textarea" placeholder="请输入题目" />
    </div>


    <template v-if="titletype=='单选'">
      <div class="quesbox radiotype">
        <p class="optionall" v-for="(con, index) in quesitem.options">
          <span class="circle"></span>
          <el-input type="textarea" autosize placeholder="请输入选项内容" v-model="con.detail" />
          <span class="deloption" @click="deleoption(index, con)" ref="deleteo">×</span>
        </p>
        <p class="addoption" @click="addaoption()">
        <div class="additem">+</div>
        <span>添加选项</span>
        </p>
      </div>
    </template>


    <template v-else-if="titletype=='多选'">
      <div class="quesbox checkboxtype">
        <p class="optionall" v-for="(con, i) in quesitem.options">
          <span class="fang"></span>
          <el-input type="textarea" autosize v-model="con.detail" placeholder="请输入选项内容" />
          <span class="deloption" @click="deleoption(i)" ref="deleteo">×</span>
        </p>
        <p class="addoption" @click="addaoption()">
        <div class="additem">+</div>
        <span>添加选项</span>
        </p>
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
import { ref, inject, onMounted } from "vue";
import { nanoid } from "nanoid";

const props = defineProps(["quesitem", "content", "index"]);
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
  //obj.selectedIndex为选中的option的索引,obj.options[obj.selectedIndex].text为选中的文本
  titletype.value = obj[index].options[obj[index].selectedIndex].text
  props.quesitem.question.type = obj[index].selectedIndex
  // 问卷类型为文本类型,删去次级选项的键值
  if (obj[index].selectedIndex == 2) {
    option.splice(0, option.length)
    //储存主题目中单选和多选原写下的题目，使得切换到文本再切换回去后不会丢失
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
let { updatescroll } = inject("changescroll");
//添加问题
function addamount() {
  const quesobj = {
    id: nanoid(),
    question: { detail: "", type: 0 },
    options: [{ detail: "" }],
  };
  props.content.mixfile.push(quesobj);
}
//删除问题
let deletematrix = ref(null);
function cursorfail() {
  if (props.content.mixfile.length == 1) {
    deletematrix.value.style.cursor = "not-allowed";
  }
  if (props.content.mixfile.length != 1) {
    deletematrix.value.style.cursor = "pointer";
  }
}
function deleteamount(id) {
  if (props.content.mixfile.length != 1) {
    ElMessageBox.confirm(
      '确定删除吗?',
      '删除题目',
      {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
      .then(() => {
        props.content.mixfile.splice(props.index, 1)
      })
      .catch(() => {
      })
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
  } else {
    ElMessage({
      message: '无法删除',
      type: 'warning',
      duration: 3000,
      showClose: true,
      center: true
    })
  }

}
</script>

<style lang="less" scoped>
li {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 30px;

  .itemnav {
    display: flex;
    align-items: center;
    width: 100%;
    height: 30px;
    position: relative;

    .type {
      width: 60px;
      height: 24px;
      margin-left: 0px;
      text-align: center;
      line-height: 24px;
      font-size: 14px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(217, 217, 217, 1);
    }

    span {
      cursor: pointer;
      position: absolute;
      display: block;
      height: 20px;
      width: 20px;
      text-align: center;
      line-height: 20px;
      font-size: 20px;
      font-weight: bold;
      color: rgba(30, 111, 255, 1);

      &.additem {
        font-size: 24px;
        right: 70px;
      }

      &.delitem {
        right: 30px;
      }
    }
  }

  div.questitle {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: auto;
    width: 100%;
    padding: 5px;
    border: 1px solid transparent;

    &:hover {
      border: 1px dashed rgba(30, 111, 255, 1);
    }

    span {
      display: block;
      height: auto;
      width: auto;
      font-size: 16px;
      margin-right: 5px;
      color: rgba(0, 0, 0, 1);
    }

    >div.el-textarea {
      flex: 1;
      display: block;
      height: auto;
      width: auto;


      :deep(textarea) {
        display: block;
        height: auto;
        width: 100%;
        font-size: 16px;
        color: rgb(0, 0, 0);
        outline: none;
        resize: none;
        border: none;
        box-shadow: none;
        padding: 0;
        overflow: hidden;
      }
    }
  }

  >.quesbox {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: auto;
    width: calc(100% - 10px);
    margin: 10px 0;

    .optionall {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      height: auto;
      width: 100%;

      .circle {
        display: block;
        width: 14px;
        height: 14px;
        border: 1px solid rgb(202, 202, 202);
        border-radius: 50%;
        margin-right: 5px;
      }

      .fang {
        width: 14px;
        height: 14px;
        border: 1px solid rgba(217, 217, 217, 1);
        margin-right: 5px;
      }

      >div.el-textarea {

        flex: 1;
        display: block;
        height: auto;
        width: auto;


        :deep(textarea) {
          display: block;
          height: auto;
          width: 100%;
          font-size: 16px;
          color: rgb(0, 0, 0);
          outline: none;
          resize: none;
          border: none;
          box-shadow: none;
          padding: 0;
          overflow: hidden;
        }
      }

      .deloption {
        cursor: pointer;
        display: block;
        height: 20px;
        width: 20px;
        text-align: center;
        line-height: 20px;
        font-size: 20px;
        font-weight: bold;
        color: rgba(30, 111, 255, 1);
      }
    }

    .addoption {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      height: auto;
      width: 100%;
      margin-top: 10px;
      cursor: pointer;

      .additem {
        cursor: pointer;
        display: block;
        height: 20px;
        width: 20px;
        text-align: center;
        line-height: 20px;
        font-size: 20px;
        font-weight: bold;
        color: #1e6fff;
      }

      span {
        flex: 1;
        display: block;
        height: auto;
        width: auto;
      }
    }

    .quesarea {
      height: 30px;
      margin-left: 34px;
      border: 1px solid rgba(217, 217, 217, 1);
      margin-bottom: 20px;
    }
  }
}
</style>