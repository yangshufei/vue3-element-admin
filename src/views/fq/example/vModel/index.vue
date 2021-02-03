<template>
  <content-body title="v-model双向绑定">
    <div class="v-model-wrapper">
      <p>可以定义多个v-model</p>
      <Child v-model:text="message1" v-model="message2" v-model:text1="message3" v-model:text2="message4"></Child>
      <p>input prop=text 绑定的值：{{message1}}</p>
      <p>input prop=modelValue 绑定的值{{message2}}</p>
      <p>el-input prop=text1 绑定的值：{{message3}}</p>
      <p>el-input prop=text2 绑定的值：{{message4}}</p>
    </div>
  </content-body>
</template>

<script>
import { ref } from 'vue'
import Child from './child'
export default {
  components: {
    Child
  },
  setup() {
    const message1 = ref('message1')
    const message2 = ref('message2')
    const message3 = ref('message3')
    const message4 = ref('message4')
    return {
      message1,
      message2,
      message3,
      message4
    }
  }
}
</script>
