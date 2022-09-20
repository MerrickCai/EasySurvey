<template>
  <div class="wrapper">

    <div class="decoration1"></div>
    <div class="decoration5"></div>
    <img dog-ear v-lazy="'/assets/tangible.png'" />


    <div class="container">
      <div class="title">

        <!-- 新建问卷标题 -->
        <input type="text" class="titlein" v-model="filetitle.info_title" 
          placeholder="请输入问卷标题" />
        <!-- 新建问卷介绍 -->
        <div class="newintro">
          <span class="newintro_title">问卷介绍：</span>
          <textarea cols="30" rows="5"  class="introin" v-model="filetitle.info_para"
            placeholder="为了使问卷调查结果更加清晰，准确，请输入关于问卷的简短介绍以及注意事项，方便填写问卷的人更清晰的认识问卷，字数少于500字"></textarea>
        </div>
      </div>
      <div class="quearea">
      <!-- 问卷类型选择标签 -->
        <div class="questype">
          <span class="typetitle">请选择问卷类型:</span>
          <span class="typeall">
            <span :class="{ typeclick: type == 6 }" @click="type = 6">普通问卷</span>
            <span :class="{ typeclick: type == 3 }" @click="type = 3">矩阵</span>
            <span :class="{ typeclick: type == 4 }" @click="type = 4">量表</span>
          </span>
        </div>

        <div class="quesList">
          <keep-alive>
            <component :is="typeview" :fileword="fileword" :receive="receive" :deleteques="deleteques"
              :scalefile="scalefile" :sreceive="sreceive" :sdeleteques="sdeleteques" :radiofile="radiofile"
              :rreceive="rreceive" :rdeleteques="rdeleteques" :checkboxfile="checkboxfile" :creceive="creceive"
              :cdeleteques="cdeleteques" :textfile="textfile" :treceive="treceive" :tdeleteques="tdeleteques"
              :mixfile="mixfile" :mixreceive="mixreceive" :mixdeleteques="mixdeleteques">
            </component>
          </keep-alive>
        </div>
      </div>

      <div class="buttonArea">
        <div button keep @click="keepinfor">保存</div>
        <div button push @click="pushfile($event)">发布问卷</div>
      </div>

      <div class="mask" :style="{ display: show }">
        <div class="sharefile">
          <span class="shareword">分享问卷</span>
          <span class="close" @click="disappear($event)">×</span>
          <qrcode-vue :value="linkqr" class="barcode" backgroundColor="blue" colorDark="blue"></qrcode-vue>
          <span class="sharequick">快分享以上二维码或点击复制<a class="link" @click="getlink">链接</a>填答问卷吧！</span>
        </div>
      </div>


      
    </div>
  </div>
</template>

<script setup>
import { nextTick, reactive, ref, provide, watch, computed, toRaw } from "vue";
import { nanoid } from "nanoid";
import radiolist from "../components/surveynew/radiolist.vue";
import checkboxlist from "../components/surveynew/checkboxlist.vue";
import matrixlist from "../components/surveynew/matrixlist.vue";
import scalelist from "../components/surveynew/scalelist.vue";
import textlist from "../components/surveynew/textlist.vue";
import mixlist from "../components/surveynew/mixlist.vue"
import { useStore } from "../Stores/pinia.js";
import axios from "axios";
import clipboard3 from "vue-clipboard3";
import QrcodeVue from "qrcode.vue";
import { ElMessage, ElMessageBox } from 'element-plus'
//数据
const datas = useStore();
//动态组件视图
let type = ref(6);
let typelist = [radiolist, checkboxlist, matrixlist, scalelist, textlist, mixlist];
let typeview = computed(() => typelist[type.value - 1]);
//添加题目滚轮滑到最下方
let scroll = ref(0);
function updatescroll() {
  scroll.value = scroll.value + 1;
}
provide("changescroll", {
  scroll,
  updatescroll,
});
watch(scroll, () => {
  let div = document.getElementsByClassName("quearea");
  nextTick(() => {
    div[0].scrollTop = div[0].scrollHeight;
  });
});
//问卷标题介绍

