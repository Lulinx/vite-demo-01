<template>
  <div class="page-shop-home">
    <van-loading class="loading" v-if="loading" type="spinner" />
    <div v-else>
      <van-collapse v-model="activeNames">
        <van-collapse-item :title="list.title" name="1">
          {{ list.content }}
        </van-collapse-item>
      </van-collapse>
      <div class="btn">

      <van-button @click.stop="goToShop()" type="primary">下一步</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { onMounted, reactive, toRefs } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { Cell, List, Collapse, CollapseItem, Loading, Button } from "vant";
import { getCurrentInstance } from "vue";
import { getShopList, searchDreamDetail } from "@/api/api";
export default {
  name: "home",
  components: {
    [Cell.name]: Cell,
    [List.name]: List,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Loading.name]: Loading,
    [Button.name]: Button,
  },
  setup(props, ctx) {
    const { proxy } = getCurrentInstance();
    const activeNames = ref(["1"]);
    let data = reactive({
      list: [],
      loading: true,
      finished: true,
    });
    const router = useRouter();
    onMounted(() => {
      searchDreamDetail({
        area: "武汉",
        apiKey: "MLi5N8Fa82d8c4c876569aa09698ad23b9610cffaf62972",
      })
        .then(async (res) => {
          if (res.statusCode == "000000") {
            data.list = await res.result[0];
            data.loading = false;
            console.log("list.value====", data.list);
          }
        })
        .catch((err) => {
          console.log(err);
          proxy.$toast("网络异常");
        });
    });
    const goToShop = () => {
      router.push({
        name: "shop",
      });
    };
    return {
      goToShop,
      activeNames,
      ...toRefs(data),
    };
  },
};
</script>

<style lang="less" scoped>
@import url("@/style/var.less");

.page-shop-home {
  font-size: @font-size-32;
  .loading {
    text-align: center;
    padding-top: 30px;
  }
  .btn{
    padding: 20px 30px;
    .van-button{
      width: 100%;
      border-radius: 50px 50px;
    }
  }
}
</style>
