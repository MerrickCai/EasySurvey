<script setup>
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
function backhome() {
    router.push({
        path:'/'
    })
}
</script>

<template>
    <p>
        找不到页面
    </p>
    <p>
        <button @click="backhome">回到首页</button>
    </p>
</template>