<template>
  <!-- ElRadioGroup tag会报错，单独抽出来处理 -->
  <ElRadioGroup
    v-if="componentType === 'ElRadioGroup'"
    :style="styleObject"
    :class="['v-input']"
    :value="value"
    v-bind="innerProps"
    v-on="$listeners"
  >
    <el-radio v-for="(op, index) in data" :key="index" :label="getValue(op)" v-bind="op">
      {{ getLabel(op) }}
    </el-radio>
  </ElRadioGroup>

  <Component
    :is="componentType"
    v-else
    :style="styleObject"
    :class="['v-input', {'v-beautify-prepend': beautifyPrepend, 'v-input__plain': componentType === 'span'}]"
    :value="value"
    v-bind="innerProps"
    v-on="$listeners"
  >

    <template v-if="componentType === 'ElCheckboxGroup'">
      <el-checkbox v-for="(op,index) in data" :key="index" :label="getValue(op)" v-bind="op">
        {{ getLabel(op) }}
      </el-checkbox>
    </template>

    <template v-if="componentType === 'ElSelect'">
      <el-option v-for="(op,index) in data" :key="index" :label="getLabel(op)" :value="getValue(op)" v-bind="op">
        <template v-if="showValue">
          <span style="float: left">{{ getLabel(op) }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ op[showValue]||getValue(op) }}</span>
        </template>
      </el-option>
    </template>

    <slot v-if="componentType === 'VButton'">{{ innerProps.name||value }}</slot>
    <slot v-if="componentType === 'span'">{{ value }}</slot>

    <!--  input、number  -->
    <template v-if="getIconPath(prefix) || $slots.prefix" v-slot:prefix>
      <slot v-if="$slots.prefix" name="prefix" />
      <img v-if="getIconPath(prefix)" class="v-input__icon v-input__icon--prefix" :src="getIconPath(prefix)">
    </template>
    <template v-if="getIconPath(suffix) || $slots.suffix" v-slot:suffix>
      <slot v-if="$slots.suffix" name="suffix" />
      <img v-if="getIconPath(suffix)" class="v-input__icon v-input__icon--suffix" :src="getIconPath(suffix)">
    </template>
    <template v-if="$slots.prepend" v-slot:prepend>
      <slot v-if="$slots.prepend" name="prepend" />
    </template>
    <template v-if="$slots.append" v-slot:append>
      <slot v-if="$slots.append" name="append" />
    </template>

    <!--  select  -->
    <template v-if="$slots.empty" v-slot:empty>
      <slot name="empty" />
    </template>
  </Component>
</template>

<script>
import VInputNumber from '@/components/VInputNumber'
import VTileSelect from '@/components/VTileSelect'
import VButton from '@/components/VButton'

const defaultProps = {
  datePicker: {
    rangeSeparator: '~',
    placeholder: '选择日期',
    startPlaceholder: '开始日期',
    endPlaceholder: '结束日期'
  },
  timePicker: {
    rangeSeparator: '~',
    placeholder: '选择时间',
    startPlaceholder: '开始时间',
    endPlaceholder: '结束时间'
  },
  select: {},
  textarea: {
    resize: 'none'
  },
  radio: {},
  checkbox: {},
  input: {},
  number: {},
  switch: {}
}

