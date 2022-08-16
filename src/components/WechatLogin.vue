<script setup>

</script>

<template>
   <div class="wrapper">
      <h2 class="tips">使用微信扫一扫登录</h2>
   </div>
</template>

<style lang="less" scoped>
@a: 0.9px;

.tips {
   font-family: '思源黑体';
   font-size: 14*@a;
   font-weight: 400;
   letter-spacing: 0*@a;
   line-height: 22*@a;
   color: rgba(0, 0, 0, 1);
   text-align: left;
   vertical-align: top;
   position: absolute;
   bottom: 32*@a;
   left: 50%;
   transform: translateX(-50%);
}

.wrapper {
   position: relative;
   width: 440*@a;
   height: 380*@a;
   z-index: -1;
   user-select: none;
   -webkit-user-drag: none;
   box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.1);
}
</style>