let filetitle;
if (localStorage.getItem("title")) {
  let title=JSON.parse(localStorage.getItem("title"))
  filetitle = reactive(title.title);
} else {
  filetitle = reactive({
    info_title: "",
    info_para:
      "",
  });
}
//存储矩阵问卷信息内容
let fileword;
if (localStorage.getItem("surveyData")) {
  let surveyData=JSON.parse(localStorage.getItem("surveyData"))
  fileword = reactive(Array.from(surveyData.matrix));
  console.log("fileword为",fileword);
} else {
  fileword = reactive([
    {
      question: { detail: "", type: 0 },
      options: [
        { detail: "" },
        { detail: "" },
        { detail: "" },
        { detail: "" },
        { detail: "" },
      ],
      id: nanoid(),
      series: 5,
    },
  ]);
}
//矩阵问卷新增问题
function receive(quesobj) {
  fileword.push(quesobj);
}
//矩阵问卷删除问题
function deleteques(id) {
  ElMessageBox.confirm(
    '确定删除吗?',
    '删除题目',
    {
      distinguishCancelAndClose: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    })
    .then(() => {
      fileword.map((i, x) => {
        if (i.id == id) fileword.splice(x, 1);
      });
    })
    .catch(() => {
    })
}

//存储量表问卷信息内容
let scalefile;
if (localStorage.getItem("surveyData")) {
  let surveyData=JSON.parse(localStorage.getItem("surveyData"))
  scalefile = reactive(surveyData.scale);
} else {
  scalefile = reactive([
    {
      options: [{ detail: "", dominate: 20 }],
      question: { detail: "", dominate: 60 },
      id: nanoid(),
      secscore: 20,
    },
  ]);
}
//量表问卷新增问题
function sreceive(quesobj) {
  scalefile.push(quesobj);
}
//量表问卷删除问题
function sdeleteques(id) {
  ElMessageBox.confirm(
    '确定删除吗?',
    '删除题目',
    {
      distinguishCancelAndClose: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    })
    .then(() => {
      scalefile.map((i, x) => {
        if (i.id == id) scalefile.splice(x, 1);
      });
    })
    .catch(() => {
    })
}

//存储单选问卷信息内容
let radiofile;
if (localStorage.getItem("radio")) {
  radiofile = reactive(JSON.parse(localStorage.getItem("radio")));
} else {
  radiofile = reactive([
    {
      options: [{ detail: "" }],
      question: { detail: "", type: 0 },
      id: nanoid(),
    },
  ]);
}
//单选问卷新增问题
function rreceive(quesobj) {
  radiofile.push(quesobj);
}
//单选问卷删除问题
function rdeleteques(id) {
  ElMessageBox.confirm(
    '确定删除吗?',
    '删除题目',
    {
      distinguishCancelAndClose: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    })
    .then(() => {
      radiofile.map((i, x) => {
        if (i.id == id) radiofile.splice(x, 1);
      });
    })
    .catch(() => {
    })
}

//存储多选问卷信息内容
let checkboxfile;
if (localStorage.getItem("checkbox")) {
  checkboxfile = reactive(JSON.parse(localStorage.getItem("checkbox")));
} else {
  checkboxfile = reactive([
    {
      options: [{ detail: "" }],
      question: { detail: "", type: 1 },
      id: nanoid(),
    },
  ]);
}
//多选问卷新增问题
function creceive(quesobj) {
  checkboxfile.push(quesobj);
  console.log(checkboxfile);
}
//多选问卷删除问题
function cdeleteques(id) {
  ElMessageBox.confirm(
    '确定删除吗?',
    '删除题目',
    {
      distinguishCancelAndClose: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    })
    .then(() => {
      checkboxfile.map((i, x) => {
        if (i.id == id) checkboxfile.splice(x, 1);
      });
    })
    .catch(() => {
    })
}

