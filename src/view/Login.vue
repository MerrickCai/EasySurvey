<script setup>
import { ref, computed, provide, onActivated } from 'vue'
import { useStore } from "../Stores/pinia.js"
import { onBeforeRouteLeave } from 'vue-router'
import accountLogin from '../components/login/accountLogin.vue'
import wechatLogin from '../components/login/wechatLogin.vue'
import register from '../components/login/register.vue'
import popUp from '../components/login/popUp.vue'
const datas = useStore()



//------------------------ 动态组件 ----------------------------------
const viewList = [wechatLogin, accountLogin, register, popUp]
const viewId = ref(1)
const currentView = computed(() => viewList[viewId.value])
provide('viewId', viewId)
//------------------------ 动态组件 ----------------------------------




//------------------------ 随机背景图 ----------------------------------
datas.backgroundShow = true
onBeforeRouteLeave(() => {
   datas.backgroundShow = false
   viewId.value=1
})
onActivated(() => {
   datas.backgroundShow = true
})
//------------------------ 随机背景图 ----------------------------------
</script>

<template>
   <div wrapper>
      <main>
         <!--动态组件-->
         <Transition name="fade" mode="out-in">
            <KeepAlive>
               <component :is="currentView"></component>
            </KeepAlive>
         </Transition>
         <!--动态组件-->
      </main>
   </div>
</template>

<style lang="less" scoped>
@navSpan: 70px;

div[wrapper] {
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   height: 100%;
   width: 100%;

   >main {
      display: block;
      width: auto;
      height: auto;
      background-color: rgb(255, 255, 255);
      box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.1);
      border-radius: 10px;
      margin-top: -@navSpan;

      @media (max-width:@breakpoint) {
         box-shadow: none;
         border-radius: 0;
         width: 100%;
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
}
</style>