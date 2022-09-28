<template>
    <div class="wapper">
        <div class="title">修改密码</div>
        <form action="">
            <div class="account">
                <label for="account">请输入注册时所用的学号：</label>
                <input type="text" id="account" v-model="fixuser.account" @blur="judgeAccount" prop="account">
                <div class="put" v-show="!errormes['account']"></div>
                <div class="error" v-show="errormes['account']">{{errormes['account']}}</div>
            </div>
            <div class="email">
                <label for="email">请输入您的邮箱：</label>
                <input type="text" id="email" v-model="fixuser.email" @blur="judgeEmail" prop="email">
                <span class="checkmes" v-show="checkshow">发送验证码</span>
                <div class="put" v-show="!errormes['email']"></div>
                <div class="error" v-show="errormes['email']">{{errormes['email']}}</div>
            </div>
            <div class="check">
                <label for="check">请输入验证码：</label>
                <input type="text" id="check">
                <div class="put"></div>
            </div>
            <div class="password">
                <label for="password">请输入新密码：</label>
                <input type="text" id="password" v-model="fixuser.password" @blur="judgePassword" prop="password">
                <div class="put" v-show="!errormes['password']"></div>
                <div class="error" v-show="errormes['password']">{{errormes['password']}}</div>
            </div>
            <div class="newpassword">
                <label for="newpassword">请再次确认新密码：</label>
                <input type="text" id="newpassword" v-model="fixuser.confirmPassword" @blur="confirmPassword"
                    prop="confirmPassword">
                <div class="put" v-show="!errormes['confirmPassword']"></div>
                <div class="error" v-show="errormes['confirmPassword']">{{errormes['confirmPassword']}}</div>
            </div>
            <div class="confirm">
                <input type="submit" value="确认操作">
            </div>
        </form>
    </div>
</template>
<script setup>
import Schema from 'async-validator'
import { reactive, ref } from "vue"
const props = defineProps(["user"])
const fixuser = reactive({
    account: '',
    password: '',
    confirmPassword: '',
    email: ''
})
//储存错误提示信息
const errormes = reactive({})
const checkshow = ref(false)
// 信息判断
const rules = {
    account: {
        required: true, message: '请输入正确的账号', validator(rule, value, callback) {
            return value === props.user.account
        }
    },
    password: { required: true, message: '请输入8-20位字母数字+特殊字符', pattern: /^[0-9a-zA-Z~!@#$%^&*()_+`\-={}:";'<>?,.\/]{8,20}$/ },
    confirmPassword: {
        required: true, message: '请确保两次密码一致', validator(rule, value, callback) {
            return value === fixuser.password
        }
    },
    email: {
        required: true, message: '请输入正确的邮箱'
    }
}
const validator = new Schema(rules)
//账号验证
const judgeAccount = (e) => {
    const prop = e.target.attributes.prop.value
    validator.validate({ account: fixuser.account }, (errors, fields) => {
        if (errors && fields.account) {
            errormes[prop] = fields.account[0].message
            return errors
        }
        errormes[prop] = null
    })
}
//邮箱验证
const judgeEmail = (e) => {
    const prop = e.target.attributes.prop.value
    validator.validate({ email: fixuser.email }, (errors, fields) => {
        if (errors && fields.email) {
            errormes[prop] = fields.email[0].message
            checkshow.value = false
            return errors
        }
        errormes[prop] = null
        checkshow.value = true
    })
}

//密码验证
const judgePassword = (e) => {
    const prop = e.target.attributes.prop.value
    validator.validate({ password: fixuser.password }, (errors, fields) => {
        if (errors && fields.password) {
            errormes[prop] = fields.password[0].message
            return errors
        }
        errormes[prop] = null
    })
}

//密码确认验证
const confirmPassword = (e) => {
    const prop = e.target.attributes.prop.value
    validator.validate({ confirmPassword: fixuser.confirmPassword }, (errors, fields) => {
        if (errors && fields.confirmPassword) {
            errormes[prop] = fields.confirmPassword[0].message
            return errors
        }
        errormes[prop] = null
    })
}

</script>
<style scoped lang='less'>
.wapper {
    display: flex;
    flex-direction: column;

    .title {
        padding: 44px 0 0 46px;
        font-size: 20px;
        font-weight: 500;
        letter-spacing: 0px;
        line-height: 28px;
        color: rgba(0, 0, 0, 1);
        text-align: left;
        vertical-align: top;

        @media(max-width:@breakpoint) {
            padding: 30px 0 0 5px;
        }
    }

    form {
        margin-top: 64px;
        margin-left: 104px;

        @media(max-width:@breakpoint) {
            margin-top: 26px;
            margin-left: 30px;
        }

        >div {
            display: flex;
            flex-wrap: wrap;
            width: 100%;

            >.error {
                width: 300px;
                height: 20px;
                margin: 5px 0 15px 200px;
                color: red;
                font-size: 10px;

                @media(max-width:572px) {
                    margin-left: 0px;
                }
            }

            >.put {
                width: 300px;
                height: 20px;
                margin: 5px 0 15px 200px;
            }

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
                margin-left: 6px;
                width: 240px;
                height: 36px;
                opacity: 1;
                border-radius: 4px;
                border: 1px solid rgba(229, 229, 229, 1);

                &:focus {
                    border: 1px solid rgba(30, 111, 255, 1);
                }
            }

            input:-webkit-autofill {
                box-shadow: 0 0 0px 1000px white inset !important;
            }

            .checkmes {
                cursor: pointer;
                display: inline-block;
                width: 84px;
                height: 24px;
                opacity: 1;
                border-radius: 4px;
                background: rgba(30, 111, 255, 1);
                font-size: 12px;
                font-weight: 400;
                line-height: 24px;
                color: rgba(255, 255, 255, 1);
                text-align: center;
                vertical-align: top;
                margin: 5px 0 0 10px
            }
        }

        .confirm {
            flex-direction: row-reverse;

            width: 90%;

            input {
                width: 180px;
                height: 36px;
                opacity: 1;
                border-radius: 4px;
                background: rgba(30, 111, 255, 1);
                border: 0px;
                margin-top: 30px;
                font-size: 12px;
                font-weight: 400;
                line-height: 20px;
                color: rgba(255, 255, 255, 1);
                text-align: center;
                vertical-align: top;

                @media(max-width:572px) {
                    margin-top: 0px;
                    margin-right: 36px;
                }
            }
        }
    }
}
</style>