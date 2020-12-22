<template>
  <div :class="['flex-box', directionClass, colClass]" :style="{flex}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'FlexBox',
    props: {
      direction: {
        type: String,
        default: 'row',
        validate(value) {
          return ['row', 'column'].includes(value);
        }
      },
      // 网格系统同el-col
      span: Number,
      flex: String,
    },
    computed: {
      directionClass() {
        return 'flex-box--' + (this.direction === 'row' ? 'row' : 'column');
      },
      colClass() {
        return this.span ? 'flex-item__col-' + this.span : undefined;
      }
    },
  }
</script>
