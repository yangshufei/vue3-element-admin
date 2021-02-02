<template>
  <div id="app">
    <router-view v-if='isRouterAlive'/>
  </div>
</template>

<script>
export default {
  name: 'APP',
  provide() {
    return {
      appReload: this.appReload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    // 刷新方法
    appReload: function() {
      this.isRouterAlive = false
      // 该方法会在dom更新后执行
      this.$nextTick(function() { this.isRouterAlive = true })
    }
  }
}
</script>
