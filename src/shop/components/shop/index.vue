<!--
 * @Author: ws
 * @Date: 2022-01-14 15:13:25
 * @LastEditTime: 2022-01-18 17:07:30
 * @LastEditors: ws
 * @Description: 
 * @FilePath: \vite-demo-01\src\shop\components\shop\index.vue
-->
<template>
  <div class="page-shop">
    <van-form>
      <van-cell-group>
        <van-field
          v-model="queryInfo.name"
          name="姓名"
          label="姓名"
          :readonly="true"
        />
        <van-field
          v-model="queryInfo.years"
          name="年龄"
          label="年龄"
          :readonly="true"
        />
        <van-field
          v-model="queryInfo.time"
          name="注册时间"
          label="注册时间"
          :readonly="true"
        />
      </van-cell-group>
    </van-form>
    <div style="margin: 16px">
      <van-button
        :loading="loading02"
        round
        block
        type="warning"
        @click="changeInfo"
      >
        修改
      </van-button>
    </div>
    <div style="margin: 16px">
      <van-button
        :loading="loading01"
        round
        block
        type="danger"
        @click="deleteInfo"
      >
        删除
      </van-button>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { deletePerson } from "@/api/api";
import { onBeforeMount, reactive, ref, toRefs } from "@vue/runtime-core";
import { Button, Form, Field, CellGroup, Dialog } from "vant";
import { getCurrentInstance } from "vue";
export default {
  name: "shop",
  components: {
    [Button.name]: Button,
    [Form.name]: Form,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Dialog.Component.name]: Dialog.Component,
  },
  setup(props, ctx) {
    const router = useRouter();
    const route = useRoute();
    const { proxy } = getCurrentInstance();
    const formData = reactive({
      loading01: false,
      loading02: false,
      queryInfo: {},
    });
    const goToDetail = () => {
      router.push({
        name: "shopDetail",
      });
    };
    onBeforeMount(() => {
      formData.queryInfo = route.query;
    });
    const toDelete = () => {
      deletePerson({ ...formData.queryInfo })
        .then((res) => {
          formData.loading01 = false;
          if (res.code === 0) {
            proxy.$toast("已删除");
            setTimeout(() => {
              router.go(-1);
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
          proxy.$toast("网络异常");
          formData.loading01 = false;
        });
    };
    const deleteInfo = () => {
      Dialog.confirm({
        message: "确定要删除此人信息吗?",
      })
        .then(() => {
          formData.loading01 = true;
          toDelete();
        })
        .catch(() => {
          Dialog.close();
        });
    };
    const changeInfo = () => {
      return false;
    };
    return {
      goToDetail,
      deleteInfo,
      changeInfo,
      ...toRefs(formData),
    };
  },
};
</script>

<style lang="less" scoped>
@import url("@/style/var.less");
.page-shop {
  font-size: @font-size-32;
  .loading {
    text-align: center;
    padding-top: 30px;
  }
  .btn {
    padding: 20px 30px;
    height: 100px;
    .van-button {
      width: 100%;
      height: 100%;
      border-radius: 50px 50px;
    }
  }
}
</style>
