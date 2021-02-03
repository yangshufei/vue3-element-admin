<template>
<content-body title="组件通信、获取标签元素">
  <p ref="pRef">p标签元素</p>
  <el-button type="primary" @click="calcHandle">数量加2（调用子组件方法）</el-button>
  <child ref="childRef"/>
</content-body>
</template>

<script>
import { ref, reactive, provide, getCurrentInstance, onMounted } from 'vue'
import { useStore } from 'vuex'
import child from './child'
export default {
  components: { child },
  setup() {
    // 创建一个DOM引用，名称必须与元素的ref属性名相同
    const pRef = ref(null)
    // 在挂载后才能通过 pRef 获取到目标元素
    onMounted(() => {
      setTimeout(() => {
        pRef.value.innerHTML = '内容被修改'
      }, 3000)
    })

    const childRef = ref(null)
    const calcHandle = () => {
      // 父组件调用子组件的方法来获取数据
      childRef.value.clacCount()
    }

    const provideData = reactive({
      name: '很好'
    })
    // provide/inject通信
    provide('provideData', provideData)

    // 获取当前组件的实例（只是在开发环境下用于调试使用的）
    const instance = getCurrentInstance()
    console.log(instance.ctx, '当前组件的实例')

    // 获取 vuex 实例
    const store = useStore()
    console.log(store)

    return {
      pRef,
      childRef,
      calcHandle
    }
  }
}
</script>