export default {
  name: 'VInput',

  components: {VInputNumber, VTileSelect, VButton},

  inheritAttrs: true,

  props: {
    // 控件类型: input、select、radio、checkbox、date、datetime 等
    type: String,
    // 当type冲突是，又需要指定相应控件的type时使用，如type=button时，指定button的type，请使用innerType
    innerType: String,

    // v-model属性
    value: {},

    // select、radio、checkbox 时的选项数据
    data: Array,

    // select时，显示value字段，支持传入字段prop
    showValue: {
      required: false,
      default: false
    },

    width: [Number, String],

    // 美化prepend
    beautifyPrepend: Boolean,

    // slot props
    prefix: Object,
    suffix: Object
  },

  computed: {
    isDatePicker() {
      return ['date', 'datetime', 'daterange', 'datetimerange'].includes(this.type)
    },
    isTimePicker() {
      return ['time', 'timerange'].includes(this.type)
    },
    isDateTime() {
      return ['datetime', 'datetimerange'].includes(this.type)
    },
    isRange() {
      return ['daterange', 'datetimerange', 'timerange'].includes(this.type)
    },
    componentType() {
      // 'date', 'datetime', 'daterange', 'datetimerange'
      if (this.isDatePicker) {
        return 'ElDatePicker'
      }
      // 'time', 'timerange'
      if (this.isTimePicker) {
        return 'ElTimePicker'
      }
      return ({
        input: 'ElInput',
        text: 'ElInput',
        textarea: 'ElInput',
        password: 'ElInput',
        select: 'ElSelect',
        radio: 'ElRadioGroup',
        checkbox: 'ElCheckboxGroup',
        number: 'VInputNumber',
        switch: 'ElSwitch',
        slider: 'ElSlider',
        rate: 'ElRate',
        color: 'ElColorPicker',
        transfer: 'ElTransfer',

        tileSelect: 'VTileSelect',

        plainText: 'span',
        button: 'VButton'
      })[this.type]
    },
    innerProps() {
      let innerProps = defaultProps[this.type]

      if (this.isDatePicker) {
        innerProps = {
          ...defaultProps['datePicker'],
          valueFormat: this.isDateTime && 'yyyy-MM-dd HH:mm:ss' || 'yyyy-MM-dd'
        }
      }
      if (this.isTimePicker) {
        innerProps = {
          ...defaultProps['timePicker'],
          valueFormat: 'HH:mm:ss',
          isRange: this.isRange
        }
      }

      const props = {
        ...innerProps,
        type: this.type !== 'input' ? this.innerType || this.type : undefined,
        ...this.$attrs
      }

      if (!this.isDateTime && this.isRange && props.valueFormat === 'yyyy-MM-dd HH:mm:ss') {
        innerProps.defaultTime = "['00:00:00', '23:59:59']"
      }

      if (this.type === 'transfer') {
        props.data = this.data
      }

      if (this.type === 'select') {
        props.remote = props.remote || !!props.remoteMethod || !!props['remote-method']
        props.placeholder = props.placeholder || (props.remoteMethod || !!props['remote-method']) && '请输入关键字' || '请选择'
      }

      return props
    },
    styleObject() {
      if (this.width) {
        return {width: typeof (this.width) === 'number' ? (this.width + 'px') : this.width}
      }
      return {}
    }
  },

  methods: {
    getLabel(item) {
      return item.name !== undefined ? item.name : item.text !== undefined ? item.text : item.label !== undefined ? item.label : (item.value || item.id)
    },
    getValue(item) {
      return item.value !== undefined ? item.value : item.id !== undefined ? item.id : item.label
    },
    getIconPath(icon) {
      if (icon && (icon.startsWith('/static/') || icon.startsWith('data:image'))) {
        return icon
      }
    }
  }
}
</script>

<style lang="scss">
  @import '~@/styles/variables.scss';
  // 美化input的prepend样式，需要手动添加class: v-beautify-prepend
  .v-beautify-prepend {
    &.el-input.el-input-group--prepend,
    .el-input.el-input-group--prepend {
      border: 1px solid $borderColor !important;
      border-radius: 2px;

      .el-input-group__prepend {
        background-color: $colorWhite !important;
        border: none !important;
      }
      &.is-disabled {
        .el-input-group__prepend {
          background-color: $bgColor !important;
        }
      }

      &:focus-within {
        border-color: $colorPrimary !important;
      }

      &.el-input--small .el-input-group__prepend div.el-select .el-input__inner {
        border: none !important;
        border-right: 1px solid $borderColor !important;
        line-height: 18px !important;
        height: 18px !important;
        margin: 7px 0 !important;
      }

      &.el-input--small .el-input__inner {
        line-height: 30px !important;
        height: 30px !important;
        border: none !important;
      }
    }
    .el-input .el-input-group__append{
      border: none;
      border-left: 1px solid $borderColor
    }
  }

  .el-form-item.is-error .v-beautify-prepend .el-input.el-input--small.el-input-group--prepend {
    border-color: $colorDanger !important;
  }

  .v-beautify-prepend .el-input.el-input--small.el-input-group--prepend .el-input__inner:focus,
  .el-form-item.is-error .v-beautify-prepend .el-input.el-input--small.el-input-group--prepend .el-input__inner {
    border: none !important;
  }

  .v-input .el-input__suffix .el-input__icon.fa-percent {
    color: $colorTextRegular;
  }

  .input__plain {

  }
</style>
