<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/variables.scss";

.app-main {
  /*50 = navbar  */
  height: calc(100vh - #{$navHeight});
  width: 100%;
  position: relative;
  overflow: auto;
}

.fixed-header + .app-main {
  padding-top: $navHeight;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
