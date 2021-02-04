<template>
  <content-body title="watch && watchEffect">
    <div class="watch-wrapper">
      <el-button type="primary" @click="num++">num+1(查看打印情况)</el-button>
      <p>num: {{num}}</p>
    </div>
  </content-body>
</template>

<script>
import { ref, reactive, watch, watchEffect } from 'vue'
export default {
  setup() {
    // 因为 watch 方法的第一个参数我们已经指定了监听的对象，因此当组件初始化时，不会执行第二个参数中的回调函数，
    // 若我们想让其初始化时就先执行一遍，可以在第三个参数对象中设置 immediate: true
    // watch 方法默认是渐层的监听我们指定的数据，例如如果监听的数据有多层嵌套，深层的数据变化不会触发监听的回调，
    // 若我们想要其对深层数据也进行监听，可以在第三个参数对象中设置 deep: true

    const num = ref(0)
    watch(num, (newValue, oldValue) => {
      console.log(`原值为${oldValue}`)
      console.log(`新值为${newValue}`)
    })

    const state = reactive({ count: 0, name: 'zs' })

    watch(
      [() => state.count, () => state.name],
      ([newCount, newName], [oldvCount, oldvName]) => {
        console.log(oldvCount) // 旧的 count 值
        console.log(newCount) // 新的 count 值
        console.log(oldvName) // 旧的 name 值
        console.log(newName) // 新的 name 值
      }
    )

    setTimeout(() => {
      state.count++
      state.name = '2s'
    }, 2000)

    // watchEffect
    // 不需要手动传入依赖
    // 每次初始化时会执行一次回调函数来自动获取依赖
    // 无法获取到原值，只能得到变化后的值
    watchEffect(() => {
      console.log('watchEffect', state.count)
      console.log('watchEffect', state.name)
    })

    return {
      num
    }
  }
}
</script>
