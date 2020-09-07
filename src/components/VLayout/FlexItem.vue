<script type="text/jsx">
export default {
  name: 'FlexItem',
  functional: true,
  props: {
    span: Number,
    flex: String
  },
  render(h, context) {
    const {span, flex} = context.props
    const colClass = span ? 'flex-item__col-' + span : undefined
    return (<div
      class={['flex-item', colClass, context.data.staticClass, context.data.class]}
      style={[{flex}, context.data.staticStyle, context.data.style]}
    >
      {context.children}
    </div>)
  }
}
</script>
