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
import { ref, reactive, computed, toRefs } from 'vue'
import cpt from './cpt'
export default {
  components: {
    cpt
  },
  setup() {
    const refObj = ref({
      name: 'jac',
      age: 20
    })
    const inputname = ref('')

    const refArray = ref(['111', '222'])
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
