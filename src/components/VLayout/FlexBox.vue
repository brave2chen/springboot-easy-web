<script type="text/jsx">
export default {
  name: 'FlexBox',
  functional: true,
  props: {
    direction: {
      type: String,
      default: 'row',
      validate(value) {
        return ['row', 'column'].includes(value)
      }
    },
    // 网格系统同el-col
    span: Number,
    flex: String
  },
  render(h, context) {
    const {direction, span, flex} = context.props
    const directionClass = 'flex-box--' + (direction === 'row' ? 'row' : 'column')
    const colClass = span ? 'flex-item__col-' + span : undefined

    return (<div
      class={['flex-box', directionClass, colClass, context.data.staticClass, context.data.class]}
      style={[{flex}, context.data.staticStyle, context.data.style]}
    >
      {context.children}
    </div>)
  }
}
</script>
