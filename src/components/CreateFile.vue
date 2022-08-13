<template>
  <ul>
    <li class="creatfile">
        <div class="creattitle">创建问卷</div>
        <div class="creatcontent">
            <el-progress type="circle" :percentage="0" />
        </div>
    </li>
  </ul>
</template>

<script setup>

</script>

<style>
    ul li {
        list-style: none
    }
    .creattitle {
        position: relative;
        width: 10rem;
        height: 2.7rem;
        border-radius: 4px 4px 0px 0px;
        background:  rgba(138, 204, 237, 1) ;
        text-align: left;
        text-indent: 2rem;
        line-height: 2.7rem;
    }
    .creattitle::after{
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        /* width: 2.7rem;
        height: 2.7rem; */
        border-top: 1.35rem solid white;
        border-right: 1.35rem solid white;
        border-bottom: 1.35rem solid transparent;
        border-left: 1.35rem solid transparent;

        z-index: 999;

    }
    .creatcontent {
        position: relative;
        width: 21rem;
        height: 12.1rem;
        border-radius: 0px 4px 4px 4px;
        background: rgba(138, 204, 237, 1);
    }

    .el-progress {
        position: absolute;
        top: 1.5rem;
        right: 1.7rem;
    }
</style>