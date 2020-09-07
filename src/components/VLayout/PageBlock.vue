<script type="text/jsx">
export default {
  name: 'PageBlock',
  functional: true,
  props: {
    flexible: Boolean,
    paddingBottom: Boolean,
    noPaddingTop: Boolean,
    noPadding: Boolean
  },
  render(h, context) {
    const {flexible, paddingBottom, noPaddingTop, noPadding} = context.props
    return (<div
      class={['page-block', {
        flexible,
        'page-block--bottom': paddingBottom,
        'page-block--no-padding-top': noPaddingTop,
        'page-block--no-padding': noPadding
      },
      context.data.staticClass, context.data.class]}
      style={[context.data.staticStyle, context.data.style]}
    >
      {context.children}
    </div>)
  }
}
</script>
