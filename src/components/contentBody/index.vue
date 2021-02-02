<template>
<div class="content-body">
  <div class="page-title" v-if="(title || $slots.title)">
    <i class="icon-round"></i>
    <slot name="title">
      <h4>{{title}}</h4>
    </slot>
  </div>
  <div class="filter bg-section" v-if="$slots.filter">
    <slot name="filter" />
  </div>
  <div class="content">
    <slot />
  </div>
  <div class="footer" v-if="$slots.footer">
     <slot name="footer" />
  </div>
</div>
</template>

<script>
export default {
  name: 'contentBody',
  props: {
    title: String
  }
}
</script>

<style lang="scss">
$theme-light: (
  bgSection: #f5f5f5,
  contentBg: #fff,
);

$theme-dark: (
  bgSection: #3E495B,
  contentBg: #2B3648,
);
@import "styles/themesHandle.scss";
 .content-body{
   @include background_color("contentBg");
   padding: 10px;
   margin-bottom: 10px;
  .page-title{
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    .icon-round {
      width: 15px;
      height: 15px;
      background-color: #4CB0EE;
      border-radius: 50%;
      margin-top: -2px;
    }
    h4 {
      margin: 0;
      margin-left: 10px;
      line-height: 28px;
    }
  }
  .filter{
    .el-form--inline{
      &.no-margin-bottom-form{
        .el-form-item{
          margin-bottom: 0px;
        }
      }
      .el-form-item{
        margin-bottom: 10px;
      }
    }
  }
  .bg-section {
    margin-bottom: 15px;
    @include background_color("bgSection");
    padding: 15px;
  }
  .footer{
    margin: 15px 0;
  }
}
</style>
