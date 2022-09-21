<template>
    <div class="title">个人信息</div>
    <div class="pic">
        <img src="/assets/circle.png" alt="">
        <button>上传头像</button>
    </div>
    <form action="">
        <div class="name">
            <span class="asterisk" v-if="getRequired(rules.username)">&nbsp;*</span>
            <label for="username">昵称:</label>
            <input type="text" id="username" placeholder="请输入昵称" v-model="user.username" @blur="judgeUsername"
                prop="username">
            <div class="put" v-show="!modelControl['username']"></div>
            <div class="error" v-show="modelControl['username']">{{modelControl['username']}}</div>
        </div>
        <div class="age">
            <span class="asterisk" v-if="getRequired(rules.age)">&nbsp;*</span>
            <label for="userage">年龄:</label>
            <input type="text" id="userage" placeholder="请输入年龄" v-model="user.age" @blur="judgeAge" prop="age">
            <div class="put" v-show="!modelControl['age']"></div>
            <div class="error" v-show="modelControl['age']">{{modelControl['age']}}</div>
        </div>
        <div class="area">
            <span class="asterisk" v-if="getRequired(rules.area)">&nbsp;*</span>
            <label for="userarea">地区:</label>
            <el-cascader placeholder="请选择您所在地区" :options="area" :props="proparea" separator=" " v-model="user.area" />
            <div class="put"></div>
        </div>
        <div class="email">
            <span class="asterisk" v-if="getRequired(rules.email)">&nbsp;*</span>
            <label for="useremail">绑定邮箱:</label>
            <input type="text" id="useremail" placeholder="请输入邮箱" v-model="user.email" @blur="judgeEmail" prop="email">
            <div class="put" v-show="!modelControl['email']"></div>
            <div class="error" v-show="modelControl['email']">{{modelControl['email']}}</div>
        </div>
        <div class="number">
            <span class="asterisk" v-if="getRequired(rules.number)">&nbsp;*</span>
            <label for="usernumber">绑定手机号:</label>
            <input type="text" id="usernumber" placeholder="请输入手机号" @blur="judgeNumber" prop="number">
            <div class="put" v-show="!modelControl['number']"></div>
            <div class="error" v-show="modelControl['number']">{{modelControl['number']}}</div>
        </div>
        <div class="id">
            <span class="asterisk" v-if="getRequired(rules.account)">&nbsp;*</span>
            <label for="userid">学号:</label>
            <input type="text" id="userid" placeholder="请输入学号" v-model="user.account" @blur="judgeAccount"
                prop="account">
            <div class="put" v-show="!modelControl['account']"></div>
            <div class="error" v-show="modelControl['account']">{{modelControl['account']}}</div>
        </div>
        <input type="submit" value="保存修改" @click="submit">
    </form>
</template>

<script setup>
import area from "../../Stores/area.js"
import Schema from 'async-validator';
import { ref } from "vue"
const props = defineProps(["user"])
//错误信息存储
const modelControl = ref({})
//信息判断
const rules = {
    username: { required: false, message: '请输入昵称' },
    age: { required: true, message: '请输入正确年龄', pattern: /^[0-9]{1,3}$/, },
    area: { required: true, message: '请输入地区' },
    email: { required: true, message: '请输入正确邮箱', pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/ },
    account: { required: true, message: '请输入正确学号', pattern: /^[1-9]\d{9}$/ },
    number: { required: true, message: '请输入正确手机号', pattern: /^1\d{10}$/ },
}
const validator = new Schema(rules)
//昵称判断
const judgeUsername = (e) => {
    const prop = e.target.attributes.prop.value
    if (!prop) {
        return false
    }
    validator.validate({ username: props.user.username }, (errors, fields) => {
        if (errors && fields.username) {
            modelControl.value[prop] = fields[prop][0].message
            return errors
        }
        modelControl.value[prop] = null
    })
}
//年龄判断
const judgeAge = (e) => {
    const prop = e.target.attributes.prop.value
    if (!prop) {
        return false
    }
    validator.validate({ age: props.user.age }, (errors, fields) => {
        if (errors && fields.age) {
            console.log("cuowu", errors, "lingyu", fields);
            console.log(fields.age[0].message);
            modelControl.value[prop] = fields[prop][0].message
            return errors
        }
        modelControl.value[prop] = null
    })
}
//邮箱判断
const judgeEmail = (e) => {
    const prop = e.target.attributes.prop.value
    if (!prop) {
        return false
    }
    validator.validate({ email: props.user.email }, (errors, fields) => {
        if (errors && fields.email) {
            modelControl.value[prop] = fields[prop][0].message
            return errors
        }
        modelControl.value[prop] = null
    })
}
//手机号判断
const judgeNumber = (e) => {
    const prop = e.target.attributes.prop.value
    if (!prop) {
        return false
    }
    validator.validate({ number: props.user.number }, (errors, fields) => {
        if (errors && fields.number) {
            modelControl.value[prop] = fields[prop][0].message
            return errors
        }
        modelControl.value[prop] = null
    })
}
//学号判断
const judgeAccount = (e) => {
    const prop = e.target.attributes.prop.value
    if (!prop) {
        return false
    }
    validator.validate({ account: props.user.account }, (errors, fields) => {
        if (errors && fields.account) {
            modelControl.value[prop] = fields[prop][0].message
            return errors
        }
        modelControl.value[prop] = null
    })
}
//提交验证
const submit = (e) => {
    e.preventDefault();
    validator.validate(props.user).then((value) => {
        // 校验通过
        console.log(value);
    }).catch(({ errors, fields }) => {
        console.log(errors, fields);
        for (let key in fields) {
            modelControl.value[key] = fields[key][0].message
        }
        console.log(modelControl);
        return errors
    })
}
//判断星号是否显示
const getRequired = (condition) => {
    if (Object.prototype.toString.call(condition) === "[object Object]") {
        return condition.required
    } else if (Object.prototype.toString.call(condition) === "[object Array]") {
        let result = condition.some(item => item.required)
        return result
    }
    return false
}
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
        >label {
            display: inline-block;
            width: 135px;
        }

        .asterisk {
            color: #d03050;
        }

        input[type="text"] {
            /* 清除原有input样式 */
            -web-kit-appearance: none;
            // -moz-appearance: none;
            outline: 0;
            /* 设置我们要的样式 */
            text-align: left;
            border: none;
            width: 240px;
            height: 24px;
        }

        >.error {
            width: 300px;
            height: 20px;
            margin-left: 135px;
            color: red;
            font-size: 10px;
        }

        >.put {
            width: 300px;
            height: 20px;
            margin-left: 135px;
        }
    }

    .area {
        :deep(.el-input__wrapper, .el-cascader .el-input.is-focus .el-input__wrapper) {
            box-shadow: none;
            padding: 0;

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