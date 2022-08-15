<template>
  <div class="echartall">
    <div class="userlist">
      <div class="list_title">用户列表</div>
      <ul class="list_content"></ul>
    </div>
    <div class="echart_mes" id="echart_mes" ref="echart_mes"></div>
    <div class="echart_compare" id="echart_compare"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
// let Chartmes;
// function initEcharts() {
//   // 新建一个promise对象
//   let newPromise = new Promise((resolve) => {
//     resolve();
//   });
//   //然后异步执行echarts的初始化函数
//   newPromise.then(() => {
//     //	此dom为echarts图标展示dom
//     Chartmes = echarts.init(document.getElementById(".echart_mes"));
//   });
// }
//第一个echart
onMounted(() => {
  //需要获取到element,所以是onMounted的Hook
  let myChart = echarts.init(document.getElementById("echart_mes"));
  // 绘制图表
  myChart.setOption({
    title: { text: "总用户量" },
    tooltip: {},
    toolbox: {
      feature: {
        saveAsImage: {},
        magicType: {
          type: ["bar", "line"],
        },
      },
    },
    xAxis: {
      data: ["12-3", "12-4", "12-5", "12-6", "12-7", "12-8"],
    },
    yAxis: {},
    series: [
      {
        name: "用户量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
        label: {
          show: true,
          position: "top",
        },
      },
    ],
  });
  // window.onresize = function () {
  //   //自适应大小
  //   myChart.resize();
  // };
});

//第二个echart
onMounted(() => {
  //需要获取到element,所以是onMounted的Hook
  let echart_compare = echarts.init(document.getElementById("echart_compare"));
  // 绘制图表
  echart_compare.setOption({
    title: { text: "测试" },
    tooltip: {},
    toolbox: {
      feature: {
        saveAsImage: {},
        magicType: {
          type: ["bar", "line"],
        },
      },
    },
    legend: {
      data: ["1", "2"],
    },
    xAxis: {
      data: ["A", "B", "C", "D", "E"],
    },
    yAxis: {},
    series: [
      {
        name: "1",
        data: [10, 22, 28, 43, 49],
        type: "bar",
        label: {
          show: true,
          position: "top",
        },
      },
      {
        name: "2",
        data: [5, 4, 3, 5, 10],
        type: "bar",
        label: {
          show: true,
          position: "top",
        },
      },
    ],
  });
});
</script>

<style lang="less" scoped>
.echartall {
  width: 800px;
  height: 400px;
  background-color: red;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 390px 390px;
  grid-template-rows: 190px 190px;
  grid-auto-flow: column;
  grid-auto-flow: column dense;
  .userlist {
    padding: 16px;
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
    background-color: pink;
    .list_title {
      text-align: left;
      font-size: 14px;
      font-weight: bold;
    }
  }
  .echart_mes {
    width: 390px;
    height: 250px;
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 3;
    background-color: white;
  }
  .echart_compare {
    width: 390px;
    height: 250px;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
    background-color: white;
  }
}
</style>