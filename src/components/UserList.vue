<template>
  <div id="userList">
    <!--gutter间隔 16px，后面是根据屏幕宽度来决定一行多少列，每列的宽度是240px-->
    <a-list
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }"
      :data-source="userList"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-card hoverable>
            <template #cover>
              <img :alt="item?.title" :src="item?.userAvatar" width="100px" />
            </template>
            <a-card-meta :title="item?.userName">
              <template #description>{{ item?.userProfile }}</template>
            </a-card-meta>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from "vue";

interface Props {
  userList: any[];
}

/**
 * 组件属性，并给出默认值
 */
let props = withDefaults(defineProps<Props>(), {
  userList: () => [],
});
</script>

<style scoped></style>
