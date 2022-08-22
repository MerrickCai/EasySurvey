<script setup>
import { provide, ref, computed,reactive,toRef} from 'vue'

//问卷模板
import survey1 from '../components/surveyTemplate/survey1.vue'
import survey2 from '../components/surveyTemplate/survey2.vue'
import survey3 from '../components/surveyTemplate/survey3.vue'
import survey4 from '../components/surveyTemplate/survey4.vue'
import survey5 from '../components/surveyTemplate/survey5.vue'
const surveyTemplateList = [survey1, survey2, survey3, survey4, survey5]
const viewId = ref(2) //默认问卷类型是2
const currentView = computed(() => surveyTemplateList[viewId.value - 1])

//这里是根据用户打开的链接进行异步网络请求，获取问卷类型和数据，然后展示对应的模板
import axios from 'axios'
import { useStore } from '../PiniaStores/index.js'
const datas = useStore()
axios({
  url: `https://q.denglu1.cn/user/fillQuestionnaire/${3}`,
  method: 'get',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  headers: { 'token': datas.user.token }
}).then((response) => {
  console.log(response)
  //假设获取到的问卷类型是2
  viewId.value = 1
}).catch((error) => {
  console.log(error)
})

//问卷填写的状态（问卷介绍，填写问卷，填写结束）=>传给问卷模板组件
const status = reactive({
  begin: true,
  ongoing: false,
  end: false,
  toOngoing() {
    this.begin = false
    this.ongoing = true
  },
  toEnd() {
    this.ongoing = false
    this.end = true
  },
});
provide('status', status)
</script>

<template>
  <div class="wrapper">
    <img dog-ear src="/tangible.png" />
    <div class="decoration5"></div>
    <div class="decoration1" v-show="status.begin || status.end"></div>
    <div class="decoration2" v-show="status.begin || status.end"></div>
    <div class="decoration3" v-show="status.begin || status.end"></div>
    <div class="decoration4" v-show="status.begin || status.end"></div>
    <!--动态组件-->
    <Transition name="fade" mode="out-in">
      <KeepAlive>
        <component :is="currentView"></component>
      </KeepAlive>
    </Transition>
    <!--动态组件-->
  </div>
</template>

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
  border-radius: 5px;
  box-shadow: 0px 5px 10px 0 rgba(73, 107, 158, 0.1);
  z-index: 0;

  div.decoration1 {
    display: block;
    height: 400px;
    width: 400px;
    position: absolute;
    z-index: -10;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background-color: rgba(235, 245, 255, 1);
    clip-path: polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%);
  }

  div.decoration2 {
    display: block;
    height: 150px;
    width: 150px;
    position: absolute;
    z-index: -3;
    bottom: 40px;
    right: 50px;
    border-radius: 50%;
    background-color: rgba(71, 145, 255, 1);
  }

  div.decoration3 {
    display: block;
    height: 100px;
    width: 100px;
    position: absolute;
    z-index: -4;
    bottom: 80px;
    right: -20px;
    border-radius: 50%;
    background-color: rgba(30, 111, 255, 1);
  }

  div.decoration4 {
    display: block;
    height: 170px;
    width: 170px;
    position: absolute;
    z-index: -4;
    bottom: -20px;
    right: 100px;
    border-radius: 50%;
    background-color: rgba(235, 245, 255, 1);
  }

  div.decoration5 {
    display: block;
    height: calc(108px + 5px);
    width: calc(120px + 7px);
    position: absolute;
    z-index: 1;
    top: -5px;
    right: -7px;
    background-color: rgb(255, 255, 255, 1);
  }

  img[dog-ear] {
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


  .fade-enter-active,
  .navbar-leave-active {
    transition: all 0.2s ease-in-out 0s;
  }

  .fade-enter-from,
  .fade-leave-to {
    filter: opacity(0);
  }
}
</style>