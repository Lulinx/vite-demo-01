<!--
 * @Author: ws
 * @Date: 2022-01-17 08:47:55
 * @LastEditTime: 2022-01-19 21:04:19
 * @LastEditors: ws
 * @Description: 
 * @FilePath: \vite-demo-pce:\code\vue\vite-demo-01\src\shop\components\shopDetail\index.vue
-->
<template>
  <div class="page-shop-detail">
    <van-form validate-first @failed="onFailed">
      <van-cell-group>
        <van-field
          v-model="person.name"
          name="姓名"
          label="姓名"
          placeholder="请填写用户姓名"
          :rules="[{ required: true, message: '请填写用户姓名' }]"
        />
        <van-field
          v-model="person.years"
          name="pattern"
          label="年龄"
          placeholder="请填输入用户年龄"
          :rules="[{ pattern, message: '请填输入1-3位纯数字' }]"
        />
        <van-field
          readonly
          clickable
          name="datetimePicker"
          v-model="person.time"
          label="出生日期"
          placeholder="选择用户出生日期"
          @click="showCalendar = true"
        />
      </van-cell-group>
    </van-form>
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
    <van-popup v-model:show="showCalendar" position="bottom">
      <van-datetime-picker
        type="date"
        @confirm="onConfirm"
        @cancel="showCalendar = false"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
  </div>
</template>

<script>
import { CellGroup, DatetimePicker, Field, Button, Form, Popup } from "vant";
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
  },
  setup(props) {
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const onSubmit = () => {
      let params = [];
      if (!personInfo.person.name) return proxy.$toast("请填写用户姓名");
      if (!personInfo.person.years) return proxy.$toast("请填输入用户年龄");
      if (!personInfo.person.time) return proxy.$toast("请选择用户出生日期");
      params.push(personInfo.person);
      personInfo.loading = true;
      console.log("personInfo.person=-====", personInfo.person);
      addPersonData({ personInfo: params });
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
    const personInfo = reactive({
      person: {
        name: "",
        years: "",
        time: "",
      },
      showCalendar: false, //展示日历
      pattern: /^([1-9][0-9]*)$/, //正则，数字
      loading: false,
    });
    const onFailed = (errorInfo) => {
      console.log("failed", errorInfo);
    };
    const onConfirm = (date) => {
      date = new Date(date).getTime();
      let dateTime = dateFormat(date, "YYYY-MM-DD HH:mm:ss");
      personInfo.person.time = dateTime;
      personInfo.showCalendar = false;
    };
    return {
      onSubmit,
      onFailed,
      onConfirm,
      ...toRefs(personInfo),
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
    };
  },
};
</script>

<style lang="less" scoped>
.page-shop-detail {
}
</style>
