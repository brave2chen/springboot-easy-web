<template>
  <transition name="v-dialog-zoom" @after-enter="afterEnter" @after-leave="afterLeave">
    <div
      v-show="visible"
      class="v-dialog"
      :class="{
        'v-dialog--sidebar': hasSidebar,
        'v-dialog--sidebar-collapse': collapse,
        'v-dialog--tags-view': tagsViewShow,
      }"
    >
      <div class="v-dialog-wrap">
        <slot v-if="title" name="header">
          <div class="v-dialog-header">
            <span class="v-dialog-header__title">{{ title }}</span>
            <div class="v-dialog-header__icon" @click="handleClose"><i class="el-icon-arrow-left" />返回</div>
            <div class="v-dialog__operation">
              <slot name="buttons">
                <VButton
                  v-for="(button, index) in buttons"
                  :key="index"
                  class="v-dialog__operation-button"
                  v-bind="{size: 'small', type: 'primary',...button}"
                />
              </slot>
            </div>
          </div>
        </slot>
        <div v-if="rendered" ref="v-dialog-main" class="v-dialog-main">
          <slot />
        </div>
        <div v-if="$slots.footer" class="v-dialog-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Popup from 'element-ui/src/utils/popup'
import Migrating from 'element-ui/src/mixins/migrating'
import emitter from 'element-ui/src/mixins/emitter'
import {mapState} from 'vuex'

export default {
  name: 'VDialog',

  mixins: [Popup, emitter, Migrating],

  props: {
    visible: Boolean,
    title: String,
    sidebarShow: {
      type: Boolean,
      default: true
    },
    tagsViewShow: {
      type: Boolean,
      default: true
    },

    // 参数参考VButton
    buttons: Array
  },

  data() {
    return {
      closed: false,
      key: 0
    }
  },

  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device
    }),
    hasSidebar() {
      return this.sidebarShow && this.device !== 'mobile'
    },
    collapse() {
      return this.hasSidebar && !this.sidebar.opened
    }
  },

  watch: {
    visible(val) {
      if (val) {
        this.closed = false
        this.$emit('open')
        this.$el.addEventListener('scroll', this.updatePopper)
        document.body.appendChild(this.$el)
      } else {
        this.$el.removeEventListener('scroll', this.updatePopper)
        if (!this.closed) this.$emit('close')
        this.$nextTick(() => {
          this.key++
        })
      }
    }
  },

  mounted() {
    if (this.visible) {
      this.rendered = true
      this.open()
      document.body.appendChild(this.$el)
    }
  },

  destroyed() {
    // remove DOM node after destroy
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },

  methods: {
    handleClose() {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide)
      } else {
        this.hide()
      }
    },
    hide(cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false)
        this.$emit('close')
        this.closed = true
      }
    },
    updatePopper() {
      this.broadcast('ElSelectDropdown', 'updatePopper')
      this.broadcast('ElDropdownMenu', 'updatePopper')
    },
    afterEnter() {
      this.$emit('opened')
    },
    afterLeave() {
      this.$emit('closed')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/variables.scss";

  .v-dialog {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: $navHeight 0 0 0;
    background-color: $bgColor;
    display: flex;
    flex-direction: column;
    cursor: default;

    &.v-dialog--tags-view {
      margin-top: $navHeight + $tagsViewHeight;
    }

    &.v-dialog--sidebar {
      margin-left: $sideBarWidth;

      &.v-dialog--sidebar-collapse {
        margin-left: $sideBarCollapseWidth;
      }
    }
  }

  .v-dialog-wrap {
    padding: $gap;
    flex: 1;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: $mediaWidth) {
      padding: $minGap;
    }
  }

  .v-dialog-header {
    text-align: center;
    flex: none;
    background-color: $colorWhite;
    position: relative;
    font-size: 14px;
    line-height: 18px;
    color: $colorTextRegular;
    margin-bottom: $gap;
    padding: $gap;
    display: flex;
    align-items: center;

    @media screen and (max-width: $mediaWidth) {
      margin-bottom: $minGap;
      padding: $minGap;
    }
  }

  .v-dialog-main {
    border-bottom: none;
    overflow: hidden;
    color: $colorTextPrimary;
    transition: 0.3s;
    flex: 1;
    height: 0;
    display: flex;
    flex-direction: column;
  }

  .v-dialog-footer {
    border-top: 1px solid $borderColor;
    background-color: $colorWhite;
    text-align: center;
    flex: none;
    border-radius: 0 0 4px 4px;
    padding: $gap;

    @media screen and (max-width: $mediaWidth) {
      padding: $minGap;
    }
  }

  .v-dialog__operation {
    position: absolute;
    right: $gap;

    @media screen and (max-width: $mediaWidth) {
      right: $minGap;
    }
  }

  .v-dialog__operation-button {
    min-width: 80px;
  }

  .v-dialog-header__title {
    flex: auto;
  }

  .v-dialog-header__icon {
    position: absolute;
    cursor: pointer;
    left: $gap;
    @media screen and (max-width: $mediaWidth) {
      left: $minGap;
    }

    &:hover {
      color: $colorPrimary;

      i {
        color: $colorPrimary;
      }
    }

    i {
      margin-right: 3px;
      color: $colorTextPrimary;
    }
  }

  .v-dialog-zoom-enter-active {
    transform-origin: top right;
  }
  .v-dialog-zoom-leave-active {
    transform-origin: top left;
  }
  .v-dialog-zoom-enter-active,
  .v-dialog-zoom-leave-active {
    opacity: 1;
    transform: scale(1, 1);
    transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  .v-dialog-zoom-enter,
  .v-dialog-zoom-leave-to {
    opacity: 0;
    transform: scale(.45, .45);
  }
</style>

