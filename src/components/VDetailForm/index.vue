<template>
  <div class="v-detail-form__wrapper">
    <el-form
      ref="elForm"
      :class="['v-detail-form', {'v-detail-form--margin-top': marginTop, 'v-detail-form--dense': dense}]"
      label-position="right"
      :model="model || {}"
      :label-width="labelWidth"
      v-bind="$attrs"
      v-on="$listeners"
      @submit.native.prevent
    >
      <el-row :gutter="gutter" type="flex" justify="space-between">
        <template v-for="(item, index) in items">
          <VFormItem
            :key="index"
            :value="value(item)"
            :span="calculateSpan(item)"
            type="plaintext"
            v-bind="item"
          >
            <slot v-if="item.prop && $slots[item.prop]" :name="item.prop" v-bind="{item, index}" />
            <template v-else>
              <el-tag
                v-if="item.type === 'tag'"
                v-bind="{...item, data: undefined}"
                :size="item.size || 'mini'"
                :type="item.innerType || transInnerType(item)"
                @click="item.click && item.click(item, $event, index)"
              >
                {{ value(item) }}
              </el-tag>
              <el-link
                v-if="item.type === 'link'"
                v-bind="{...item, data: undefined}"
                :underline="item.underline|| false"
                :type="item.innerType || transInnerType(item)"
                @click="item.click && item.click(item, $event, index)"
              >
                {{ value(item) }}
              </el-link>
              <template v-if="item.type === 'copy'">
                {{ value(item) }}
                <el-link
                  v-clipboard:copy="value(item)"
                  v-clipboard:success="() => $message.success('复制成功')"
                  :underline="false"
                  type="primary"
                >复制</el-link>
              </template>

            </template>
          </VFormItem>
        </template>
        <slot />
        <VFormItem v-if="$slots.tips" line label=" ">
          <slot name="tips" />
        </VFormItem>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {addResizeListener, removeResizeListener} from 'element-ui/src/utils/resize-event'
import clipboard from '@/directives/clipboard'

export default {
  name: 'VDetailForm',

  directives: {clipboard},

  inheritAttrs: false,

  props: {
    model: Object,

    items: Array,

    labelWidth: {
      type: String,
      default: '80px'
    },

    gutter: {
      type: Number,
      default: 16
    },

    // 全局配置各个item的最小宽度，各item内部minWidth配置优先
    itemMinWidth: {
      type: Number,
      default: 250
    },

    // 优先使用这个确定列数, 支持1,2,3,4,6,8,12
    cols: Number,

    // 如果 form 尺寸不会发生变化，最好设置它可以优化性能
    noresize: Boolean,

    // 设置margin-top
    marginTop: Boolean,

    // 设置紧凑型
    dense: Boolean
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
    !this.noresize && !this.cols && addResizeListener(this.$refs.elForm.$el, this.__resize)
  },

  beforeDestroy() {
    !this.noresize && !this.cols && removeResizeListener(this.$refs.elForm.$el, this.__resize)
  },

  methods: {
    calculateSpan({minWidth, span}) {
      if (span) return span
      if (this.cols) return 24 / +this.cols
      const cols = this.width && Math.floor(this.width / (minWidth || this.itemMinWidth))
      if (cols >= 6 && this.items.length >= 6) return 4
      if (cols >= 4 && this.items.length >= 4) return 6
      if (cols == 3 && this.items.length >= 3) return 8
      else if (cols >= 2 && this.items.length >= 2) return 12
      return 24
    },
    getLabel(item) {
      return item.name !== undefined ? item.name : item.text !== undefined ? item.text : item.label !== undefined ? item.label : (item.value || item.id)
    },
    getValue(item) {
      return item.value !== undefined ? item.value : item.id !== undefined ? item.id : item.label
    },
    transEnum(enums = [], value, defaultValue = '未知') {
      if (value === undefined || value === '' || value === null) {
        return ''
      }
      if(String(value).includes(',')) {
        value = String(value).split(',');
      }
      if (Array.isArray(value)) {
        return Array.from(new Set(value.map(v => enums.filter(type => this.getValue(type) == v).map(type => this.getLabel(type))[0] || defaultValue))).join(',')
      }
      return enums.filter(type => this.getValue(type) === value).map(type => this.getLabel(type))[0] || defaultValue
    },
    transInnerType(enums = [], value, defaultValue = 'primary') {
      if (value === undefined || value === '' || value === null) {
        return defaultValue
      }
      return enums.filter(type => this.getValue(type) == value).map(type => type.type)[0] || defaultValue
    },
    value(item) {
      const valueIfFun = typeof item.value === 'function'
      const value = (this.model && item.prop) ? this.model[item.prop] : valueIfFun ? undefined : item.value
      const isEnumData = Array.isArray(item.data) && (item.type === 'enum' || item.type === 'tag')
      return valueIfFun ? item.value(value) : isEnumData ? this.transEnum(item.data, value) : value
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

  .v-detail-form__wrapper {
    overflow: hidden;
  }

  .v-detail-form.el-form {
    overflow: hidden;
    width: 100%;
    margin-top: 0;

    &.v-detail-form--margin-top {
      margin-top: $gap;

      @media screen and (max-width: $mediaWidth) {
        margin-top: $minGap;
      }

      &.v-detail-form--dense {
        margin-top: $gap/2;

        @media screen and (max-width: $mediaWidth) {
          margin-top: $minGap/2;
        }
      }
    }

    & > .el-row {
      display: flex;
      flex-wrap: wrap;
    }

    .v-form-item {
      margin-bottom: $minGap;

      @media screen and (max-width: $mediaWidth) {
        margin-top: $minGap/2;
      }

      .el-form-item__label {
        word-break: break-all;
        line-height: 1.5em;
        color: $colorTextPrimary;

        padding-right: $gap/2;

        @media screen and (max-width: $mediaWidth) {
          padding-right: $minGap/2;
        }
      }

      .el-form-item__content {
        margin-left: 0;
        line-height: 1.5em;
        color: $colorTextRegular;
      }
    }
  }
</style>