//存储文本问卷信息内容
let textfile;
if (localStorage.getItem("text")) {
  textfile = reactive(JSON.parse(localStorage.getItem("text")));
} else {
  textfile = reactive([
    {
      question: { detail: "", type: 2 },
      id: nanoid(),
    },
  ]);
}
//文本问卷新增问题
function treceive(quesobj) {
  textfile.push(quesobj);
}
//文本问卷删除问题
function tdeleteques(id) {
  ElMessageBox.confirm(
    '确定删除吗?',
    '删除题目',
    {
      distinguishCancelAndClose: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    })
    .then(() => {
      textfile.map((i, x) => {
        if (i.id == id) textfile.splice(x, 1);
      });
    })
    .catch(() => {
    })
}


//存储混合问卷信息内容
let mixfile
if (localStorage.getItem("surveyData")) {
  let surveyData=JSON.parse(localStorage.getItem("surveyData"))
  mixfile = reactive(surveyData.mix);
} else {
  mixfile = reactive([
    {
      options: [{ detail: "" }],
      question: { detail: "", type: 0 },
      id: nanoid(),
    },
  ]);
}
//混合问卷新增问题
function mixreceive(quesobj) {
  mixfile.push(quesobj);
}
//混合问卷删除问题
function mixdeleteques(id) {
  ElMessageBox.confirm(
    '确定删除吗?',
    '删除题目',
    {
      distinguishCancelAndClose: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    })
    .then(() => {
      mixfile.map((i, x) => {
        if (i.id == id) mixfile.splice(x, 1);
      });
    })
    .catch(() => {
    })
}
//保存问卷
function keepinfor() {
  localStorage.setItem("title", JSON.stringify({
    title:filetitle}));
  localStorage.setItem('surveyData',JSON.stringify({
    mix:mixfile,
    scale:scalefile,
    matrix:fileword,
  }))
  ElMessage({
    message: '保存成功!',
    type: 'success',
  })
}
//发布问卷
let show = ref("none");
async function pushfile() {
  //判断input是否填写
  let isover = false
  //判断textarea是否填写
  let isarea = false
  //判断题目选项是否填写
  let input = document.getElementsByTagName('input')
  // 将伪数组转换为数组
  let textarea = document.getElementsByTagName('textarea')
  let typearea = [].slice.call(textarea)
  //textarea未填写标红
  if (input[0].value == "") {
    input[0].style.borderColor = "red"
    isarea = false
  }
  else {
    input[0].style.borderColor = ""
    isarea = true
  }
  for (let i = 0; i < textarea.length; i++) {
    if (textarea[i].value == "") {
      textarea[i].style.border = "1px solid"
      textarea[i].style.borderColor = "red"
    }
    else {
      textarea[i].style.border = ""
      textarea[i].style.borderColor = ""
    }
  }
  //判断所有的input是否填写
  isover = typearea.every((element) => {
    return element.value != ""
  })
  if (isover == false || isarea == false){
     ElMessage({
    showClose: true,
    message: '请将标红处进行填写!',
    type: 'warning',
  })
    }
  if (isover == true && isarea == true) {
    if (type.value == 1) {
      radiofile.forEach((element) => delete element.id);
      await axios({
        url: "https://q.denglu1.cn/api/questions/rebuild",
        method: "post",
        withCredentials: true,
        headers: {
      "Content-Type": "application/json",
      token: await datas.getToken()
    },
        data: {
          questionnaire: {
            userId: datas.user.userId,
            totalNumber: 100,
            message: filetitle.info_para,
            title: filetitle.info_title,
            count: 0,
          },
          questionOptionList: JSON.parse(JSON.stringify(radiofile)),
        },
      })
        .then((response) => {
          console.log(response);
          link.value = response.data.data.link;
          linkqr.value =
            "https://q.denglu1.cn/survey/" +
            parseInt(link.value);
        })
        .catch((error) => {
          console.log(error);
        });
      localStorage.removeItem("radio");
      radiofile.splice(0, radiofile.length);
      radiofile.push({
        options: [{ detail: "" }],
        question: { detail: "", type: 1 },
        id: nanoid(),
      });
    }
    if (type.value == 2) {
      checkboxfile.forEach((element) => delete element.id);
      await axios({
        url: "https://q.denglu1.cn/api/questions/rebuild",
        method: "post",
        withCredentials: true,
        headers: {
      "Content-Type": "application/json",
      token: await datas.getToken()
    },
        data: {
          questionnaire: {
            userId: datas.user.userId,
            totalNumber: 100,
            message: filetitle.info_para,
            title: filetitle.info_title,
            count: 1,
          },
          questionOptionList: JSON.parse(JSON.stringify(checkboxfile)),
        },
      })
        .then((response) => {
          console.log(response);
          link.value = response.data.data.link;
          linkqr.value =
            "https://q.denglu1.cn/survey/" +
            parseInt(link.value);
        })
        .catch((error) => {
          console.log(error);
        });
      localStorage.removeItem("checkbox");
      checkboxfile.splice(0, checkboxfile.length);
      checkboxfile.push({
        options: [{ detail: "" }],
        question: { detail: "", type: 1 },
        id: nanoid(),
      });
    }
    if (type.value == 3) {
      fileword.forEach((element) => {
        delete element.id;
      });
      console.log(fileword);
      await axios({
        url: "https://q.denglu1.cn/api/questions/rebuild",
        method: "post",
        withCredentials: true,
        headers: {
      "Content-Type": "application/json",
      token: await datas.getToken()
    },
        data: {
          questionnaire: {
            userId: datas.user.userId,
            totalNumber: 100,
            message: filetitle.info_para,
            title: filetitle.info_title,
            count: 2,
          },
          questionOptionList: JSON.parse(JSON.stringify(fileword)),
        },
      })
        .then((response) => {
          console.log(response);
          link.value = response.data.data.link;
          linkqr.value =
            "https://q.denglu1.cn/survey/" +
            parseInt(link.value);
        })
        .catch((error) => {
          console.log(error);
        });
      localStorage.removeItem("surveyData");
      fileword.splice(0, fileword.length);
      fileword.push({
        options: [{ detail: "" }],
        question: { detail: "", type: 1 },
        id: nanoid(),
      });
    }
    if (type.value == 4) {
      scalefile.forEach((element) => {
        delete element.id;
        element.options.forEach((options) => {
          options.dominate = element.secscore;
        });
        // delete element.secscore;
      });
      await axios({
        url: "https://q.denglu1.cn/api/questions/rebuild",
        method: "post",
        withCredentials: true,
        headers: {
      "Content-Type": "application/json",
      token: await datas.getToken()
    },
        data: {
          questionnaire: {
            userId: datas.user.userId,
            totalNumber: 100,
            message: filetitle.info_para,
            title: filetitle.info_title,
            count: 3,
          },
          questionOptionList: JSON.parse(JSON.stringify(scalefile)),
        },
      })
        .then((response) => {
          console.log(response);
          link.value = response.data.data.link;
          linkqr.value =
            "https://q.denglu1.cn/survey/" +
            parseInt(link.value);
        })
        .catch((error) => {
          console.log(error);
        });
      localStorage.removeItem("surveyData");
      scalefile.splice(0, scalefile.length);
      scalefile.push({
        question: { detail: "", type: 1 },
        options: [{ detail: "", dominate: 20 }],
        id: nanoid(),
        dominate: 60,
        secscore: 20,
      });
    }
    if (type.value == 5) {
      textfile.forEach((element) => delete element.id);
      await axios({
        url: "https://q.denglu1.cn/api/questions/rebuild",
        method: "post",
        withCredentials: true,
        headers: {
      "Content-Type": "application/json",
      token: await datas.getToken()
    },
        data: {
          questionnaire: {
            userId: datas.user.userId,
            totalNumber: 100,
            message: filetitle.info_para,
            title: filetitle.info_title,
            count: 4,
          },
          questionOptionList: JSON.parse(JSON.stringify(textfile)),
        },
      })
        .then((response) => {
          console.log(response);
          link.value = response.data.data.link;
          linkqr.value =
            "https://q.denglu1.cn/survey/" +
            parseInt(link.value);
        })
        .catch((error) => {
          console.log(error);
        });
      localStorage.removeItem("text");
      textfile.splice(0, textfile.length);
      textfile.push({
        options: [{ detail: "" }],
        question: { detail: "", type: 2 },
        id: nanoid(),
      });
    }
    if (type.value == 6) {
      mixfile.forEach((element) => delete element.id);
      await axios({
        url: "https://q.denglu1.cn/api/questions/rebuild",
        method: "post",
        withCredentials: true,
        headers: {
      "Content-Type": "application/json",
      token: await datas.getToken()
    },
        data: {
          questionnaire: {
            userId: datas.user.userId,
            totalNumber: 100,
            message: filetitle.info_para,
            title: filetitle.info_title,
            count: 5,
          },
          questionOptionList: JSON.parse(JSON.stringify(mixfile)),
        },
      })
        .then((response) => {
          console.log(response);
          link.value = response.data.data.link;
          linkqr.value =
            "https://q.denglu1.cn/survey/" +
            parseInt(link.value);
        })
        .catch((error) => {
          console.log(error);
        });
      localStorage.removeItem("surveyData");
      mixfile.splice(0, mixfile.length);
      mixfile.push({
        options: [{ detail: "" }],
        question: { detail: "", type: 0 },
        id: nanoid(),
      });
    }
    //填完一份问卷后将题目介绍清空
  filetitle.info_title=""
  filetitle.info_para=""
    show.value = "block";
    localStorage.removeItem("title");
  }
}
let link = ref(1);
// 链接
let linkqr = ref(
  "https://q.denglu1.cn/survey/" +
  parseInt(link.value)

);
//二维码
const { toClipboard } = clipboard3();
async function getlink() {
  try {
    await toClipboard(linkqr.value);
    ElMessage({
      message: '链接复制成功!',
      type: 'success',
    })
  } catch (error) {
    ElMessage.error('链接复制失败!')
  }
}
//遮罩
function disappear() {
  show.value = "none";
}
</script>

