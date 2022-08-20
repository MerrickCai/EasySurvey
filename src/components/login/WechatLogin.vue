<script setup>

</script>

<template>
   <div class="wrapper">
      <img src='/login_icon1.png' />
      <h2 class="tips">使用微信扫一扫登录</h2>
   </div>
</template>

<style lang="less" scoped>
@a: 0.9px;

.wrapper {
   position: relative;
   width: 440*@a;
   height: 380*@a;
   z-index: -1;
   >img{
      display: block;
      height: 180px;
      width: 180px;
      object-fit: contain;
      position: absolute;
      top:50%;
      left: 50%;
      transform: translate(-50%,-40%);
   }
   >.tips {
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
}
</style>