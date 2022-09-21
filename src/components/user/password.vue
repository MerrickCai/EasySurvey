<template>
    <div class="title">修改密码</div>
    <form action="">
        <div class="account">
            <label for="account">请输入注册时所用的学号：</label>
            <input type="text" id="account">
        </div>
        <div class="email">
            <label for="email">请输入您的邮箱：</label>
            <input type="text" id="email">
        </div>
        <div class="check">
            <label for="check">请输入验证码：</label>
            <input type="text" id="check">
        </div>
        <div class="password">
            <label for="password">请输入新密码：</label>
            <input type="text" id="password">
        </div>
        <div class="newpassword">
            <label for="newpassword">请再次确认新密码：</label>
            <input type="text" id="newpassword">
        </div>
    </form>
</template>
<script setup>

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

form {
    margin-top: 64px;
    margin-left: 104px;

    >div {
        margin-bottom: 36px;

        >label {
            width: 194px;
            height: 24px;
            opacity: 1;
            /** 文本1 */
            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
            color: rgba(0, 0, 0, 1);
            text-align: left;
            vertical-align: top;
        }

        input[type="text"] {
            /* 清除原有input样式 */
            -web-kit-appearance: none;
            // -moz-appearance: none;
            outline: 0;
            /* 设置我们要的样式 */
            text-align: left;
            border: none;
            margin-left: 6px;
            width: 240px;
            height: 36px;
            opacity: 1;
            border-radius: 4px;
            border: 1px solid rgba(30, 111, 255, 1);
        }
    }
}
</style>