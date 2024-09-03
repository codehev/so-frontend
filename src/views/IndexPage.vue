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
      <a-tab-pane key="post" tab="帖子">
        <PostList :postList="postList" />
      </a-tab-pane>
      <a-tab-pane key="picture" tab="图片" force-render>
        <PictureList :pictureList="pictureList" />
      </a-tab-pane>
      <a-tab-pane key="user" tab="用户">
        <UserList :userList="userList" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, watchEffect } from "vue";
import PostList from "@/components/PostList.vue";
import UserList from "@/components/UserList.vue";
import PictureList from "@/components/PictureList.vue";
import MyDivider from "@/components/MyDivider.vue";
import { useRoute, useRouter } from "vue-router";
import {
  listPicture,
  listPost,
  listUser,
  searchAll,
} from "@/service/searchApi";
import { message } from "ant-design-vue";

const router = useRouter();
const route = useRoute();

// tab页签key（标签页选项的key，路径参数params值）,初始值是防止路由跳转后，tab页签key丢失
const activeKey = ref(route.params.category && "post");

interface QueryRequest {
  type?: string;
  searchText: string;
  current: number;
  pageSize: number;
}

let initialParams = {
  type: "post",
  searchText: "",
  current: 1,
  pageSize: 10,
};
// 搜索参数，？之后
let searchParams = ref<QueryRequest>(initialParams);

let postList = ref([]);
let pictureList = ref([]);
let userList = ref([]);

//异步请求获取初始数据，必须在mounted中使用，因为mounted在组件挂载后执行，
// 直接setup中写异步请求可能在组件挂载前执行，导致页面无法渲染
const loadData = async (params: QueryRequest) => {
  console.log("params=" + JSON.stringify(params));
  let type = params.type;
  if (!type) {
    message.error("搜索类型为空");
    return;
  }
  //后端已参数优化，不需前端参数转换，直接使用searchText即可
  //改进成聚合接口，一个请求搞定，不需每个tab发一个请求
  let res = await searchAll(params);
  //if else可以通过设计模式优化
  if (type === "post") {
    // 后端是根据title搜索帖子,会把searchText作为title搜索
    postList.value = res?.postVOList;
  } else if (type === "picture") {
    // 后端是根据searchText搜索图片
    pictureList.value = res?.pictureList;
  } else if (type === "user") {
    //后端是根据userName搜索用户
    userList.value = res?.userVOList;
  }
};
/**
 * 初始化数据
 */
onMounted(async () => {
  // console.log("mounted=" + JSON.stringify(searchParams.value));
  await loadData(initialParams);
});
/**
 * 记录搜索状态：把同步状态改成单向，即只允许 url 来改变页面状态，不允许反向
 * 1. 让用户在操作的时候，改变 url 地址（点击搜索框，搜索内容填充到 url 上？切换 tab 时，也要填充）
 * 2. 当 url 改变的时候，去改变页面状态（监听 url 的改变）
 */
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
  // await loadData({ ...searchParams.value, searchText: value });
};

// 1. tab页签切换,更新路径参数params，并保持query参数
const onTabChange = async (key: string) => {
  // console.log("key==========>" + key);
  activeKey.value = key;
  await router.push({
    name: "category",
    query: {
      ...searchParams.value,
      type: key,
    },
    // 动态路由的参数category
    params: {
      category: key,
    },
  });
};

// 2. 监听路由url变化，更新搜索参数(更新响应式变量值），达到刷新页面还能保持页面状态
// 会立即调用，初始化数据
watch(
  [
    () => route.query.searchText as string,
    () => route.params.category as string,
  ],
  (newValue, oldValue) => {
    console.log("数据变化了", newValue, oldValue);
    //未找到返回undefined
    let searchText = newValue[0];
    let type = newValue[1];
    //searchText空字符串可转化为逻辑false
    if (searchText || type) {
      searchParams.value = {
        ...searchParams.value,
        searchText,
        type,
      };
      loadData(searchParams.value);
      return;
    }
    if (!searchText) {
      searchParams.value = {
        ...searchParams.value,
        searchText: "",
      };
    }
    if (!type) {
      searchParams.value = {
        ...searchParams.value,
        type: "post",
      };
    }
    loadData(searchParams.value);
  },
  { immediate: true }
);
</script>
