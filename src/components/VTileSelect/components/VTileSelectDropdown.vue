<template>
  <div
    class="v-tile-select-dropdown el-select-dropdown el-popper"
    :class="[{ 'is-multiple': $parent.multiple }, popperClass]"
    :style="{ minWidth: minWidth }"
  >
    <slot />
  </div>
</template>

<script type="text/babel">
import Popper from 'element-ui/src/utils/vue-popper'

export default {
  name: 'VTileSelectDropdown',
  componentName: 'VTileSelectDropdown',

  mixins: [Popper],

  props: {
    placement: {
      default: 'bottom'
    },

    boundariesPadding: {
      default: 0
    },

    popperOptions: {
      default() {
        return {

          gpuAcceleration: false
        }
      }
    },

    visibleArrow: {
      default: true
    },

    appendToBody: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      minWidth: ''
    }
  },

  computed: {
    popperClass() {
      return this.$parent.popperClass
    }
  },

  watch: {
    '$parent.inputWidth'() {
      this.minWidth = this.$parent.$el.getBoundingClientRect().width + 'px'
    }
  },

  mounted() {
    this.referenceElm = this.$parent.$refs.reference.$el
    this.$parent.popperElm = this.popperElm = this.$el
    this.$on('updatePopper', () => {
      if (this.$parent.visible) this.updatePopper()
    })
    this.$on('destroyPopper', this.destroyPopper)
  }
}
</script>

<style lang="scss">
  .v-tile-select-dropdown .el-date-table td.in-range div {
    background-color: #F2F6FC;
  }
</style>
