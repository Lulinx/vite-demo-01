<!--
 * @Author: ws
 * @Date: 2022-01-17 08:47:55
 * @LastEditTime: 2022-01-20 09:48:18
 * @LastEditors: ws
 * @Description: 
 * @FilePath: \vite-demo-01\src\shop\components\shopDetail\index.vue
-->
<template>
  <div class="page-shop-detail">
    <van-collapse
      v-for="(item, index) in personListLength"
      class="info-title"
      v-model="activeNames"
      :key="item"
    >
      <van-collapse-item :ref="title" :title="`用户信息${item}`" :name="item">
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
} from "vant";
import { reactive, onBeforeMount, toRefs, ref, getCurrentInstance } from "vue";
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
  },
  setup(props) {
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const title = ref(null);
    const personInfo = reactive({
      person: [
        {
          name: "",
          years: "",
          time: "",
        },
      ],
      personListLength: 1, //人员信息个数
      showCalendar: false, //展示日历
      pattern: /^([1-9][0-9]*)$/, //正则，数字
      loading: false,
      activeNames: ["1"],
    });
    const onSubmit = () => {
      console.log(title.name);
      return;
      personInfo.person.forEach((res, idx) => {
        if (!res.name) {
          return proxy.$toast(`请填写用户${idx + 1}的姓名`);
        }
        if (!res.years) {
          return proxy.$toast(`请填输入用户${idx + 1}的年龄`);
        }
        if (!res.time) {
          return proxy.$toast(`请选择用户${idx + 1}的出生日期`);
        }
      });
      personInfo.loading = true;
      console.log("personInfo.person=-====", personInfo.person);
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
      personInfo.personListLength++;
      personInfo.person.push({
        name: "",
        years: "",
        time: "",
      });
    };
    const onFailed = (errorInfo) => {
      console.log("failed", errorInfo);
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
      title,
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
    padding-left: 20px;
    .van-hairline--top-bottom::after {
      display: none;
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
