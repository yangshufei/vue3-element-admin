<template>
  <div>{{title}}</div>
  <div>{{cptContent}}</div>
</template>

<script>
import { ref } from 'vue'
export default {
  props: {
    title: String
  },
  setup(props, context) {
    const cptContent = ref('pppp')
    console.log(props.title)

    setTimeout(() => {
      cptContent.value = '内容'
    }, 2000)

    return {
      cptContent
    }
  }
}
</script>
