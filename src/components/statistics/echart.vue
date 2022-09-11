<template>

  <div class="echartall">
    <!-- 用户列表 -->

    <div class="userlist">
      <div class="list_title">用户列表</div>
      <template v-if="usershow">
        <el-button class="exportData" type="primary" @click="exportData()">导出问卷信息</el-button>
        <el-scrollbar max-height="400px">
          <p v-for="(item,index) in filenews.context.userWithScores" :key="item.user" class="scrollbar-demo-item">
            <span class="username">{{ item.user.phone_number }}</span>
            <span class="userscore">得分: {{ item.score }}</span>
            <span class="userdetail" @click="showDetail(item.user.id,filenews.context.questionnaire.id)">详情</span>
            <span class="userdel" @click="deluser(item.user.id,filenews.context.questionnaire.id,index)">删除</span>
          </p>
        </el-scrollbar>
      </template>
      <template v-else>
        <div class="usershow">
          <div>
            <span class="pic"></span>
            <span class="wscore">得分:</span>
            <span class="grey"></span>
          </div>
          <div>
            <span class="pic"></span>
            <span class="wscore">得分:</span>
            <span class="grey"></span>
          </div>
          <div>
            <span class="pic"></span>
            <span class="wscore">得分:</span>
            <span class="grey"></span>
          </div>
          <div>
            <span class="pic"></span>
            <span class="wscore">得分:</span>
            <span class="grey"></span>
          </div>

        </div>
      </template>
      <!-- 详情页 -->
      <div class="detail" v-if="showdetail">
        <span class="cancel" @click="showdetail=false">X</span>
        <component :is="currentView" :survey-obj="surveydatas.data"></component>
      </div>
    </div>
    <!-- 用户地区 -->
    <template v-if="usershow">
      <div class="userarea">
        <div class="echart_user" id="echart_user"></div>
        <div id="userpie" class="userpie"></div>
      </div>
    </template>


    <template v-else>
      <div class="areashow">
        <div class="areahead">
          <span>用户群体</span>
          <div>
            <img src="/img/pancake.png" alt="">
            <img src="/img/row.png" alt="">
            <img src="/img/column.png" alt="">
            <img src="/img/line.png" alt="">
          </div>
        </div>
        <img src="/img/pan.png" alt="">
      </div>
    </template>
    <!-- 分数区间 -->
    <template v-if="usershow">
      <div class="sta_one">
        <div class="echart_mes" id="echart_mes" ref="echart_mes"></div>
        <div id="myChartpie" class="myChartpie"></div>
      </div>
    </template>
    <template v-else>
      <div class="scoreshow">
        <div class="scorehead">
          <span>分数区间</span>
          <div>
            <img src="/img/pancake.png" alt="">
            <img src="/img/row.png" alt="">
            <img src="/img/column.png" alt="">
            <img src="/img/line.png" alt="">
          </div>
        </div>
        <img src="/img/score.png" alt="">
      </div>
    </template>

    <!-- 问卷对比 -->
    <div class="echart_compare" id="echart_compare" @dragover.prevent @drop.prevent="drop($event)">
      <img src="/img/compare.png" alt="" />
      <span>+</span>
      <i>快将同类型问卷拖入此处对比问卷吧！</i>
    </div>
  </div>




</template>

<script setup>
import survey1 from "../surveyTemplate_min/survey1_.min.vue";
import survey2 from "../surveyTemplate_min/survey2_.min.vue";
import survey3 from "../surveyTemplate_min/survey3_.min.vue";
import survey4 from "../surveyTemplate_min/survey4_.min.vue";
import survey5 from "../surveyTemplate_min/survey5_.min.vue";
import surveyComplex from '../surveyTemplate_min/surveyComplex_min.vue';

import * as echarts from "echarts";
import draggable from "vuedraggable";
import emitter from "../../mitt/mitt.js";
import { onMounted, ref, reactive, watch, computed, nextTick } from "vue";
//路由
import { useRouter } from "vue-router";
//Stores
import { useStore } from "../../Stores/index.js";
import axios from "axios";
const datas = useStore();
const router = useRouter();

//用户列表有数据
let usershow = ref(false)
let areashow = ref(false)

console.log(usershow.value);
//拖拽
function drop(event) {
  console.log(event.target);
  event.preventDefault();
  if (event.target.className === "echart_compare") {
    console.log("完成");
  }
}

//接收确定是哪一份问卷
let num = ref("");
emitter.on("filenum", (e) => {
  num.value = e;
});
watch(num, (newnum) => {
  getfile();
});

