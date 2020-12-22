<template>
  <div
      :class="['page-block', {
        flexible,
        'page-block--bottom': paddingBottom,
        'page-block--no-padding-top': noPaddingTop,
        'page-block--no-padding': noPadding,
      }]"
  >
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'PageBlock',
    props: {
      flexible: Boolean,
      paddingBottom: Boolean,
      noPaddingTop: Boolean,
      noPadding: Boolean,
    },
  }
</script>
