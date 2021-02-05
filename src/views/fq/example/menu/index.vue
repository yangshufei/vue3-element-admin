<template>
  <content-body title="递归菜单">
    <nest-menu :menuData="data" :activeIds="ids" @change="activeIdsChange" />
  </content-body>
</template>

<script>
import { ref } from 'vue'
import nestMenu from './nestMenu'
import data from './menu.js'
export default {
  name: 'menus',
  setup() {
    // 假设默认选中 id 为 7
    const activeId = 7
    const findPath = (menus, targetId) => {
      let ids
      const traverse = (subMenus, prev) => {
        if (ids) {
          return
        }
        if (!subMenus) {
          return
        }
        subMenus.forEach((subMenu) => {
          if (subMenu.id === activeId) {
            ids = [...prev, activeId]
            return
          }
          traverse(subMenu._child, [...prev, subMenu.id])
        })
      }
      traverse(menus, [])
      return ids
    }
    const ids = ref(findPath(data, activeId))
    const activeIdsChange = (newIds) => {
      ids.value = newIds
      console.log('当前选中的id路径', newIds)
    }
    return {
      ids,
      activeIdsChange,
      data
    }
  },
  components: {
    nestMenu
  }
}
</script>
