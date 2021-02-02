<template>
  <div class="footer-container">
    <el-row>
      <el-col :span="12">Vue3.0 Study</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'FooterBar'
}
</script>

<style rel="stylesheet/scss" lang="scss">
$theme-light: (
  footerBg: #F7F8F8,
  footerBorder: #DDDDDD,
);

$theme-dark: (
  footerBg: #2B3648,
  footerBorder: #3E495B,
);
@import "styles/themesHandle.scss";
  .footer-container {
    height: 36px;
    padding: 10px 20px;
    border-top: 1px solid;
    @include border_color("footerBorder");
    @include background_color("bodyBg");
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 14px;
  }
</style>
