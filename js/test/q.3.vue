<!--
 * @Author: xiaohuolong
 * @Date: 2021-06-30 13:23:42
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-06-30 13:23:59
 * @FilePath: /js-demo/js/question/q.3.vue
-->
<template>
<!-- 虚拟列表 -->
  <div class="list-view" @scroll="handleScroll">
    <div
      class="list-view-phantom"
      :style="{
        height: contentHeight + 'px',
      }"
    ></div>
    <div ref="content" class="list-view-content">
      <div
        class="list-view-item"
        :key="key"
        :style="{
          height: itemHeight + 'px',
        }"
        v-for="(item, key) in visibleData"
      >
        {{ item.value }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: new Array(1000).fill(0).map((v, k) => {
        return {
          value: k,
        };
      }),
      itemHeight: 30,
      visibleData: [],
    };
  },
  computed: {
    contentHeight() {
      return this.data.length * this.itemHeight;
    },
  },
  mounted() {
    this.updateVisibleData();
  },
  methods: {
    updateVisibleData(scrollTop = 0) {
      const visibleCount = Math.ceil(this.$el.clientHeight / this.itemHeight);
      const start = Math.floor(scrollTop / this.itemHeight);
      const end = start + visibleCount;
      this.visibleData = this.data.slice(start, end);
      this.$refs.content.style.webkitTransform = `translate3d(0, ${
        start * this.itemHeight
      }px, 0)`;
    },
    handleScroll() {
      this.updateVisibleData(this.$el.scrollTop);
    },
  },
};
</script>

<style>
.list-view {
  height: 400px;
  overflow: auto;
  position: relative;
  border: 1px solid;
}
.list-view-phantom {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
}
.list-view-content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.list-view-item {
  padding: 5px;
  color: #666;
  line-height: 30px;
  box-sizing: border-box;
}
</style>