let filenews = reactive({
  context: { questionnaire: { totalNumber: 0, effectiveNumber: 0 } },
});

let detail = reactive({});
function getfile() {
  axios({
    url: `https://q.denglu1.cn/user/questionnaireDetail/${parseInt(num.value)}`,
    method: "get",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
    headers: { token: datas.user.token },
  })
    .then((response) => {
      console.log(response);
      filenews.context = response.data.data;
      detail.context = response.data.data
      //用户列表显示
      if (filenews.context.userWithScores != null) {
        usershow.value = true
        areashow.value = true

      }
      console.log(usershow.value);
    })
    .catch((error) => {
      console.log(error);
    });
}

function echartupdate() {
  let userChart = echarts.init(document.getElementById("echart_user"));
  let userChartpie = echarts.init(document.getElementById("userpie"));
  let province = reactive([]);
  let pro = reactive([])
  let pronum = reactive([])
  const provincenum = new Map();
  if (filenews.context.userWithScores != null) {
    for (let i = 0; i < filenews.context.userWithScores.length; i++) {
      if (provincenum.has(filenews.context.userWithScores[i].user.province)) {
        provincenum.set(filenews.context.userWithScores[i].user.province, provincenum.get(filenews.context.userWithScores[i].user.province) + 1)
      } else {
        provincenum.set(filenews.context.userWithScores[i].user.province, 1)
      }

    }
    for (let value of provincenum.keys()) {
      let piedata = {};
      piedata["name"] = value;
      piedata["value"] = provincenum.get(value);
      province.push(piedata);
      pro.push(value)
      pronum.push(provincenum.get(value))
    }
  }
  userChart.setOption({
    title: { text: "用户群体" },
    tooltip: {},
    toolbox: {
      feature: {
        saveAsImage: {
          iconStyle: {
            borderColor: "rbg(217, 217, 217)",
          },
        },
        magicType: {
          type: ["bar", "line"],
          icon: {
            line: "image:///img/line.png",
            bar: "image:///img/column.png",
          },
          onmouseover: function () {
            icon.line = "image:///img/sum.png";
            line.color = "red";
          },
        },

        myTool1: {
          show: true,
          title: "切换为饼图",
          icon: "image:///img/pancake.png",

          onclick: function () {
            let echart_mes = document.getElementById("echart_user");
            let myChartpie2 = document.getElementById("userpie");
            echart_mes.style.display = "none";
            myChartpie2.style.display = "block";
          },
        },
        // myTool2: {
        //   show: true,
        //   title: "切换为横向柱状图",
        //   icon: "image:///img/row.png",
        //   onclick: function () {
        //     series: [
        //       {
        //         type: "pie",
        //         data: province,
        //       },
        //     ];
        //   },
        // },
      },
      emphasis: {
        color: "red",
      },
    },
    xAxis: {
      data: pro,
      axisLabel: {
        rotate: 45,
      },
    },
    yAxis: {},
    series: [
      {
        name: "个数",
        type: "bar",
        data: pronum,
        label: {
          show: true,
          position: "top",
        },
      },
    ],
  });
  //绘制饼状图表
  userChartpie.setOption({
    title: { text: "总用户量" },
    tooltip: {},
    toolbox: {
      feature: {
        saveAsImage: {
          iconStyle: {
            borderColor: "rbg(217, 217, 217)",
          },
        },
        myTool3: {
          show: true,
          title: "切换为柱状图",
          icon: "image:///img/column.png",
          onclick: function () {
            let echart_mes = document.getElementById("echart_user");
            let myChartpie2 = document.getElementById("userpie");
            echart_mes.style.display = "block";
            myChartpie2.style.display = "none";
          },
        },
        myTool4: {
          show: true,
          title: "切换为折线图",
          icon: "image:///img/line.png",
          onclick: function () {
            let echart_mes = document.getElementById("echart_user");
            let myChartpie2 = document.getElementById("userpie");
            echart_mes.style.display = "block";
            myChartpie2.style.display = "none";
          },
        },
        myTool1: {
          show: true,
          title: "切换为饼图",
          icon: "image:///img/pancake.png",
          onclick: function () {
            let echart_mes = document.getElementById("echart_user");
            let myChartpie2 = document.getElementById("userpie");
            echart_mes.style.display = "none";
            myChartpie2.style.display = "block";
          },
        },
        // myTool2: {
        //   show: true,
        //   title: "切换为横向柱状图",
        //   icon: "image:///img/row.png",
        //   onclick: function () {},
        // },
      },
    },
    series: [
      {
        name: "用户量",
        type: "pie",
        data: province,
      },
    ],
  });
}
watch(
  () => filenews.context,
  () => {
    if (filenews.context.userWithScores != null) {
      console.log(1);
      nextTick(() => {
        echartupdate();
        echartnum();
      })
    }
  },
  { deep: true }
);
function echartnum() {
  let myChart = echarts.init(document.getElementById("echart_mes"));
  let myChartpie = echarts.init(document.getElementById("myChartpie"));
  let yDataArr = reactive([0, 0, 0, 0, 0]);
  if (filenews.context.userWithScores != null) {
    for (let i = 0; i < filenews.context.userWithScores.length; i++) {
      if (
        filenews.context.userWithScores[i].score >= 0 &&
        filenews.context.userWithScores[i].score < 50
      ) {
        yDataArr[0]++;
      }
      if (
        filenews.context.userWithScores[i].score >= 50 &&
        filenews.context.userWithScores[i].score < 100
      ) {
        yDataArr[1]++;
      }
      if (
        filenews.context.userWithScores[i].score >= 100 &&
        filenews.context.userWithScores[i].score < 150
      ) {
        yDataArr[2]++;
      }
      if (
        filenews.context.userWithScores[i].score >= 150 &&
        filenews.context.userWithScores[i].score < 200
      ) {
        yDataArr[3]++;
      }
      if (
        filenews.context.userWithScores[i].score >= 200 &&
        filenews.context.userWithScores[i].score < 250
      ) {
        yDataArr[4]++;
      }
    }
  }
  let xDataArr = reactive(["0~50", "50~100", "100~150", "150~200", "200~250"]);
  // 绘制柱状图表
  myChart.setOption({
    title: { text: "分数区间" },
    tooltip: {},
    toolbox: {
      feature: {
        saveAsImage: {
          iconStyle: {
            borderColor: "rbg(217, 217, 217)",
          },
        },
        magicType: {
          type: ["bar", "line"],
          icon: {
            line: "image:///img/line.png",
            bar: "image:///img/column.png",
          },
          onmouseover: function () {
            icon.line = "image:///img/sum.png";
            line.color = "red";
          },
        },

        myTool1: {
          show: true,
          title: "切换为饼图",
          icon: "image:///img/pancake.png",

          onclick: function () {
            let echart_mes = document.getElementById("echart_mes");
            let myChartpie2 = document.getElementById("myChartpie");
            echart_mes.style.display = "none";
            myChartpie2.style.display = "block";
          },
        },
        // myTool2: {
        //   show: true,
        //   title: "切换为横向柱状图",
        //   icon: "image:///img/row.png",
        //   onclick: function () {
        //     series: [
        //       {
        //         type: "pie",
        //         data: [
        //           {
        //             value: json.y,
        //             name: json.x,
        //           },
        //         ],
        //       },
        //     ];
        //   },
        // },
      },
      emphasis: {
        color: "red",
      },
    },
    xAxis: {
      data: xDataArr,
      axisLabel: {
        rotate: 45,
      },
    },
    yAxis: {},
    series: [
      {
        name: "用户量",
        type: "bar",
        data: yDataArr,
        label: {
          show: true,
          position: "top",
        },
      },
    ],
  });
  //绘制饼状图表
  myChartpie.setOption({
    title: { text: "总用户量" },
    tooltip: {},
    toolbox: {
      feature: {
        saveAsImage: {
          iconStyle: {
            borderColor: "rbg(217, 217, 217)",
          },
        },
        myTool3: {
          show: true,
          title: "切换为柱状图",
          icon: "image:///img/column.png",
          onclick: function () {
            let echart_mes = document.getElementById("echart_mes");
            let myChartpie2 = document.getElementById("myChartpie");
            echart_mes.style.display = "block";
            myChartpie2.style.display = "none";
          },
        },
        myTool4: {
          show: true,
          title: "切换为折线图",
          icon: "image:///img/line.png",
          onclick: function () {
            let echart_mes = document.getElementById("echart_mes");
            let myChartpie2 = document.getElementById("myChartpie");
            echart_mes.style.display = "block";
            myChartpie2.style.display = "none";
          },
        },
        myTool1: {
          show: true,
          title: "切换为饼图",
          icon: "image:///img/pancake.png",
          onclick: function () {
            let echart_mes = document.getElementById("echart_mes");
            let myChartpie2 = document.getElementById("myChartpie");
            echart_mes.style.display = "none";
            myChartpie2.style.display = "block";
          },
        },
        // myTool2: {
        //   show: true,
        //   title: "切换为横向柱状图",
        //   icon: "image:///img/row.png",
        //   onclick: function () {},
        // },
      },
    },
    series: [
      {
        name: "用户量",
        type: "pie",
        data: [
          {
            value: yDataArr[0],
            name: xDataArr[0],
          },
          {
            value: yDataArr[1],
            name: xDataArr[1],
          },
          {
            value: yDataArr[2],
            name: xDataArr[2],
          },
          {
            value: yDataArr[3],
            name: xDataArr[3],
          },
          {
            value: yDataArr[4],
            name: xDataArr[4],
          },
        ],
      },
    ],
  });
}
//第一个echart



