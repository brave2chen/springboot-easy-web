<template>
  <div class="v-form__wrapper">
    <el-form
      ref="elForm"
      :class="['v-form', {'v-form--margin-top': marginTop}]"
      inline
      label-position="right"
      :model="model"
      :label-width="labelWidth"
      :rules="rules"
      v-bind="$attrs"
      v-on="$listeners"
      @submit.native.prevent
    >
      <el-row :gutter="gutter" type="flex" justify="space-between">
        <template v-for="(item, index) in items">
          <VFormItem
            v-model="model[item.prop]"
            v-bind="item"
            :span="calculateSpan(item)"
            :beautify-prepend="item.beautifyPrepend || (item.prepend && item.prepend.type === 'select')"
          >
            <slot v-if="item.prop && $slots[item.prop]" :name="item.prop" />

            <template v-if="$slots[item.prop+'LabelSlot']" v-slot:label>
              <slot :name="item.prop+'LabelSlot'" />
            </template>

            <template v-if="item.prepend" v-slot:prepend>
              <slot v-if="$slots[item.prepend]" :name="item.prepend" />
              <template v-else-if="typeof(item.prepend)==='string'">{{ item.prepend }}</template>
              <VInput v-else v-model="model[item.prepend.prop]" v-bind="item.prepend" />
            </template>
            <template v-if="item.append" v-slot:append>
              <slot v-if="$slots[item.append]" :name="item.append" />
              <template v-else-if="typeof(item.prepend)==='string'">{{ item.append }}</template>
              <VInput v-else v-model="model[item.append.prop]" v-bind="item.append" />
            </template>
          </VFormItem>
        </template>
        <slot />
        <VFormItem v-if="$slots.tips" line label=" ">
          <div class="v-form__tips">
            <slot name="tips" />
          </div>
        </VFormItem>
        <el-col v-if="$slots.buttons || buttons" class="v-form__operation">
          <slot name="buttons">
            <template v-for="(button, index) in buttons">
              <VButton
                :key="index"
                class="v-form__operation-button"
                v-bind="{type: 'primary',...button, click: undefined}"
                @click="button.click && button.click(button, $event)"
              />
            </template>
          </slot>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {addResizeListener, removeResizeListener} from 'element-ui/src/utils/resize-event'
import VFormItem from '@/components/VFormItem'
import VInput from '@/components/VInput'

export default {
  name: 'VForm',

  components: {VFormItem, VInput},

  inheritAttrs: false,

  props: {
    model: Object,

    items: Array,

    rules: {},

    labelWidth: {
      type: String,
      default: '80px'
    },

    // 参数参考VButton
    buttons: Array,

    gutter: {
      type: Number,
      default: 16
    },

    // 全局配置各个item的最小宽度，各item内部minWidth配置优先
    itemMinWidth: {
      type: Number,
      default: 400
    },

    // 如果 form 尺寸不会发生变化，最好设置它可以优化性能
    noresize: Boolean,

    // 设置margin-top: 0;
    marginTop: Boolean
  },

  data() {
    return {
      width: undefined
    }
  },

  mounted() {
    this.__resize = () => {
      if (this.$refs.elForm && this.$refs.elForm.$el && this.$refs.elForm.$el.clientWidth) {
        this.width = this.$refs.elForm.$el.clientWidth
      }
    }
    this.$nextTick(this.__resize)
    !this.noresize && addResizeListener(this.$refs.elForm.$el, this.__resize)
  },

  beforeDestroy() {
    !this.noresize && removeResizeListener(this.$refs.elForm.$el, this.__resize)
  },

  methods: {
    calculateSpan({minWidth, span}) {
      if (span > 0) return span
      return this.width && Math.floor(this.width / (minWidth || this.itemMinWidth)) < 2 ? 24 : 12
    },
    validate(...args) {
      return this.$refs.elForm.validate(...args)
    },
    validateField(...args) {
      return this.$refs.elForm.validateField(...args)
    },
    resetFields(...args) {
      return this.$refs.elForm.resetFields(...args)
    },
    clearValidate(...args) {
      return this.$refs.elForm.clearValidate(...args)
    }
  }
}
</script>

<style lang="scss">
  @import '~@/styles/variables.scss';

  .v-form__wrapper {
    overflow: hidden;
  }

  .v-form.el-form {
    overflow: hidden;
    width: 100%;
    margin-top: 0;

    &.v-form--margin-top {
      margin-top: $gap;

      @media screen and (max-width: $mediaWidth) {
        margin-top: $minGap;
      }
    }

    & > .el-row {
      display: flex;
      flex-wrap: wrap;
    }

    .v-form-item {
      display: flex;
      align-items: center;
      margin-bottom: $gap;

      .el-form-item__label {
        word-break: keep-all;
        align-self: flex-start;
      }

      .el-form-item__content {
        flex: 1;
        margin-left: 0;
      }
    }

    .v-form__tips {
      font-size: 12px;
      color: $colorTextRegular;
    }

    .v-form__operation {
      margin-bottom: $gap;
      text-align: center;
    }

    .v-form__operation-button {
      min-width: 80px;
    }

    .v-form-item .el-date-editor .el-range-input {
      width: 45%;
    }

    .v-form-item .el-date-editor--daterange.el-input,
    .v-form-item .el-date-editor--daterange.el-input__inner,
    .v-form-item .el-date-editor--timerange.el-input,
    .v-form-item .el-date-editor--timerange.el-input__inner,
    .v-form-item .el-date-editor--datetimerange.el-input,
    .v-form-item .el-date-editor--datetimerange.el-input__inner,
    .v-form-item .el-date-editor.el-input,
    .v-form-item .el-date-editor.el-input__inner,
    .v-form-item .el-select,
    .v-form-item .el-input-number {
      width: 100%;
    }
  }
</style>
