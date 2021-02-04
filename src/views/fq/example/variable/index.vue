<template>
  <content-body title="Ref And Reactive">
    <div class="variable-wrapper">
      <p>reactiveObj: {{reactiveObj.name}} {{reactiveObj.age}}</p>
      <p>refObj: {{refObj.name}} {{refObj.age}}</p>
      <p>refArray: {{refArray[0]}}</p>
      <p>form: {{form.name}}</p>
    </div>
    <cpt :title="getTitle"></cpt>
  </content-body>
</template>

<script>
import { ref, unref, reactive, computed, toRefs } from 'vue'
import cpt from './cpt'
export default {
  components: {
    cpt
  },
  setup() {
    // ref 就是通过 reactive 包装了一个对象 ，然后是将值传给该对象中的 value 属性,这也就解释了为什么每次访问时我们都需要加上 .value
    const refObj = ref({
      name: 'jac',
      age: 20
    })
    console.log(refObj.value.name, unref(refObj).name, 'unref')

    const inputname = ref('')

    const refArray = ref(['111', '222'])

    // reactive 方法是用来创建一个响应式的数据对象
    const reactiveObj = reactive({
      name: 'jac',
      age: 20
    })

    const state = reactive({
      form: {
        name: 'form',
        age: 2
      },
      tableData: []
    })

    const getTitle = computed(() => {
      return '哈哈哈哈'
    })

    setTimeout(() => {
      reactiveObj.name = 'yyy'
      reactiveObj.age = 18

      refObj.value = { name: 'refobj', age: 1 }
      refArray.value = ['444']

      state.form = {
        name: 'newForm',
        age: 3
      }
      console.log(reactiveObj, refObj.value.name)
    }, 2000)

    return {
      reactiveObj,
      refObj,
      refArray,
      ...toRefs(state),
      getTitle,
      inputname
    }
  }

}
</script>
