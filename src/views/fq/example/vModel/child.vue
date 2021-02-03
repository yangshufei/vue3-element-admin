<template>
  <div>
    <input :value="text" @input="inputChange1" placeholder="">
    <input :value="modelValue" @input="inputChange2" placeholder="">
  </div>
  <p>
   <el-input :model-value="text1" @input="elInputChange1" placeholder=""></el-input>
  </p>
  <p>
   <el-input :model-value="text2" @input="elInputChange2" placeholder=""></el-input>
  </p>
</template>

<script>
export default {
  props: ['text', 'modelValue', 'text1', 'text2'],
  setup(props, { emit }) {
    const inputChange1 = (e) => {
      emit('update:text', e.target.value)
    }
    const inputChange2 = (e) => {
      emit('update:modelValue', e.target.value)
    }
    const elInputChange1 = (e) => {
      emit('update:text1', e)
    }
    const elInputChange2 = (e) => {
      emit('update:text2', e)
    }
    return {
      inputChange1,
      inputChange2,
      elInputChange1,
      elInputChange2
    }
  }
}
</script>
