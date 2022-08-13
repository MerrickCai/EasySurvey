import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => ({
    //响应式数据
    name: 'cai',
    value: 5
  }),
  getters: {
    //计算属性
    doubleValue: (state) => state.value * 2,
    doublePlusOne() {
      return this.value * 2 + 1
      //return this.doubleValue * 2 + 1    套娃
    },
  },
  actions: {
    //方法
    increment() {
      this.value++
    },
    decline() {
      this.value--
    },
    async registerUser(login, password) { //支持异步函数
      try {
        this.userData = await api.post({ login, password })
        showTooltip(`Welcome back ${this.userData.name}!`)
      } catch (error) {
        showTooltip(error)
        // 让表单组件显示错误
        return error
      }
    }
  }
})

/* 在任意组件中使用

<script setup>
import { useStore } from './PiniaStores/index.js'
const datas = useStore()

//直接访问
datas.value++

//使用方法
datas.increment()

//$patch方法，传入对象
datas.$patch({ value: datas.value + 1 })
//$patch方法，传入函数（集合突变：为数组push新的值，不用创建一个新的数组）
cartStore.$patch((state) => {
  state.items.push({ name: 'shoes', quantity: 1 })
  state.hasChanged = true
})

//重置datas
datas.$reset()

</script>

*/