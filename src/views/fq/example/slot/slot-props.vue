<template>
  <!-- 作用域插槽 -->
  <!-- 插槽内容能够访问子组件中才有的数据 -->
  <ul>
    <li v-for="( item, index ) in ['apple', 'orange']" :key="index">
      <!-- slot内容提供给父组件 -->
      <slot :item="item"></slot>
    </li>
  </ul>
</template>
