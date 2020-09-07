<template>
  <el-col class="v-form-item__wrapper" :span="spanProp" v-bind="elColProps">
    <el-form-item ref="elFormItem" class="v-form-item" :label="label" :prop="prop" v-bind="{ rules: $attrs.rules, ...elFormItemProps}">

      <slot v-if="$slots.default" />

      <VInput
        v-else
        v-bind="$attrs"
        :value="value"
        @input="(...args) => this.$emit('input', ...args)"
        @change="(...args) => this.$emit('change', ...args)"
      >
        <template v-if="$slots.prepend" v-slot:prepend>
          <slot name="prepend" />
        </template>
        <template v-if="$slots.append" v-slot:append>
          <slot name="append" />
        </template>
      </VInput>

      <template v-slot:label>
        <slot name="label" />
      </template>
      <template v-slot:error="{error}">
        <slot name="error" :error="error" />
      </template>

    </el-form-item>
  </el-col>
</template>

<script>
import VInput from '@/components/VInput'

export default {
  name: 'VFormItem',

  components: {VInput},

  inheritAttrs: false,

  props: {
    // line、span、minWidth 只需要传一个即可，没有给定span将根据minWidth自动计算，可自适应
    line: Boolean, // 是否占据整行控件，相当于传入span: 24
    span: Number,

    label: String,
    prop: String,

    elColProps: Object,
    elFormItemProps: Object,

    // v-model属性
    value: {}
  },

  computed: {
    spanProp() {
      return this.line ? 24 : this.span
    }
  }
}
</script>
