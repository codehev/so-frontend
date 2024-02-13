<template>
  <div id="pictureList">
    <!--gutter间隔 16px，后面是根据屏幕宽度来决定一行多少列，每列的宽度是240px-->
    <a-list
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }"
      :data-source="pictureList"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-card hoverable>
            <template #cover>
              <img :alt="item?.title" :src="item?.url" width="100px" />
            </template>
            <a-card-meta :title="item?.title">
              <template #description>www.instagram.com</template>
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
  pictureList: any[];
}

/**
 * 组件属性，并给出默认值
 */
let props = withDefaults(defineProps<Props>(), {
  pictureList: () => [],
});
</script>

<style scoped></style>
