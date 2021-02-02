<template>
  <div class="app-wrapper">
    <sider-bar :collapse="isCollapse" />
    <div :class="mainClass">
      <app-main />
      <header-bar v-model:collapse="isCollapse" />
      <footer-bar />
    </div>
  </div>
</template>

<script>
import { SiderBar, HeaderBar, FooterBar, AppMain } from '@/views/layout'

export default {
  name: 'layout',
  components: {
    SiderBar,
    HeaderBar,
    FooterBar,
    AppMain
  },
  data() {
    return {
      isCollapse: false,
      mainClass: 'main-container',
      screenWidth: document.body.clientWidth
    }
  },
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    }
    this.handleBro()
  },
  watch: {
    screenWidth(val) {
      /** 为了避免频繁触发resize函数导致页面卡顿，使用定时器 */
      if (!this.timer) {
        this.screenWidth = val
        this.timer = true
        const that = this
        setTimeout(() => {
          if (that.screenWidth < 1400) {
            that.isCollapse = true
          } else {
            that.isCollapse = false
          }
          this.timer = false
        }, 400)
      }
    },
    isCollapse(val) {
      this.mainClass = val
        ? 'main-container is-collapse'
        : 'main-container'
    }
  },
  methods: {
    handleBro() {
      if (this.screenWidth < 1400) {
        this.isCollapse = true
      } else {
        this.isCollapse = false
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100vh;
    width: 100%;

    .main-container {
      margin-left: 220px;
      min-height: 100%;
      position: relative;
      transition: margin-left 0.28s ease-out;

      &.is-collapse {
        margin-left: 64px;
      }
    }
  }
</style>
