<template>
  <el-submenu
    :index="routes.path"
    v-if="routes.children && routes.children.length > 0"
    :class="isroot ? 'root' : ''"
  >
    <template #title>
      <i class="el-icon-fa" :class="routes.meta.icon" v-if="routes.meta.icon"></i>
      <span>{{routes.meta.title }}</span>
    </template>
    <siderbar-item
      v-for="children in routes.children"
      :index="children.path"
      :key="children.path"
      :routes="children"
    />
  </el-submenu>
  <router-link :to="routes.path" v-else>
    <el-menu-item :index="routes.path">
      <i class="el-icon-fa" :class="routes.meta.icon" v-if="routes.meta.icon"></i>
      <i class="el-icon-fa fa-circle" v-else></i>
      <template #title>{{ routes.meta.title }}</template>
    </el-menu-item>
  </router-link>
</template>

<script>
export default {
  name: 'SiderbarItem',
  props: {
    routes: Object,
    isroot: {
      type: Boolean,
      default: false
    }
  }
}
</script>
