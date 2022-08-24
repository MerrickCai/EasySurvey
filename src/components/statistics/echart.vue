<template>
  <div class="echartall">
    <div class="userlist">
      <div class="list_title">用户列表</div>
      <el-scrollbar max-height="400px">
        <p v-for="item in count" :key="item" class="scrollbar-demo-item">
          {{ item }}
        </p>
      </el-scrollbar>
    </div>
    <div class="userarea"></div>
    <div class="sta_one">
      <div class="echart_mes" id="echart_mes" ref="echart_mes"></div>
      <div id="myChartpie" class="myChartpie"></div>
    </div>
    <div
      class="echart_compare"
      id="echart_compare"
      @dragover.prevent
      @drop.prevent="drop($event)"
    ></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import draggable from "vuedraggable";
import mitter from "../../mitt";
import { onMounted, ref, reactive } from "vue";
//路由
import { useRouter } from "vue-router";
const router = useRouter();
const count = ref(5);

function drop(event) {
  console.log(event.target);
  event.preventDefault();
  if (event.target.className === "echart_compare") {
    console.log("完成");
  }
}

//第一个echart
onMounted(() => {
  //需要获取到element,所以是onMounted的Hook
  let myChart = echarts.init(document.getElementById("echart_mes"));
  let myChartpie = echarts.init(document.getElementById("myChartpie"));

  let json = reactive([
    {
      x: 1,
      y: 50,
    },
    {
      x: 2,
      y: 66,
    },
    {
      x: 3,
      y: 20,
    },
    {
      x: 4,
      y: 92,
    },
    {
      x: 5,
      y: 70,
    },
  ]);
  let xDataArr = reactive([]);
  let yDataArr = reactive([]);

  for (let i = 0; i < json.length; i++) {
    xDataArr.push(json[i].x);
    yDataArr.push(json[i].y);
  }
  // let xDataArr = reactive(["12-3", "12-4", "12-5", "12-6", "12-7", "12-8"]);
  // let yDataArr = reactive([5, 20, 36, 10, 10, 20]);
  // 绘制柱状图表
  myChart.setOption({
    title: { text: "总用户量" },
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
            line: "image:///line.png",
            bar: "image:///column.png",
          },
          onmouseover: function () {
            icon.line = "image:///sum.png";
            line.color = "red";
          },
        },

        myTool1: {
          show: true,
          title: "切换为饼图",
          icon: "image:///pancake.png",

          onclick: function () {
            let echart_mes = document.getElementById("echart_mes");
            let myChartpie2 = document.getElementById("myChartpie");
            echart_mes.style.display = "none";
            myChartpie2.style.display = "block";
          },
        },
        myTool2: {
          show: true,
          title: "切换为横向柱状图",
          icon: "image:///row.png",
          onclick: function () {
            series: [
              {
                type: "pie",
                data: [
                  {
                    value: json.y,
                    name: json.x,
                  },
                ],
              },
            ];
          },
        },
      },
      emphasis: {
        color: "red",
      },
    },
    xAxis: {
      data: xDataArr,
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
          icon: "image:///column.png",
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
          icon: "image:///line.png",
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
          icon: "image:///pancake.png",
          onclick: function () {
            let echart_mes = document.getElementById("echart_mes");
            let myChartpie2 = document.getElementById("myChartpie");
            echart_mes.style.display = "none";
            myChartpie2.style.display = "block";
          },
        },
        myTool2: {
          show: true,
          title: "切换为横向柱状图",
          icon: "image:///row.png",
          onclick: function () {},
        },
      },
    },
    series: [
      {
        name: "用户量",
        type: "pie",
        data: [
          {
            value: 50,
            name: 1,
          },
          {
            value: 66,
            name: 2,
          },
          {
            value: 20,
            name: 3,
          },
          {
            value: 92,
            name: 4,
          },
          {
            value: 70,
            name: 5,
          },
        ],
      },
    ],
  });
  // window.onresize = function () {
  //   //自适应大小
  //   myChart.resize();
  // };
});
</script>

<style lang="less" scoped>
.echartall {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(15, 50px);
  grid-template-rows: 240px 190px;
  grid-auto-flow: column;
  grid-auto-flow: column dense;
  .userlist {
    padding: 16px;
    grid-column-start: 1;
    grid-column-end: 8;
    grid-row-start: 1;
    grid-row-end: 2;
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

      .el-scrollbar__bar {
        width: 8px;
        position: absolute;
        right: 0;
      }
    }
  }
  .userarea {
    grid-column-start: 8;
    grid-column-end: 13;
    grid-row-start: 1;
    grid-row-end: 2;
    background-color: orange;
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

  .echart_compare {
    width: 390px;
    height: 220px;
    grid-column-start: 7;
    grid-column-end: 13;
    grid-row-start: 2;
    grid-row-end: 3;
    background-color: white;
    box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.1);
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
}
</style>