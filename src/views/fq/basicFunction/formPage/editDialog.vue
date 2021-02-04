<template>
  <el-dialog
    title="编辑"
    v-model="dialogShow">
    <el-form label-width="100px" ref="formRef" :model="form" inline :rules="rules">
      <el-form-item label="活动名称：" prop="name">
        <el-input v-model="form.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="活动区域：" prop="region">
         <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <div>
        <el-form-item label="活动性质：" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio label="美食/餐厅线上活动" name="type"></el-radio>
            <el-radio label="地推活动" name="type"></el-radio>
            <el-radio label="线下主题活动" name="type"></el-radio>
            <el-radio label="单纯品牌曝光" name="type"></el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { computed, toRefs, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
export default {
  props: {
    show: Boolean,
    detailRow: Object
  },
  setup(props, { emit }) {
    const formRef = ref(null)
    const state = reactive({
      form: {
        name: '',
        region: '',
        type: ''
      }
    })

    const dialogShow = computed({
      get() {
        return props.show
      },
      set(val) {
        emit('update:show', val)
      }
    })

    // methods
    function confirm() {
      formRef.value.validate((valid) => {
        if (valid) {
          dialogShow.value = false
        } else {
          ElMessage.error('编辑失败')
        }
      })
    }

    // 初始赋值
    state.form = JSON.parse(JSON.stringify(props.detailRow))

    return {
      formRef,
      ...toRefs(state),
      rules: {
        name: { required: true, message: '请输入活动名称', trigger: 'blur' }
      },
      dialogShow,
      confirm
    }
  }
}
</script>
