<template>
    <div class="title">个人信息</div>
    <div class="pic">
        <img src="/assets/circle.png" alt="">
        <button>上传头像</button>
    </div>
    <form action="">
        <div class="name">
            <label for="username">昵称:</label>
            <input type="text" id="username" placeholder="请输入昵称">
        </div>
        <div class="age">
            <label for="userage">年龄:</label>
            <input type="text" id="userage" placeholder="请输入年龄">
        </div>
        <div class="area">
            <label for="userarea">地区:</label>
            <el-cascader placeholder="请选择您所在地区" :options="area" :props="proparea" separator=" " />
        </div>
        <div class="email">
            <label for="useremail">绑定邮箱:</label>
            <input type="text" id="useremail" placeholder="请输入邮箱">
        </div>
        <div class="number">
            <label for="usernumber">绑定手机号:</label>
            <input type="text" id="usernumber" placeholder="请输入手机号">
        </div>
        <div class="id">
            <label for="userid">学号:</label>
            <input type="text" id="userid" placeholder="请输入学号">
        </div>
        <input type="submit" value="保存修改">
    </form>
</template>

<script setup>
import area from "../../Stores/area.js"
const props = defineProps(["user"])
//--------------------------- 地区数据 -----------------------------
const proparea = {
    expandTrigger: "hover",
    children: "childs",
    value: "name",
    label: "name",
}
//--------------------------- 地区数据 -----------------------------

</script>

<style scoped lang='less'>
.title {
    padding: 44px 0 0 46px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0px;
    line-height: 28px;
    color: rgba(0, 0, 0, 1);
    text-align: left;
    vertical-align: top;
}

.pic {
    margin: 60px 0 0 104px;

    >img {
        width: 48px;
        height: 48px;
    }

    >button {
        margin-top: 27px;
        margin-left: 20px;
        width: 64px;
        height: 22px;
        opacity: 1;
        border-radius: 4px;
        border-color: rgba(30, 111, 255, 1);
        background: rgba(30, 111, 255, 1);
        font-size: 10px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        vertical-align: top;
    }
}

form {
    margin-top: 26px;
    margin-left: 128px;

    >div {
        margin: 24px 0;

        >label {
            display: inline-block;
            width: 135px;
        }

        input[type="text"] {
            /* 清除原有input样式 */
            -web-kit-appearance: none;
            // -moz-appearance: none;
            outline: 0;
            /* 设置我们要的样式 */
            text-align: left;
            border: none;
        }
    }

    .area {
        :deep(.el-input__wrapper) {
            box-shadow: none;
            padding: none;

            &:hover {
                box-shadow: none;
            }
        }
    }

    >input {
        width: 180px;
        height: 36px;
        opacity: 1;
        border-radius: 4px;
        background: rgba(30, 111, 255, 1);
        border: 0px;
        margin-left: 450px;
        margin-top: 30px;
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        vertical-align: top;
    }
}
</style>