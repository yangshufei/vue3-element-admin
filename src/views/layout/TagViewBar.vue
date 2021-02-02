<template>
  <div class="tag-view-container">
    <span :class="['arrow-left', currentIndex === 0 && 'arrow-disabled']" @click="arrowLeft($event)">
      <i class="el-icon-fa fa-backward"></i>
    </span>
    <div class="scroll-pane-container">
      <scroll-pane ref="scrollPane">
        <span
          v-for="tag in Array.from(visitedViews)"
          :key="tag.path"
          :id="tag.path"
          class="tag-item-wrapper"
          @dblclick.prevent.stop="dbclickSelectTop(tag)"
        >
          <router-link
            ref="tag"
            class="tag-view-item"
            :class="isActive(tag)?'active':''"
            :to="tag.path"
          >
            {{tag.title }}
            <i
              class="el-icon-fa fa-times-circle"
              v-if="tag.title !== '首页'"
              @click.prevent.stop="closeSelectedTag(tag)"
            ></i>
          </router-link>
        </span>
      </scroll-pane>
    </div>
    <span :class="['arrow-right', currentIndex === visitedViews.length - 1 && 'arrow-disabled']" @click="arrowRight($event)">
      <i class="el-icon-fa fa-forward"></i>
    </span>
    <span class="handle-tags">
      <el-dropdown trigger="click" @command="handleTabs">
        <span class="dropdown-trigger">
          关闭操作
          <i class="el-icon-fa fa-caret-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="true">关闭全部选项卡</el-dropdown-item>
            <el-dropdown-item command="false">关闭其他选项卡</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
</template>

<script>
import ScrollPane from 'components/ScrollPane'

export default {
  name: 'TagViewBar',
  components: { ScrollPane },
  inject: ['appReload'],
  data() {
    return {
      selectedTag: {}
    }
  },
  watch: {
    $route(val) {
      this.selectedTag = {
        name: val.name,
        path: val.path,
        title: val.meta.title
      }

      this.addViewTags()

      this.$nextTick(() => {
        const el = document.getElementById(val.path)
        el && el.scrollIntoView()
      })
    },
    visible(value) {
      if (value) {
        window.addEventListener('click', this.closeMenu)
      } else {
        window.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.addViewTags()
  },

  computed: {
    visitedViews() {
      return this.$store.state.tagView.visitedViews
    },
    currentIndex() {
      return this.visitedViews.findIndex(x => x.path === this.$route.path)
    }
  },
  methods: {
    generateRoute() {
      if (this.$route.name) {
        return this.$route
      }
      return false
    },
    isActive(route) {
      return route.path === this.$route.path || route.name === this.$route.name
    },
    addViewTags() {
      const route = this.generateRoute()
      if (!route) {
        return false
      }
      this.$store.dispatch('addVisitedViews', route)
    },
    arrowLeft(e) {
      if (this.currentIndex) {
        this.$router.push(this.visitedViews[this.currentIndex - 1])
      }
    },
    arrowRight(e) {
      if (this.currentIndex < this.visitedViews.length - 1) {
        this.$router.push(this.visitedViews[this.currentIndex + 1])
      }
    },
    handleTabs(all) {
      if (all) {
        this.closeAllTags()
      } else {
        this.closeOthersTags()
      }
    },
    dbclickSelectTop(view) {
      this.appReload()
    },
    closeSelectedTag(view) {
      this.$store.dispatch('delVisitedViews', view).then((views) => {
        if (this.isActive(view)) {
          const latestView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView.path)
          } else {
            this.$router.push('/')
          }
        }
      })
    },
    closeOthersTags() {
      if (this.$refs.tag.length === 1) return
      this.$store.dispatch('delOthersViews', this.selectedTag)
    },
    closeAllTags() {
      if (this.$refs.tag.length === 1) return
      this.$store.dispatch('delAllViews', this.selectedTag)
      if (this.selectedTag.path !== '/home') {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
.tag-view-container {
  @include clearfix;
  position: relative;

  .handle-tags,
  .arrow-left,
  .arrow-right {
    display: inline-block;
    height: 100%;
    text-align: center;
    line-height: 40px;
    @include background_color("headerBg");
    cursor: pointer;
    padding: 0px 6px;
    font-size: 14px;

    &:hover {
      @include background_color("headerHoverBg");
      @include font_color("headerFontActive");
    }
  }

  .arrow-left {
    width: 40px;
    float: left;
    border-right: 1px solid;
    @include border_color("headerBorder");
  }
  .arrow-right {
    width: 40px;
    float: right;
    border-left: 1px solid;
    @include border_color("headerBorder");
  }
  .arrow-disabled {
    cursor: not-allowed;
    @include background_color("headerBg");
  }
  .handle-tags {
    float: right;
    border-left: 1px solid;
    @include border_color("headerBorder");
  }

  .scroll-pane-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 40px;
    right: 122px;
  }
}
.tag-item-wrapper {
  display: inline-block;
}
.tag-view-item {
  display: inline-block;
  padding: 0 15px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  border-right: 1px solid;
  @include border_color("headerBorder");

  &:hover {
    border-bottom: 2px solid;
    @include border_color("headerBorderActive");
    @include background_color("headerHoverBg");
    @include font_color("headerFontActive");
    @include border_right_color("headerBorder");
  }

  &.active {
    border-bottom: 2px solid;
    @include border_color("headerBorderActive");
    @include background_color("headerHoverBg");
    @include font_color("headerFontActive");
    @include border_right_color("headerBorder");
  }

  i {
    &:hover {
      @include font_color("headerFontActive");
    }
  }
}
</style>
