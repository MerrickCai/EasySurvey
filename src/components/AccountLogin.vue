<script setup>
import axios from 'axios'
axios({
     url: 'http://p.dengluyi.cn/user/regist',
     method: 'post',
     data: {
          "phone_number": "1234567",
          "password": "123"
     },
     withCredentials: true,
     headers: { 'Content-Type': 'application/json' },
}).then(response => { console.log(response) }).catch(error => { console.log(error) })
</script>

<template>
     <div class="wrapper">

          <input class="info" type="text" placeholder="用户名 / 手机号 / Email" onfocus="this.placeholder=''"
               onblur="this.placeholder='用户名 / 手机号 / Email'">
          <input class="info password" type="text" placeholder="请输入登录密码" onfocus="this.placeholder=''"
               onblur="this.placeholder='请输入登录密码'">

          <input class="checkbox" type="checkbox">
          <p class="tips">下次自动登录</p>
          <router-link class="register" to="/login/register" exact>立即注册</router-link>

          <el-button class="loginbtn" type="primary">登录</el-button>

     </div>

     <router-view></router-view>
</template>

<style lang="less" scoped>
@rem: 0.9px;

/* 以1200为安全区  1200/1920=0.625*/
.wrapper {
     width: 440*@rem ;
     height: 380*@rem;
     position: relative;
     box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.1);
     z-index: -1;

     .info {
          position: absolute;
          left: 60*@rem;
          width: 320*@rem;
          height: 44 *@rem;
          text-indent: 17px;
          border: 1px solid rgba(217, 217, 217, 1);
          border-radius: 5px;
          outline: none;

          &.password {
               top: 176*@rem;
          }

          &:first-child {
               top: 120*@rem;
          }

          &::placeholder {
               font-size: 12px;
               letter-spacing: 0px;
               line-height: 20px;
               color: rgba(217, 217, 217, 1);
               text-align: left;
               vertical-align: top;
          }

     }

     .checkbox {
          position: absolute;
          top: 240*@rem;
          left: 72*@rem;
     }

     .tips {
          position: absolute;
          left: 89*@rem;
          top: 236*@rem ;
          font-size: 10*@rem;
          letter-spacing: 0*@rem;
          line-height: 20*@rem;
          color: rgba(217, 217, 217, 1);
          text-align: left;
          vertical-align: top;
     }

     .loginbtn {
          width: 320*@rem;
          height: 44*@rem;
          position: absolute;
          bottom: 54*@rem;
          left: 50%;
          transform: translateX(-50%);
     }

     .register {
          font-size: 10*@rem;
          letter-spacing: 0*@rem;
          line-height: 20*@rem;
          position: absolute;
          top: 240*@rem;
          right: 72*@rem;
          color: rgba(71, 145, 255, 1);
     }
}
</style>