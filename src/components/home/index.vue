<template>
  <div class="page-shop-home">
    <div @click="goToShop()">home</div>
    22222 233333 ssdada dasdsaf 啊啊啊啊啊啊 的撒发生大哥
  </div>
</template>
<script>
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
// import { getCurrentInstance } from "vue";
import { getShopList } from "@/api/api";
export default {
  name: "home",
  setup(props, ctx) {
    const router = useRouter();
    // const { proxy } = getCurrentInstance();
    const goToShop = () => {
      router.push({
        name: "shop",
      });
    };
    onMounted(() => {
      getShopList({
        area: "武汉",
        apiKey: "MLi5N8Fa82d8c4c876569aa09698ad23b9610cffaf62972",
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return {
      goToShop,
    };
  },
};
</script>

<style lang="less" scoped>
@import url("@/style/var.less");
.page-shop-home {
  font-size: @font-size-32;
}
</style>
