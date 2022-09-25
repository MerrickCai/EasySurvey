<template>
    <div class="wapper">
        <div class="top">
            <div class="title">问卷记录</div>
            <select name="" id="">
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
            <div @click="show">1111111</div>

        </div>

    </div>
</template>
<script setup>
import axios from "axios";
import { ref, onMounted } from "vue"
import { useStore } from "../../Stores/pinia.js";
const datas = useStore();


const value1 = ref('')
const value2 = ref('')
let show = () => {
    console.log(value2.value);
}
const disabledDateFun = (time) => {
    // console.log(time);
    return time.getTime() > Date.now() - 8.64e6

}
</script>

<style scoped lang="less">
.wapper {
    display: flex;
    flex-direction: column;

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
}
</style>