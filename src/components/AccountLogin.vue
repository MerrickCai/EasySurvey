<script setup>

</script>

<template>
  <div class="wrapper">
     <input type="text" placeholder="用户名 / 手机号 / Email" class="info" onfocus="this.placeholder=''" onblur="this.placeholder='用户名 / 手机号 / Email'">
     <input type="text" placeholder="请输入登录密码" class="info password" onfocus="this.placeholder=''" onblur="this.placeholder='请输入登录密码'" >
     <el-button type="primary" class="loginbtn">登录</el-button>
     <input type="checkbox" class="checkbox" >
     <p class="tips">下次自动登录</p>
     <router-link class="register" to="/login/register"  exact>立即注册</router-link >
  </div>
  <router-view></router-view>
</template>

<style lang="less" scoped>
@rem:0.9px; 
  /* 以1200为安全区  1200/1920=0.625*/
.wrapper{
     width: 440*@rem ;
     height:380*@rem;
     position: relative;
     box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.1);
     z-index: -1;
}

.checkbox{
     position: absolute;
     top: 240*@rem;
     left: 72*@rem;
}
.tips{
      position: absolute;
      left: 94*@rem;
      top: 237*@rem ;;
      font-size: 10*@rem;
      letter-spacing: 0*@rem;
      line-height: 20*@rem;
      color: rgba(217, 217, 217, 1);
      text-align: left;
      vertical-align: top;
}

.info{
     position: absolute;
     left: 60*@rem;
     width: 320*@rem;
     height: 44  *@rem;
     text-indent: 17px;
     border: 1px solid rgba(217, 217, 217, 1); 
     border-radius: 5px;
     outline:none;
     &:first-child{
          top: 120*@rem;
     }
     &::placeholder{
          font-size: 12px;
          letter-spacing: 0px;
          line-height: 20px;
          color: rgba(217, 217, 217, 1);
          text-align: left;
          vertical-align: top;
     }

}
.password{
   top: 176*@rem;
}

.loginbtn{
     width: 320*@rem;
     height: 44*@rem;
     position: absolute;
     bottom: 54*@rem;
     left: 50%;
     transform: translateX(-50%);
}

.register{
     font-size: 10*@rem;
     letter-spacing: 0*@rem;
     line-height: 20*@rem;
     position: absolute;
     top: 240*@rem;
     right: 72*@rem;
     color: rgba(71, 145, 255, 1);
}
</style>