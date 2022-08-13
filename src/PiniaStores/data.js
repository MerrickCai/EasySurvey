import { defineStore } from 'pinia'

//导出useStore函数，执行此函数会返回一个datas对象
export const useStore = defineStore('data', {
  state: () => ({
    //响应式数据
    name: 'cai',
    value: 5
  }),
  actions: {
    //可以改变响应式数据的函数
    increment() {
      this.value++
    },
    decline() {
      this.value--
    }
  }
})

//在任意的组件中使用

//<script setup>
//import { useStore } from './PiniaStores/data.js'
//const datas = useStore()
//通过datas的属性和方法访问响应式数据和改变响应式数据
//datas.value++
//datas.$patch({ value: datas.value + 1 })
//datas.increment()
//datas.decline()
//</script>