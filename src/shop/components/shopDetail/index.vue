<!--
 * @Author: ws
 * @Date: 2022-01-17 08:47:55
 * @LastEditTime: 2022-01-21 17:37:31
 * @LastEditors: ws
 * @Description: 
 * @FilePath: \vite-demo-01\src\shop\components\shopDetail\index.vue
-->
<template>
  <div class="page-shop-detail">
    <van-collapse
      v-for="(item, index) in person"
      class="info-title"
      v-model="activeNames"
      :key="item"
    >
      <van-collapse-item :name="index">
        <template #title>
          <div>
            <van-icon
              v-if="person.length > 1"
              name="clear"
              @click.stop="deleteItem(index)"
            />{{ `用户信息${index + 1}` }}
          </div>
        </template>
        <van-form validate-first @failed="onFailed">
          <van-cell-group>
            <van-field
              v-model="person[index].name"
              name="姓名"
              label="姓名"
              placeholder="请填写用户姓名"
              :rules="[{ required: true, message: '请填写用户姓名' }]"
            />
            <van-field
              v-model="person[index].years"
              name="pattern"
              label="年龄"
              placeholder="请填输入用户年龄"
              :rules="[{ pattern, message: '请填输入1-3位纯数字' }]"
            />
            <van-field
              readonly
              clickable
              name="datetimePicker"
              v-model="person[index].time"
              label="出生日期"
              placeholder="选择用户出生日期"
              @click="showCalendar = true"
            />
          </van-cell-group>
        </van-form>
      </van-collapse-item>
    </van-collapse>
    <div class="add" @click="addPerson">
      增加人员信息<van-icon name="plus" />
    </div>
    <div style="margin: 16px">
      <van-button
        :loading="loading"
        round
        block
        type="primary"
        @click="onSubmit"
        >提交</van-button
      >
    </div>
  </div>
  <van-popup v-model:show="showCalendar" position="bottom">
    <van-datetime-picker
      type="date"
      @confirm="onConfirm"
      @cancel="showCalendar = false"
      :min-date="minDate"
      :max-date="maxDate"
    />
  </van-popup>
</template>

<script>
import {
  CellGroup,
  Icon,
  DatetimePicker,
  Field,
  Button,
  Form,
  Popup,
  Collapse,
  CollapseItem,
  Dialog,
} from "vant";
import {
  reactive,
  onBeforeMount,
  toRefs,
  ref,
  getCurrentInstance,
  nextTick,
} from "vue";
import { addPersonInfo } from "@/api/api";
import { dateFormat } from "@/utils/extend";
import { useRouter } from "vue-router";
export default {
  components: {
    [DatetimePicker.name]: DatetimePicker,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Form.name]: Form,
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Dialog.Component.name]: Dialog.Component,
  },
  setup(props) {
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const personInfo = reactive({
      person: [
        {
          name: "",
          years: "",
          time: "",
        },
      ],
      showCalendar: false, //展示日历
      pattern: /^([1-9][0-9]*)$/, //正则，数字
      loading: false,
      activeNames: ["0"],
    });
    const onSubmit = () => {
      console.log("personInfo.person=-====", personInfo.person);
      for (let i = 0; i < personInfo.person.length; i++) {
        if (!personInfo.person[i].name) {
          return proxy.$toast(`请填写用户${i + 1}的姓名`);
        }
        if (!personInfo.person[i].years) {
          return proxy.$toast(`请填输入用户${i + 1}的年龄`);
        }
        if (!personInfo.person[i].time) {
          return proxy.$toast(`请选择用户${i + 1}的出生日期`);
        }
      }
      personInfo.loading = true;
      addPersonData({ personInfo: personInfo.person });
    };
    const addPersonData = (params) => {
      addPersonInfo(params)
        .then((res) => {
          personInfo.loading = false;
          if (res.code === 0) {
            proxy.$toast("success", "添加成功");
            setTimeout(() => {
              router.go(-1);
            }, 700);
          }
        })
        .catch((err) => {
          console.log(err);
          personInfo.loading = false;
          proxy.$toast("请求失败");
        });
    };
    const addPerson = () => {
      personInfo.person.push({
        name: "",
        years: "",
        time: "",
      });
    };
    const onFailed = (errorInfo) => {
      console.log("failed", errorInfo);
    };
    const deleteItem = (index) => {
      Dialog.confirm({
        message: "确定要删除此条信息吗?",
      })
        .then(() => {
          personInfo.person.splice(index, 1);
          proxy.$toast("删除成功");
        })
        .catch(() => {
          Dialog.close();
        });
    };
    const onConfirm = (date) => {
      date = new Date(date).getTime();
      let dateTime = dateFormat(date, "YYYY-MM-DD HH:mm:ss");
      personInfo.person[0].time = dateTime;
      personInfo.showCalendar = false;
    };
    return {
      onSubmit,
      onFailed,
      onConfirm,
      addPerson,
      deleteItem,
      ...toRefs(personInfo),
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
    };
  },
};
</script>

<style lang="less" scoped>
.page-shop-detail {
  .info-title {
    font-size: 34px;
    font-weight: bolder;
    .van-hairline--top-bottom::after {
      display: none;
    }
    :deep(.van-cell__title) {
      div {
        display: flex;
        justify-content: left;
        align-items: center;
      }
    }
    :deep(.van-icon) {
      margin-right: 20px;
      font-size: 38px;
      color: rgb(182, 22, 22);
      line-height: inherit;
    }
  }

  .add {
    width: 100%;
    padding: 20px 30px;
    box-sizing: border-box;
    text-align: center;
    font-size: 32px;
    color: #1989fa;
    cursor: pointer;
  }
}
</style>
