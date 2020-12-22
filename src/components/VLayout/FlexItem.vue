<template>
  <div :class="['flex-item', colClass]" :style="{flex}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'FlexItem',
    props: {
      span: Number,
      flex: String,
    },
    computed: {
      colClass() {
        return this.span ? 'flex-item__col-' + this.span : undefined;
      }
    },
  }
</script>
