<template>
  <div class="home">
    <a-input-search
      v-model:value="searchText"
      placeholder="input search text"
      enter-button="Search"
      size="large"
      @search="onSearch"
    />
    <MyDivider />
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="文章">
        <PostList />
      </a-tab-pane>
      <a-tab-pane key="2" tab="图片" force-render>
        <PictureList />
      </a-tab-pane>
      <a-tab-pane key="3" tab="用户">
        <UserList />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import PostList from "@/components/PostList.vue";
import UserList from "@/components/UserList.vue";
import PictureList from "@/components/PictureList.vue";
import MyDivider from "@/components/MyDivider.vue";

const searchText = ref("");
const onSearch = (value: string) => {
  alert(value);
};
const activeKey = ref("1");
</script>
