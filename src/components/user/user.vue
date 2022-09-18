<template>
  <div class="wrapper">
      <span class="infoList" v-for="(value,key) in user" >
      {{key}}: {{value}} 
      </span>
      <el-button type="primary" @click="QuestionnaireRecords">查看填写过的问卷</el-button>
  </div>
</template>

<script setup>
import { Finished } from '@element-plus/icons-vue';
import axios from 'axios';
import { ref, reactive } from 'vue';
import {useStore} from '../../Stores/index'
const datas = useStore();
const user = reactive({});

axios({
    url: `https://q.denglu1.cn/api/user/getUserMessage/${datas.user.userId}`,
    method: "get",
    withCredentials: true,
    headers:{ token: datas.user.token }
}).then((response) => {
    // console.log(response);
    user['用户名'] = response.data.data.username;
    user['年龄'] = response.data.data.age;
    user['邮箱'] = response.data.data.email;
    user['手机号码'] = response.data.data.phone_number;
    user['头像']= response.data.data.picture;
    user['省份'] = response.data.data.province;
}).catch((error) => {
    console.log(error);
    
});

function QuestionnaireRecords(){
    axios({
    url: `https://q.denglu1.cn/api/user/questionnaireList/${datas.user.userId}`,
    method: "get",
    withCredentials: true,
    headers: { token: datas.user.token },
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });    
}


</script>
<style scoped lang='less'>
div.wrapper{
    background-color: skyblue;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items:center;
    .infoList{
        overflow: hidden;
        width: 400px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-family: '思源黑体';
        color:black;
        border: 1px solid red;
    }
}
</style>