<template>
    <div class="wapper">
        <div class="top">
            <div class="title">问卷记录</div>
            <select name="" id="" @change="typechange">
                <option value="">全部问卷</option>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="8" height="8"
                    viewBox="0 0 8 8" fill="none">
                    <path id="圆形 1" fill-rule="evenodd" style="fill:#5FE61C" transform="translate(0 0)  rotate(0 4 4)"
                        opacity="1"
                        d="M4,0C1.79,0 0,1.79 0,4C0,6.21 1.79,8 4,8C6.21,8 8,6.21 8,4C8,1.79 6.21,0 4,0Z " />
                </svg>
                <option value="">已填写</option>
                <option value="">已发布</option>
            </select>
            <div class="time">
                <!-- <el-date-picker v-model="value1" type="date" placeholder="Pick a day" size="default" /> -->
                <el-date-picker v-model="value2" type="daterange" range-separator="To" start-placeholder="Start date"
                    end-placeholder="End date" size="default" value-format="YYYY-MM-DD"
                    :disabled-date="disabledDateFun" />
            </div>
        </div>
        <div class="table">
            <div class="tabletop">
                <div>问卷名称</div>
                <div>状态</div>
                <div>时间</div>
            </div>
            <div class="tablecon">
                <div class="name">
                    <span v-for="items in currentCon[0].myselfQuestionnaireDataList">{{items.title}}</span>
                </div>
                <div class="status">
                    <span v-for="items in currentCon[0].myselfQuestionnaireDataList">{{items.status}}</span>
                </div>
                <div class="time">
                    <span v-for="items in currentCon[0].myselfQuestionnaireDataList">{{items.time}}</span>
                </div>
            </div>
        </div>
        <div class="demo-pagination-block">
            <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize"
                layout="prev, pager, next, jumper" :total="(currentCon[0].totalSize)*7"
                @current-change="handleCurrentChange" />
        </div>

    </div>
</template>
<script setup>
import axios from "axios";
import { ref, reactive } from "vue"
import { useStore } from "../../Stores/pinia.js";
const datas = useStore();

const props = defineProps(["user"])
let currentPage = ref(1)
let pageSize = ref(7)
let type = ref('全部问卷')
const handleCurrentChange = (val) => {
    questionAnswerList()
}
function typechange() {
    var obj = document.getElementsByTagName('select')
    //obj.selectedIndex为选中的option的索引,obj.options[obj.selectedIndex].text为选中的文本
    type.value = obj[0].options[obj[0].selectedIndex].text
    console.log(type.value);
    questionAnswerList()
}

let currentCon = reactive([{
    myselfQuestionnaireDataList: null,
    totalSize: 100,
}])

async function questionAnswerList() {
    axios({
        url: `https://q.denglu1.cn/api/user/questionnaireList`,
        method: "post",
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            token: await datas.getToken()
        },
        data: {
            userId: props.user.userId,
            status: type.value,
            currentPage: currentPage.value,
            pageSize: 7,
            startTime: '',
            endTime: ''
        }
    })
        .then((response) => {
            currentCon.splice(0, 1, response.data.data)
        })
        .catch((error) => {
            console.log(error);
        });
}
questionAnswerList()





const value1 = ref('')
const value2 = ref('')
const disabledDateFun = (time) => {
    // console.log(time);
    return time.getTime() > Date.now() - 8.64e6
}
</script>

<style scoped lang="less">
.wapper {
    display: flex;
    flex-direction: column;
    position: relative;

    .top {
        display: flex;
        position: relative;
        justify-content: space-between;
        margin: 44px 0 0 46px;

        .title {

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

        >select {
            position: absolute;
            right: 255px;
            height: 100%;
            border-radius: 4px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
            border: none;

            &:focus-visible {
                outline: none;
            }
        }

        .time {
            // position: absolute;
            // right: 20px;
            margin-right: 20px;

            :deep(.el-date-editor) {
                border-radius: 4px;
                background: rgba(255, 255, 255, 1);
                box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
                border: none;
                --el-date-editor-width: 223px;

                :deep(el-input__wrapper) {
                    box-shadow: none;

                    &:hover {
                        box-shadow: none;
                    }
                }

                // .el-input,
                // .el-input__wrapper {
                //     // width: 100px;
                // }
            }
        }
    }

    .table {
        display: flex;
        flex-direction: column;
        padding: 20px;
        height: 450px;
        width: 100%;

        >div.tabletop {
            display: flex;
            flex-wrap: wrap;

            width: 100%;
            height: 50px;

            >div {
                width: 33%;
                height: 50px;
                text-align: center;
                line-height: 50px;
                background: rgba(235, 245, 255, 1);
                color: rgba(0, 0, 0, 1);
            }
        }

        >div.tablecon {
            display: flex;
            flex-wrap: wrap;
            margin-top: 20px;
            width: 100%;

            >div.name,
            >div.status,
            >div.time {
                display: flex;
                flex-direction: column;
                width: 33%;

                >span {
                    display: inline-block;
                    height: 50px;
                    width: 100%;
                    text-align: center;
                    line-height: 50px;
                    word-break: keep-all;
                    white-space: nowrap;
                }
            }


        }
    }

    .demo-pagination-block {
        display: flex;
        flex-direction: row-reverse;

        :deep(.number) {
            border-radius: 4px;
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
            margin: 0 4px;
        }

        :deep(.is-active) {
            background: rgba(30, 111, 255, 1);
            color: rgba(255, 255, 255, 1);
        }
    }


}
</style>