// 详情页
let showdetail = ref(false);
const viewId = ref(0)
const surveyTemplateList = [survey1, survey2, survey3, survey4, survey5, surveyComplex];
const currentView = computed(() => surveyTemplateList[viewId.value - 1]);

let surveydatas = reactive({});
surveydatas.data = {};
// 展示详情页
function showDetail(userId, questionnaireId) {
  let count = ref(detail.context.questionnaire.count)
  switch (count.value) {
    case 0: //单选
      viewId.value = 3
      break
    case 1: //多选
      viewId.value = 4
      break
    case 2: //矩阵
      viewId.value = 1
      break
    case 3: //量表
      viewId.value = 2
      break
    case 4: //文本
      viewId.value = 5
      break
    case 5: //混合
      viewId.value = 6
  }
  // console.log(userId,questionnaireId);

  axios({
    url: `https://q.denglu1.cn/user/AnswerDetail/${userId}/${questionnaireId}`,
    method: 'get',
    withCredentials: true,
    headers: { 'token': datas.user.token },

  }).then((response) => {
    // console.log(response);
    surveydatas.data = response.data.data;
    console.log('参数', surveydatas.data);

    showdetail.value = true;

  }).catch((error) => {
    console.log(error)
  })

}


//删除用户作答
function deluser(userid, fileid, index) {
  if (!confirm('是否要删除该用户的作答记录？')) return;
  axios({
    url: `https://q.denglu1.cn/deleteUserAnswer/${userid}/${fileid}`,
    method: "get",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
    headers: { token: datas.user.token },
  })
    .then((response) => {
      console.log(response);
      filenews.context.userWithScores.splice(index, 1)
      emitter.emit("change")
    })
    .catch((error) => {
      console.log(error);
    });
}



