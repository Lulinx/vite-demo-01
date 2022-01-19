<!--
 * @Author: ws
 * @Date: 2022-01-14 15:13:25
 * @LastEditTime: 2022-01-19 14:40:02
 * @LastEditors: ws
 * @Description: 
 * @FilePath: \vite-demo-01\src\shop\components\home\index.vue
-->
<template>
  <div class="page-shop-home">
    <form class="search" action="#">
      <van-search v-model="value" show-action placeholder="请输入姓名搜索">
        <template #action>
          <div @click="onCancel(value)">搜索</div>
        </template>
      </van-search>
    </form>
    <van-loading class="loading content" v-if="loading" type="spinner" />
    <div class="content" v-else>
      <van-empty v-if="!list.length" description="暂无数据" />
      <van-cell-group v-else v-for="item in list" :key="item.id">
        <van-cell
          :title="item.name + item.id"
          :value="item.years"
          :label="`注册时间${item.time}`"
          @click="goToShop(item)"
        />
      </van-cell-group>
    </div>
    <div class="btn">
      <van-button @click="shopDetail" type="primary">新增</van-button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { onBeforeMount, reactive, toRefs } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { Search, Loading, Button, Cell, CellGroup, Empty } from "vant";
import { getCurrentInstance } from "vue";
import { getTestSQL } from "@/api/api";
export default {
  name: "home",
  components: {
    [Loading.name]: Loading,
    [Button.name]: Button,
    [Search.name]: Search,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Empty.name]: Empty,
  },
  setup(props, ctx) {
    const { proxy } = getCurrentInstance();
    const activeNames = ref(["1"]);
    let data = reactive({
      list: [],
      loading: true,
      value: "",
    });
    onBeforeMount(() => {
      getDataList();
    });
    const getDataList = (params = {}) => {
      getTestSQL(params)
        .then((res) => {
          if (res.code === 0) {
            data.list = res.data;
            console.log("getTestSQL.value====", res);
          }
          data.loading = false;
        })
        .catch((err) => {
          console.log(err);
          data.loading = false;
          proxy.$toast("请求失败");
        });
    };
    const router = useRouter();
    const onCancel = (val) => {
      data.loading = true;
      getDataList({ name: val });
    };

    const goToShop = (item) => {
      router.push({
        name: "shop",
        query: item,
      });
    };
    const shopDetail = () => {
      router.push({
        name: "shopDetail",
      });
    };
    return {
      goToShop,
      shopDetail,
      activeNames,
      ...toRefs(data),
      onCancel,
    };
  },
};
</script>

<style lang="less" scoped>
@import url("@/style/var.less");

.page-shop-home {
  font-size: @font-size-32;
  .search {
    height: 100px;
    .van-search {
      height: 100%;
    }
  }
  .loading {
    text-align: center;
  }
  .content {
    height: calc(~"100vh - 240px");
    overflow-y: scroll;
    .van-empty {
      height: 100%;
    }
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
