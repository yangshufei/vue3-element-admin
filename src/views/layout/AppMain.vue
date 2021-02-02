<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <!-- 缓存页面 -->
      <keep-alive :include="cachedViews">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagView.cachedViews
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .app-main {
    position: absolute;
    top: 42px;
    bottom: 36px;
    left: 0;
    right: 0;
    overflow: auto;
    padding: 10px;
  }
</style>