// 导出excel表格
function exportData() {
  axios({
    url: `https://q.denglu1.cn/user/export`,
    method: 'get',
    withCredentials: true,
    headers: { token: datas.user.token },
    params: {
      'questionnaire_id': filenews.context.questionnaire.id,
      'excelName': filenews.context.questionnaire.title
    },
  }).then((response) => {
    console.log(filenews.context.questionnaire.id);
    console.log(filenews.context.questionnaire.title);
    console.log(response);
  }).catch((error) => {
    console.log(filenews.context.questionnaire.id);
    console.log(filenews.context.questionnaire.title);
    console.log(error);
  });
}
</script>

<style lang="less" scoped>
.echartall {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(15, 50px);
  grid-template-rows: 240px 190px;
  grid-auto-flow: column;
  grid-auto-flow: column dense;

  // transform: translateX(370px);
  .userlist {
    position: relative;
    padding: 16px;
    grid-column-start: 1;
    grid-column-end: 8;
    grid-row-start: 1;
    grid-row-end: 2;
    box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.1);

    .list_title {
      text-align: left;
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 16px;
    }

    .el-scrollbar {
      width: 430px;
      height: 160px;

      --el-scrollbar-opacity: 0.3;
      --el-scrollbar-bg-color: rgba(71, 145, 255, 1);
      --el-scrollbar-hover-opacity: 0.5;
      --el-scrollbar-hover-bg-color: rgba(71, 145, 255, 1);

      .scrollbar-demo-item {
        position: relative;

        &:hover {
          box-shadow: 0px 8px 30px 0px rgba(73, 107, 158, 0.1);
        }

        &:hover .userdetail,
        &:hover .userdel {
          display: block;
        }

        .username {
          position: absolute;
          left: 0px;
        }

        .userscore {
          position: absolute;
          right: 100px;
          font-size: 10px;
          font-weight: 400;
          color: rgba(30, 111, 255, 1);
          text-align: left;
        }

        .userdetail {
          display: none;
          cursor: pointer;
          position: absolute;
          right: 46px;
          width: 36px;
          height: 20px;
          font-size: 10px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          opacity: 1;
          background: rgba(30, 111, 255, 1);
          border-radius: 5px;
        }

        .userdel {
          display: none;
          cursor: pointer;
          position: absolute;
          right: 0px;
          width: 36px;
          height: 20px;
          font-size: 10px;
          font-weight: 400;
          color: rgba(30, 111, 255, 1);
          opacity: 1;
          margin-left: 8px;
          border: 1px solid rgba(217, 217, 217, 1);
          border-radius: 5px;
        }
      }

      .el-scrollbar__bar {
        width: 8px;
        position: absolute;
        right: 0;
      }
    }

    //用户列表最初
    .usershow {
      >div {
        position: relative;
        width: 317px;
        height: 40px;

        >span.pic {
          position: absolute;
          left: 13px;
          top: 8px;
          width: 24px;
          height: 24px;
          opacity: 1;
          background: rgba(235, 245, 255, 1);
          border-radius: 100%;
        }

        >span.wscore {
          position: absolute;
          left: 98px;
          top: 9px;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0px;
          line-height: 20px;
          color: rgba(30, 111, 255, 1);
          text-align: left;
          vertical-align: top;
        }

        >span.grey {
          position: absolute;
          left: 142px;
          top: 16px;
          width: 32px;
          height: 8px;
          opacity: 1;
          border-radius: 4px;
          background: rgba(240, 240, 240, 1);
        }
      }

    }

    // 详情页
    div.detail {
      width: 1150px;
      height: 600px;
      z-index: 10;
      background-color: white;
      border-radius: 5px;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      ;
      // opacity:.4;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      display: block;
      // transition: all .5s linear;
      overflow: auto;

      .cancel {
        position: absolute;
        right: 10px;
        top: 5px;
        font-size: 24px;
        color: black;
        cursor: pointer;
        z-index: 9999;
      }
    }
  }


  // 导出excel按钮
  .exportData {
    width: 100px;
    height: 30px;
    top: 15px;
    right: 20px;
    position: absolute;
  }
}

