<template>
  <div class="page-shop">
    <div @click="goToDetail()">goToDetail</div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "shop",
  setup(props, ctx) {
    const router = useRouter();
    const goToDetail = () => {
      router.push({
        name: "shopDetail",
      });
    };
    return {
      goToDetail,
    };
  },
};
</script>

<style lang="less" scoped>
@import url("@/style/var.less");
.page-shop {
  font-size: @font-size-32;
}
</style>
