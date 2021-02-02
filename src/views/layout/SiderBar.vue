<template>
  <div :class="containerClass">
    <div class="logo"></div>
    <div class="nav-container">
      <el-scrollbar
        tag="div"
        wrap-class="el-select-dropdown__wrap siderbar-scrollbar"
        view-class="el-select-dropdown__list"
        class="siderbar-scrollbar-container"
      >
        <el-menu :collapse="collapse" :default-active="$route.path" unique-opened >
          <template v-for="menu in routes">
            <siderbar-item
              :key="menu.path"
              v-if="!menu.hidden"
              :routes="menu"
              isroot
            />
          </template>
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SiderbarItem from './SiderbarItem'

export default {
  name: 'Siderbar',
  props: {
    collapse: Boolean
  },
  components: { SiderbarItem },
  data() {
    return {
      containerClass: 'siderbar-container'
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers'
    ]),
    routes() {
      const routes = this.permission_routers.filter(route => !route.hidden).map(route => this.formartterRoute(route))
      return routes
    }
  },
  watch: {
    collapse(val) {
      this.containerClass = val
        ? 'siderbar-container is-collapse'
        : 'siderbar-container'
    }
  },
  methods: {
    formartterRoute(route) {
      const tmpMap = {}
      if (route.children) {
        route.children.forEach(item => {
          tmpMap[item.name] = item
        })
        route.children.forEach(item => {
          if (!item.meta.parent) return
          const p = tmpMap[item.meta.parent]
          if (p && item.name !== item.meta.parent) {
            if (!p.children) {
              p.children = []
            }
            p.children.push(item)
          }
        })
        route.children = route.children.filter(item => item.meta.parent === route.name)
      }
      return route
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  $theme-light: (
    sideBg: #122E51,
    sideMenuBg: #122E51,
    sideMenuOpenBg: #122E51,
    sideSelectBg: #4A7299,
    sideSelectFont: #FFFFFF,
    sideFont: #FFFFFF,
  );

  $theme-dark: (
    sideBg: #37465C,
    sideMenuBg: #2B3648,
    sideMenuOpenBg: #2B3648,
    sideSelectBg: #2B3648,
    sideSelectFont: #409EFF,
    sideFont: #AFBDD1,
  );

  @import "styles/themesHandle.scss";
  .siderbar-container {
    float: left;
    height: 100%;
    width: 220px;
    @include background_color("sideBg");
    transition: width 0.28s ease-out;
    position: relative;
    box-shadow: 0 5px 10px 4px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);

    .logo {
      width: 100%;
      height: 168px;
      background: #23272D url('../../assets/images/layout-logo.png') no-repeat center center;
      background-size: 100% 100%;
      transition: all 0.28s ease-out;
      color: #fff;
      font-size: 24px;
      line-height: 168px;
      text-align: center;
      position: absolute;
      top: 0;
      left: 0;
    }

    .nav-container {
      padding-top: 168px;
      height: 100%;
      box-sizing: border-box;
      .siderbar-scrollbar-container {
        height: 100%;
        .el-menu {
          @include background_color("sideMenuBg");
          border-right: none;
        }
        .el-submenu.is-opened.root {
          @include background_color("sideMenuOpenBg");
        }
        .el-submenu .el-menu-item:hover,
        .el-submenu .el-menu-item:focus,
        .el-submenu__title:hover,
        .el-menu-item.is-active {
          @include background_color("sideSelectBg");
          @include font_color("sideSelectFont");
          border-color: #97CBFF !important;
        }
        .el-menu-item,
        .el-submenu__title {
          height: 46px;
          line-height: 46px;
          @include border_color("sideMenuBg");
          @include font_color("sideFont");
          i {
            @include font_color("sideFont");
          }
          &:hover i, &.is-active i {
            @include font_color("sideSelectFont");
          }
        }
      }
      .siderbar-scrollbar {
        max-height: 100%;
        overflow-x: hidden;
      }
    }

    &.is-collapse{
      width: 64px;
      .nav-container {
        padding-top: 64px;
      }
      .logo {
        height: 64px;
        @include background_color("sideBg");
        background-image: url('../../assets/images/layout-logo.png');
        div {
          display: none;
        }
      }
    }
  }
</style>