.userarea {
  position: relative;
  grid-column-start: 8;
  grid-column-end: 13;
  grid-row-start: 1;
  grid-row-end: 2;
  box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.1);

  .userareatit {
    position: absolute;
    left: 20px;
    top: 20px;
  }

  .echart_user {
    width: 330px;
    height: 240px;
  }

  .userpie {
    width: 330px;
    height: 240px;
    display: none;
  }
}

//地区最初
.areashow {
  position: relative;
  grid-column-start: 8;
  grid-column-end: 13;
  grid-row-start: 1;
  grid-row-end: 2;
  box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.1);

  >div.areahead {
    display: flex;
    justify-content: space-between;
    width: 300px;
    margin: 16px 30px 0 24px;

    >span {
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0px;
      line-height: 22px;
      color: rgba(0, 0, 0, 1);
      text-align: left;
      vertical-align: top;
    }

    >div>img {
      margin-right: 17px;
    }
  }

  >img {
    margin-top: 2px;
    margin-left: 39px;
  }

}


.sta_one {
  width: 390px;
  height: 220px;
  grid-column-start: 1;
  grid-column-end: 7;
  grid-row-start: 2;
  grid-row-end: 3;
  background-color: white;
  box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.1);

  .echart_mes {
    width: 390px;
    height: 220px;
  }

  .myChartpie {
    display: none;
    width: 390px;
    height: 220px;
  }
}

//分数区间最初
.scoreshow {
  position: relative;
  width: 390px;
  height: 220px;
  grid-column-start: 1;
  grid-column-end: 7;
  grid-row-start: 2;
  grid-row-end: 3;
  background-color: white;
  box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.1);

  >div.scorehead {
    display: flex;
    justify-content: space-between;
    width: 360px;
    margin: 16px 30px 0 24px;

    >span {
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0px;
      line-height: 22px;
      color: rgba(0, 0, 0, 1);
      text-align: left;
      vertical-align: top;
    }

    >div>img {
      margin-right: 17px;
    }
  }

  >img {
    margin-top: 2px;
    margin-left: 39px;
  }

}

.echart_compare {
  position: relative;
  width: 390px;
  height: 220px;
  grid-column-start: 7;
  grid-column-end: 13;
  grid-row-start: 2;
  grid-row-end: 3;
  background-color: white;
  box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.1);

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  span {
    position: absolute;
    bottom: 26px;
    left: 60px;
    font-size: 20px;
    color: rgba(71, 145, 255, 1);
  }

  i {
    font-style: normal;
    position: absolute;
    bottom: 30px;
    left: 80px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(217, 217, 217, 1);
    text-align: center;
  }
}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 37px;
  width: 370px;
  margin: 3px;
  text-align: center;
  border-radius: 4px;
}
</style>