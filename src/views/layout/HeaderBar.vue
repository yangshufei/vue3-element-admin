<template>
  <div class="headerbar-container">
    <div class="header-left">
      <span class="trigger" @click="trigger"><i class="el-icon-fa fa-bars"></i></span>
    </div>
    <div class="nav-container">
      <tag-view-bar />
    </div>
    <div class="header-right">
      <span>
        <el-dropdown trigger="click" @command="handleUsers">
          <span class="dropdown-trigger"><i class="el-icon-fa fa-user"></i> 欢迎，{{name}}<i class="el-icon-fa fa-caret-down el-icon--right"></i></span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="swichTheme">切换主题</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </span>
    </div>

    <div class="public-dialog__wrapper">
      <el-dialog
        title="主题选择"
        v-model="dialogVisible"
        width="300px"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :before-close="()=>{dialogVisible=false}">
        <el-radio-group v-model="theme">
          <div v-for="item in themeList" :key="item.key" style="margin:0 0 10px 30px">
            <el-radio :label="item.key">{{item.label}}</el-radio>
          </div>
        </el-radio-group>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="()=>{dialogVisible=false}" :loading="loadingFlag">取 消</el-button>
            <el-button type="primary" @click="dialogConfirm" :loading="loadingFlag">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TagViewBar from './TagViewBar.vue'

export default {
  name: 'HeaderBar',
  components: {
    TagViewBar
  },
  props: {
    collapse: Boolean
  },
  data() {
    return {
      isCollapse: this.collapse,
      dialogVisible: false,
      loadingFlag: false,
      theme: '',
      themeList: [
        {
          key: 'dark',
          label: '暗主题'
        },
        {
          key: 'light',
          label: '亮主题'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'baseURL'
    ])
  },

  methods: {
    trigger() {
      this.isCollapse = !this.isCollapse
      this.$emit('update:collapse', this.isCollapse)
    },
    handleUsers(type) {
      switch (type) {
        case 'logout':
          this.logout()
          break
        case 'swichTheme':
          this.themeDialog()
          break
        default :
          console.log('handle !!')
          break
      }
    },
    logout() {
      this.$store.dispatch('LogOut', this.baseURL.ADMIN).then(() => {
        location.reload()
      })
    },
    themeDialog() {
      this.theme = this.$store.getters.theme
      this.loadingFlag = false
      this.dialogVisible = true
    },
    swichTheme(theme) {
      this.$store.dispatch('SwitchTheme', theme)
      this.loadingFlag = true
      setTimeout(() => {
        this.$notify({
          type: 'success',
          message: '主题切换成功'
        })
        this.dialogVisible = false
      }, 300)
    },
    dialogConfirm() {
      this.swichTheme(this.theme)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  $theme-light: (
    headerBg: #FFFFFF,
    headerHoverBg: #F7F8F8,
    headerBorder: #DDDDDD,
    headerBorderActive: #8CD3FF,
    headerFont: #000,
    headerFontActive: #000,
  );

  $theme-dark: (
    headerBg: #373E4A,
    headerHoverBg: #212936,
    headerBorder: #3E495B,
    headerBorderActive: #8CD3FF,
    headerFont: #AFBDD1,
    headerFontActive: #AFBDD1,
  );

  @import "styles/themesHandle.scss";
  .headerbar-container {
    @include background_color("headerBg");
    border-bottom: 2px solid;
    @include border_color("headerBorder");
    @include font_color("headerFont");
    display: table;
    border-collapse: separate;

    & > div {
      display: table-cell;

      & > span {
        display: inline-block;
        height: 100%;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        padding: 0px 6px;
        font-size: 14px;

        &:hover {
          @include background_color("headerHoverBg");
          @include font_color("headerFontActive");
        }

        & + span {
          border-right: 1px solid;
          @include border_color("headerBorder");
        }
      }
      .notice,
      .trigger {
        width: 40px;
      }
    }
    .header-left {
      width: 1%;
      position: relative;
      font-size: 0;
      white-space: nowrap;
      vertical-align: middle;
      border-right: 1px solid;
      @include border_color("headerBorder");
    }
    .header-right {
      width: 1%;
      position: relative;
      font-size: 0;
      white-space: nowrap;
      vertical-align: middle;
      border-left: 1px solid;
      @include border_color("headerBorder");
    }
    .nav-container {
      width: 100%;
    }

  }

</style>
