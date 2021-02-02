<template>
  <el-dialog title="编辑" v-model="dialogShow" :close-on-click-modal="false" :append-to-body="true">
    <el-form label-width="100px" ref="form" :model="form" inline :rules="rules">
      <el-form-item label="活动名称：" prop="aptIcao" >
        <el-input v-model="form.aptIcao" placeholder="请输入" disabled></el-input>
      </el-form-item>
      <el-form-item label="活动区域：" prop="aptCName">
        <el-input v-model="form.aptCName" placeholder="请输入" disabled></el-input>
      </el-form-item>
      <div>
        <el-form-item label="活动类别：" prop="altiplano">
          <el-radio-group v-model="form.altiplano">
            <el-radio label="1">1</el-radio>
            <el-radio label="2">2</el-radio>
            <el-radio label="3">3</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <el-form-item label="活动性质：" prop="flags">
        <el-checkbox-group v-model="form.flags">
          <el-checkbox label="0">1</el-checkbox>
          <el-checkbox label="1">2</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">保 存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    detailRow: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      form: {
        aptIcao: '',
        aptCName: '',
        altiplano: '',
        flags: []
      },
      rules: {
        altiplano: { required: true, message: '请选择活动类别', trigger: 'change' },
        flags: { required: true, message: '请选择活动性质', trigger: 'change' }
      }
    }
  },
  methods: {
    confirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$notify({
            type: 'success',
            message: '修改成功'
          })
          this.dialogShow = false
          this.$emit('reload')
        }
      })
    }
  },
  computed: {
    dialogShow: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update:show', val)
      }
    }
  },
  created() {
    this.form = { ...JSON.parse(JSON.stringify(this.detailRow)), ...{ flags: [] }}
    const map = {
      '0': ['0'],
      '1': ['1'],
      '2': ['0', '1']
    }
    this.form.flags = map[this.form.flag] || []
  }
}
</script>
