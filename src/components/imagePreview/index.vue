<template>
  <el-dialog :title="title" v-model="dialogShow" @close="close">
    <div class="image-container" style="textAlign:center">
      <img :src="src" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">关 闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  props: {
    close: {
      type: Function
    },
    src: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '图片预览'
    }
  },
  setup() {
    return {
      dialogShow: true
    }
  }
}
</script>
