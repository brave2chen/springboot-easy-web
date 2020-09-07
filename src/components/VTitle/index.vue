<template>
  <div
    :class="['v-title', {
      'v-title--border': border && toggle !== false,
      'v-title--no-padding-bottom': noPaddingBottom,
      'v-title--dense': dense
    }]"
  >
    <div class="v-title__title">
      <slot v-if="title || $slots.title" name="title">{{ title }}</slot>
      <slot v-else />
      <span
        v-if="toggle !== undefined"
        :class="['v-title__toggle', {'toggled': toggle===false}]"
        @click="$emit('update:toggle', !toggle)"
      >
        {{ !toggle?'展开':'收起' }}
        <i class="el-icon-caret-bottom" />
      </span>
    </div>
    <div class="v-title__operation">
      <slot name="buttons">
        <VButton
          v-for="(button, index) in buttons"
          :key="index"
          class="v-title__button"
          v-bind="{type: 'primary', size: 'small',...button, click: undefined}"
          @click="button.click && button.click(button, $event)"
        />
      </slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'VTitle',

  props: {
    title: String,
    /* 操作配置
        buttons: [
          // asset: 资源code, assetType: 没有权限时是隐藏还是disabled, click: click 事件回调
          {name: '删除', icon:'el-icon-delete', asset: 'deleteAssetCode', assetType: 'hidden'||'disabled', click: function(row, button, event){}},
          ...
        ],
      */
    buttons: Array,

    // 是否显示bottom的border
    border: Boolean,

    // 紧凑型title，通常在el-dialog中的title使用
    dense: Boolean,

    // 是否添加收起、展开按钮
    toggle: {
      type: Boolean,
      default: undefined
    },
    noPaddingBottom: Boolean
  },

  methods: {
    getButtonIconPath(icon) {
      if (icon && (icon.startsWith('/static/') || icon.startsWith('data:image'))) {
        return icon
      }
    }
  }
}
</script>

<style lang="scss">
  @import "~@/styles/variables.scss";

  .v-title {
    display: flex;
    align-items: center;
    padding-bottom: $gap;
    position: relative;

    @media screen and (max-width: $mediaWidth) {
      padding-bottom: $minGap;
    }

    &.v-title--dense {
      padding-bottom: $gap / 2;

      @media screen and (max-width: $mediaWidth) {
        padding-bottom: $minGap / 2;
      }
    }

    &.v-title--no-padding-bottom {
      padding-bottom: 0;
      &.v-title--dense {
        padding-bottom: 0;
      }
    }
  }

  .v-title--border {
    border-bottom: 1px solid $dividerColor;
  }

  .v-title__title {
    flex: 1;
    font-size: 16px;
    color: $colorTextPrimary;
    font-weight: 800;
  }

  .v-title--dense .v-title__title {
    font-size: 14px;
  }

  .v-title__toggle {
    color: $colorPrimary;
    padding-left: 8px;

    i {
      transition: transform 300ms linear;
      transform: rotate(0);
    }

    &.toggled i {
      transform: rotate(180deg);
    }
  }

  .v-title__operation {
    font-size: 12px;
    color: $colorTextRegular;
    letter-spacing: 0;
    text-align: center;
    position: absolute;
    right: 0;
  }

  .v-title__button {
    min-width: 80px;
  }
</style>
