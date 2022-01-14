<template>
  <div class="page-shop">
    <van-loading class="loading" v-if="loading" type="spinner" />
    <van-card
    v-else
      v-for="(items, index) in dataList"
      :key="index"
      num="2"
      :price="items.price || '--'"
      :desc="items.engName"
      :title="items.name"
      :thumb="items.coverURL"
       @click="goToDetail()"
    />
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { dogFamily } from "@/api/api";
import { onMounted, reactive, ref, toRefs } from "@vue/runtime-core";
import { Card,Loading } from "vant";
import { getCurrentInstance } from "vue";
export default {
  name: "shop",
  components: {
    [Card.name]: Card,
    [Loading.name]: Loading,
  },
  setup(props, ctx) {
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const formData = reactive({
      pages: {
        pageSize: 30,
        pageNum: 1,
        totalCount: 0,
      },
      loading:true,
      keyword: "",
      dataList:[]
    });
    const goToDetail = () => {
      router.push({
        name: "shopDetail",
      });
    };
    onMounted(() => {
      const { pageSize, pageNum } = formData.pages;
      dogFamily({
        apiKey: "MLi5N8Fa82d8c4c876569aa09698ad23b9610cffaf62972",
        page: pageNum,
        pageSize: pageSize,
        keyword: "",
      }).then((res) => {
        if (res.statusCode == "000000") {
          formData.dataList.push(...res.result.petFamilyList);
          formData.loading = false;
          console.log(formData.dataList);
        }
      }).catch((err) => {
          console.log(err);
          proxy.$toast("网络异常");
        });;
    });
    return {
      goToDetail,
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
}
</style>
