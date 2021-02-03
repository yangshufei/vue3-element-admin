<template>
  <div class="calc-wrapper">
    <p>count: {{count}}</p>
    <p>provide/inject: {{provideData.name}}</p>
  </div>
</template>

<script>
import { ref, inject } from 'vue'
export default {
  setup() {
    const count = ref(1)

    const clacCount = () => {
      count.value = count.value + 2
    }

    // 父组件provide的数据
    const provideData = inject('provideData')

    return {
      count,
      clacCount,
      provideData
    }
  }
}
</script>
