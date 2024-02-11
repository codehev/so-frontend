<template>
  <div class="home">
    <a-input-search
      v-model:value="searchParams.searchText"
      enter-button="Search"
      size="large"
      @search="onSearch"
    />
    <MyDivider />
    <a-tabs v-model:activeKey="activeKey" @change="onTabChange">
      <a-tab-pane key="article" tab="文章">
        <PostList :data="postPageData" />
      </a-tab-pane>
      <a-tab-pane key="picture" tab="图片" force-render>
        <PictureList :data="picturePageData" />
      </a-tab-pane>
      <a-tab-pane key="user" tab="用户">
        <UserList :data="userPageData" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watchEffect } from "vue";
import PostList from "@/components/PostList.vue";
import UserList from "@/components/UserList.vue";
import PictureList from "@/components/PictureList.vue";
import MyDivider from "@/components/MyDivider.vue";
import { useRoute, useRouter } from "vue-router";
import { listPicture, listPost, listUser } from "@/service/searchApi";

const router = useRouter();
const route = useRoute();

// tab页签key（标签页选项的key，路径参数params值）
const activeKey = ref("article");

interface QueryRequest {
  searchText?: string;
  current: number;
  pageSize: number;
}

// 搜索参数，？之后
let searchParams = ref<QueryRequest>({
  searchText: "",
  current: 1,
  pageSize: 10,
});

let postPageData = ref({});
let picturePageData = ref({});
let userPageData = ref({});

//异步请求获取初始数据，必须在mounted中使用，因为mounted在组件挂载后执行，
// 直接setup中写异步请求可能在组件挂载前执行，导致页面无法渲染
const toSearch = async (params: QueryRequest) => {
  // 后端是根据title搜索帖子,会把searchText作为title搜索
  postPageData.value = await listPost(params);
  // 后端是根据搜索文本搜索图片
  picturePageData.value = await listPicture({ ...params });
  //后端是根据userName搜索用户
  userPageData.value = await listUser({
    ...params,
    userName: params.searchText,
  });
};
/**
 * 初始化数据
 */
onMounted(async () => {
  await toSearch(searchParams.value);
});

// 1. 更新url？之后的参数（query参数）
const onSearch = async (value: string) => {
  // todo 也没显示传参，输入框的值怎么来的
  // alert(value);
  //直接在当前路由拼接url参数
  await router.push({
    query: {
      searchText: value,
    },
  });
  //直接搜索，不去等watchEffect监听路由变化之后再搜索
  await toSearch({ ...searchParams.value, searchText: value });
};
// 1. tab页签切换,更新路径参数params，并保持query参数
const onTabChange = (key: string) => {
  // console.log("key==========>" + key);
  activeKey.value = key;
  router.push({
    name: "category",
    query: searchParams.value,
    params: {
      category: key,
    },
  });
};

// 2. 监听路由变化，更新搜索参数(更新响应式变量值），而非url，达到刷新页面还能保持页面状态
watchEffect(() => {
  searchParams.value = {
    ...searchParams.value,
    searchText: route.query.searchText as string,
  };
});
</script>
