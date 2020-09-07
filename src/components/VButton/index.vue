<template>
  <el-button
      v-if="!hiddenProp"
      class="v-button"
      :disabled="disabledProp"
      :icon="iconProp"
      :title="title"
      v-bind="$attrs"
      @click="handleClick"
  >
    <img v-if="imageIcon" class="v-button__image-icon" :src="imageIcon">
    <slot>{{ name }}</slot>
  </el-button>
</template>

<script>
  export default {
    name: 'VButton',

    inheritAttrs: false,

    props: {
      icon: String,
      name: String,
      asset: String,
      assetType: {
        type: String,
        default: 'disabled',
        validator(value) {
          return ['disabled', 'hidden'].includes(value)
        }
      },
      click: Function,
      hidden: Boolean,
      disabled: Boolean
    },

    computed: {
      hasPrivilege() {
        return !this.asset || this.$hasPermission(this.asset)
      },
      hiddenProp() {
        return !this.hasPrivilege && this.assetType === 'hidden' || !!this.hidden
      },
      disabledProp() {
        return !this.hasPrivilege || this.disabled
      },
      imageIcon() {
        if (this.icon && (this.icon.startsWith('/static/') || this.icon.startsWith('data:image'))) {
          return this.icon
        }
        return null
      },
      iconProp() {
        return (this.icon && !this.imageIcon) ? this.icon : undefined
      },
      title() {
        return this.hasPrivilege ? this.$attrs.title : `没有${this.$attrs.title || ''}权限`
      }
    },

    methods: {
      handleClick(event) {
        if (this.click) {
          // noinspection JSCheckFunctionSignatures
          return this.click(event)
        }
        return this.$emit('click', event)
      }
    }
  }
</script>

<style lang="scss">
  .v-button.el-button {
    position: relative;

    .v-button__image-icon {
      height: 1em;
    }
  }
</style>
