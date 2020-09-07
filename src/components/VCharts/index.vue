<template>
  <ECharts
    v-bind="$attrs"
    :theme="theme"
    :options="options"
    :autoresize="autoresize"
    :group="group"
    :init-options="initOptions"
    :manual-update="manualUpdate"
    :watch-shallow="watchShallow"
    :style="styleObject"
    v-on="$listeners"
  />
</template>

<script>
import ECharts from 'vue-echarts'
import theme from './theme'
import 'echarts'

export default {
  name: 'VECharts',

  components: {ECharts},

  inheritAttrs: false,

  props: {
    theme: {
      type: [String, Object],
      default: theme
    },
    width: {
      type: [Number, String],
      default: '100%'
    },
    height: {
      type: [Number, String],
      default: '100%'
    },

    options: Object,
    initOptions: Object,
    group: String,
    autoresize: Boolean,
    watchShallow: Boolean,
    manualUpdate: Boolean
  },

  computed: {
    styleObject() {
      return {
        width: this.width instanceof Number ? this.width + 'px' : this.width,
        height: this.height instanceof Number ? this.height + 'px' : this.height
      }
    }
  }
}

</script>