<style lang="less" scoped>
div.wrapper {
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
  border-radius: 10px;
  box-shadow: 0px 5px 10px 0 rgba(73, 107, 158, 0.1);
  background-color: rgb(255, 255, 255);
  z-index: 0;

  >div.container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    >div.title {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      height: auto;
      width: 100%;

      >p.newtitle {
        display: block;
        width: auto;
        height: auto;
        font-size: 33px;
        font-weight: bold;
        color: rgb(0, 0, 0);
        position: relative;

        &::after {
          content: "";
          display: block;
          position: absolute;
          bottom: -2px;
          left: 0;
          height: 4px;
          width: 100%;
          background-color: #1e6fff;
          border-radius: 2px;
        }
      }

      >input.titlein {
        position: relative;
        display: block;
        width: 500px;
        height: auto;
        font-size: 33px;
        font-weight: bold;
        color: rgb(0, 0, 0);
        outline: 0;
        border: 1px dashed rgba(30, 111, 255, 1);
        text-align: center;

        &::after {
          content: "";
          display: block;
          position: absolute;
          bottom: -2px;
          left: 0;
          height: 4px;
          width: 100%;
          background-color: #1e6fff;
          border-radius: 2px;
        }
      }

      >div.newintro {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: flex-start;
        height: auto;
        width: 70%;
        margin-top: 5px;

        >span.newintro_title {
          display: block;
          font-size: 16px;
          color: rgba(30, 111, 255, 1);
          margin-bottom: 5px;
        }

        >p.newintro_con {
          display: block;
          height: auto;
          width: auto;
          font-size: 15px;
          color: rgb(0, 0, 0);
        }

        >textarea {
          display: block;
          height: auto;
          width: 100%;
          height: 100px;
          font-size: 15px;
          color: rgb(0, 0, 0);
          outline: none;
          resize: none;
          border: 1px dashed rgba(30, 111, 255, 1);
        }
      }
    }

    >div.quearea {
      flex: 1;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: flex-start;
      height: auto;
      width: 70%;
      margin-top: 5px;
      overflow: hidden;

      >div.questype {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        height: auto;
        width: 100%;
        margin-bottom: 5px;

        .typetitle {
          display: block;
          height: auto;
          width: auto;
          font-size: 16px;
          color: rgba(0, 0, 0, 1);
          position: relative;
          margin-right: 10px;

          &::after {
            content: "";
            display: block;
            position: absolute;
            bottom: -3px;
            left: 0;
            height: 2px;
            width: 100%;
            background-color: #1e6fff;
            border-radius: 5px;
          }
        }

        .typeall {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: flex-start;
          align-items: center;

          >span {
            display: block;
            width: 60px;
            height: 24px;
            margin-right: 10px;
            text-align: center;
            line-height: 24px;
            color: rgba(30, 111, 255, 1);
            font-size: 13px;
            box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.1);
            background-color: rgb(255, 255, 255);
            border-radius: 5px;
            cursor: pointer;

            &.typeclick {
              background: rgba(235, 245, 255, 1);
            }
          }
        }
      }

      >div.quesList {
        flex: 1;
        display: block;
        height: auto;
        width: 100%;
        overflow: auto;
      }
    }

    >div.buttonArea {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      height: auto;
      width: 100%;
      margin: 10px 0;

      >div[button] {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        width: 180px;
        height: 45px;
        cursor: pointer;
        font-size: 18px;
        border-radius: 10px;

        &[keep] {
          background-color: #ebf5ff;
          color: #8c8c8c;
          margin-right: 50px;
        }

        &[push] {
          background-color: rgba(30, 111, 255, 1);
          color: rgba(255, 255, 255, 1);
        }
      }
    }

    >div.mask {
      display: block;
      position: fixed;
      width: 100%;
      height: 100%;
      z-index: 3;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);

      .sharefile {
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 3;
        transform: translate(-50%, -50%);
        width: 440px;
        height: 380px;
        opacity: 1;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.1);

        .shareword {
          position: absolute;
          left: 40px;
          top: 40px;
          width: 82px;
          height: 32px;
          opacity: 1;
          /** 文本1 */
          font-size: 20px;
          font-weight: 500;
          letter-spacing: 0px;
          line-height: 28px;
          color: rgba(0, 0, 0, 1);
          text-align: left;
          vertical-align: top;
        }

        .close {
          cursor: pointer;
          position: absolute;
          right: 49px;
          top: 35px;
          width: 10px;
          height: 10px;
          opacity: 1;
          color: rgba(30, 111, 255, 1);
          font-size: 25px;
        }

        .barcode {
          position: absolute;
          top: 122px;
          left: 177px;
          width: 180px;
          height: 180px;
        }

        .sharequick {
          position: absolute;
          left: 83px;
          bottom: 54px;
          width: 300px;
          height: 24px;
          opacity: 1;
          /** 文本1 */
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0px;
          line-height: 22px;
          color: rgba(0, 0, 0, 1);

          .link {
            cursor: pointer;
            text-decoration-line: underline;
            color: rgba(71, 145, 255, 1);
          }
        }
      }
    }
  }

  >div.decoration1 {
    display: block;
    height: 400px;
    width: 400px;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background-color: rgba(235, 245, 255, 1);
    clip-path: polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%);
  }


  >div.decoration5 {
    display: block;
    height: calc(108px + 5px);
    width: calc(120px + 7px);
    position: absolute;
    z-index: 1;
    top: -5px;
    right: -7px;
    background-color: rgb(255, 255, 255, 1);
  }

  >img[dog-ear] {
    display: block;
    height: 108px;
    width: 120px;
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    object-fit: contain;
    transform: scale(1.07);
  }
}
</style>