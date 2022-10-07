<template>
    <div class="wapper">
        <div class="top">
            <div class="title">问卷记录</div>
            <select name="" id="" @change="typechange">
                <option value="">全部问卷</option>
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
                <div style="width: 45%">问卷名称</div>
                <div style="width: 25%">状态</div>
                <div style="width: 30%">时间</div>
            </div>
            <template v-if="currentCon[0].myselfQuestionnaireDataList!=null">
                <div class="tablecon">
                    <div class="name">
                        <span v-for="items in currentCon[0].myselfQuestionnaireDataList">{{items.title}}</span>
                    </div>
                    <div class="status">
                        <div class="statusone" v-for="items in currentCon[0].myselfQuestionnaireDataList">
                            <svg v-if="items.status=='已发布'" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <defs>
                                    <filter id="filter_2" x="-4" y="-4" width="24" height="24"
                                        filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                        <feOffset dx="0" dy="2" />
                                        <feGaussianBlur stdDeviation="2" />
                                        <feColorMatrix type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_Shadow" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_Shadow" result="shape" />
                                    </filter>
                                </defs>
                                <g opacity="1" transform="translate(4 2)  rotate(0 8 8)">
                                    <g id="圆形 1" filter="url(#filter_2)">
                                        <path id="圆形 1" fill-rule="evenodd" style="fill:#FFFFFF"
                                            transform="translate(0 0)  rotate(0 8 8)" opacity="1"
                                            d="M8,0C3.58,0 0,3.58 0,8C0,12.42 3.58,16 8,16C12.42,16 16,12.42 16,8C16,3.58 12.42,0 8,0Z " />
                                    </g>
                                    <path id="圆形 1" fill-rule="evenodd" style="fill:#1E6FFF"
                                        transform="translate(4 4)  rotate(0 4 4)" opacity="1"
                                        d="M4,0C1.79,0 0,1.79 0,4C0,6.21 1.79,8 4,8C6.21,8 8,6.21 8,4C8,1.79 6.21,0 4,0Z " />
                                </g>
                            </svg>
                            <svg v-else-if="items.status=='已填写'" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <defs>
                                    <filter id="filter_2" x="-4" y="-4" width="24" height="24"
                                        filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                        <feOffset dx="0" dy="2" />
                                        <feGaussianBlur stdDeviation="2" />
                                        <feColorMatrix type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_Shadow" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_Shadow" result="shape" />
                                    </filter>
                                </defs>
                                <g opacity="1" transform="translate(4 2)  rotate(0 8 8)">
                                    <g id="圆形 1" filter="url(#filter_2)">
                                        <path id="圆形 1" fill-rule="evenodd" style="fill:#FFFFFF"
                                            transform="translate(0 0)  rotate(0 8 8)" opacity="1"
                                            d="M8,0C3.58,0 0,3.58 0,8C0,12.42 3.58,16 8,16C12.42,16 16,12.42 16,8C16,3.58 12.42,0 8,0Z " />
                                    </g>
                                    <path id="圆形 1" fill-rule="evenodd" style="fill:#5FE61C"
                                        transform="translate(4 4)  rotate(0 4 4)" opacity="1"
                                        d="M4,0C1.79,0 0,1.79 0,4C0,6.21 1.79,8 4,8C6.21,8 8,6.21 8,4C8,1.79 6.21,0 4,0Z " />
                                </g>
                            </svg>
                            <span>{{items.status}}</span>
                        </div>
                    </div>
                    <div class="time">
                        <span v-for="items in currentCon[0].myselfQuestionnaireDataList">{{items.time}}</span>
                    </div>

                </div>
            </template>
            <template v-else>
                <div class="block">
                    <div class="block1"></div>
                    <div class="block2"></div>
                    <div class="block3"></div>
                    <div class="block4"></div>
                </div>
            </template>
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
            console.log(response);
            currentCon.splice(0, 1, response.data.data)
            console.log(currentCon);
            if (currentCon[0] == undefined) {
                currentCon[0] = {
                    myselfQuestionnaireDataList: null
                }
                console.log(currentCon);
            }
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
        padding: 20px 20px 0 20px;
        width: 100%;

        >div.tabletop {
            display: flex;
            flex-wrap: wrap;

            width: 100%;
            height: 50px;

            >div {
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

            >div.name {
                width: 45%
            }

            >div.status {
                width: 25%;
            }

            >div.time {
                width: 30%;
            }

            .name,
            .status,
            .time {
                display: flex;
                flex-direction: column;


                >span {
                    display: inline-block;
                    height: 50px;
                    width: 100%;
                    text-align: center;
                    line-height: 50px;
                    word-break: keep-all;
                    white-space: nowrap;
                }

                >div.statusone {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 50px;
                    width: 100%;
                    text-align: center;
                    line-height: 50px;
                    word-break: keep-all;
                    white-space: nowrap;
                }
            }


        }

        >div.block {
            display: flex;
            flex-wrap: wrap;
            margin-top: 20px;
            width: 100%;

            >div {
                width: 60%;
                height: 48px;
                opacity: 1;
                border-radius: 24px;
                background: rgba(235, 245, 255, 0.6);
                margin: 3% 0;
            }

            .block1 {
                margin-left: 20%;
            }

            .block2 {
                margin-left: 5%;
            }

            .block3 {
                margin-left: 25%;
            }

            .block4 {
                margin-left: 15%;
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