<template>
  <div id="postList">
    <a-list item-layout="horizontal" :data-source="data.records">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta :description="item.content">
            <template #title>
              <a href="https://www.antdv.com/">{{ item.title }}</a>
            </template>
            <template #avatar>
              <a-avatar :src="item?.user?.userAvatar" />
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from "vue";

interface Props {
  data: any;
}

/**
 * 组件属性，并给出默认值
 */
let props = withDefaults(defineProps<Props>(), {
  data: () => null,
});
</script>

<style scoped></style>
