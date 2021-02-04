<template>
  <content-body title="slot的使用">
    <!-- 普通插槽 -->
    <slot-btn>Save</slot-btn>
    <!-- 具名插槽 -->
    <slot-layout>
      <template v-slot:header>
        <h1>Here might be a page title</h1>
      </template>
      <template v-slot:default>
        <p>A paragraph for the main content.</p>
        <p>And another one.</p>
      </template>
      <!-- 缩写 -->
      <template #footer>
        <p>Here's some contact info</p>
      </template>
    </slot-layout>

    <slot-props>
      <!-- slotProps 可以任意命名-->
      <!--v-slot是缩写 全称是v-slot:default -->
      <template v-slot="slotProps">
        <i class="fa fa-check"></i>
        <span class="green">{{ slotProps.item }}</span>
      </template>
    </slot-props>

    <slot-props>
      <!-- 可以使用解构 {item} ||  重命名{item: todo}-->
      <template v-slot="{item: tode}">
        <i class="fa fa-check"></i>
        <span class="green">{{ tode }}</span>
      </template>
    </slot-props>
  </content-body>
</template>

<script>
import slotBtn from './slot-btn'
import slotLayout from './slot-layout'
import slotProps from './slot-props'
export default {
  components: {
    slotBtn,
    slotLayout,
    slotProps
  }

}
</script>
