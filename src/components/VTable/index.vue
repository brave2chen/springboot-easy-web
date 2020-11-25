<template>
  <div class="v-table__wrapper">
    <el-table
      ref="table"
      class="v-table"
      :data="data"
      :max-height="height"
      v-bind="$attrs"
      v-on="$listeners"
      @cell-mouse-enter="handleCellMouseEnter"
      @cell-mouse-leave="handleCellMouseLeave"
    >
      <template v-for="(column,index) in showColumns">
        <!--    show-overflow-tooltip 已覆盖实现    -->
        <el-table-column :key="index" v-bind="column" :show-overflow-tooltip="!!showOverflowTooltip">
          <template v-if="column.prop && $scopedSlots[column.prop]" v-slot="scope">
            <slot :name="column.prop" v-bind="scope" />
          </template>
          <template v-else-if="column.type === 'enum'" v-slot="{row}">
            {{ transEnum(column.data, row[column.prop]) }}
          </template>
          <template v-else-if="column.type === 'tag'" v-slot="{row}">
            <el-tag
              v-bind="{...column, data: undefined}"
              :size="column.size || 'mini'"
              :type="column.innerType || transInnerType(column.data, row[column.prop])"
              @click="column.click && column.click(row[column.prop], row, $event)"
            >
              {{ transEnum(column.data, row[column.prop], row[column.prop]) }}
            </el-tag>
          </template>
          <template v-else-if="column.type === 'link'" v-slot="{row}">
            <el-link
              v-bind="{...column, data: undefined}"
              :underline="column.underline|| false"
              :type="column.innerType || transInnerType(column.data, row[column.prop])"
              @click="column.click && column.click(row[column.prop], row, $event)"
            >
              {{ transEnum(column.data, row[column.prop], row[column.prop]) }}
            </el-link>
          </template>
        </el-table-column>
      </template>

      <!--   操作列   -->
      <el-table-column
        v-if="showOperationColumn"
        class-name="v-table__operate-cell"
        label-class-name="v-table__operate-header"
        v-bind="operationColumn"
        :show-overflow-tooltip="false"
        :label="operationColumn.label || '操作'"
      >
        <template v-slot="{row}">
          <VButton
            v-for="(button, index) in buttons"
            :key="index"
            class="v-table__operate-button"
            v-bind="{type: 'text', size: 'mini',...button, click: undefined, disabled: undefined, hidden: undefined}"
            :disabled="typeof(button.disabled)==='function'?button.disabled(row):!!button.disabled"
            :hidden="typeof(button.hidden)==='function'?button.hidden(row):!!button.hidden"
            @click="button.click && button.click(row, button, $event)"
          />
        </template>
      </el-table-column>
      <template v-if="!!loadMore && data.length && loadMore.total && loadMore.total > data.length" v-slot:append>
        <div class="v-table__load-more" @click="loadMore.load && loadMore.load(loadMore)">
          <slot name="loadMore"><a href="javascript:void(0)">加载更多...</a></slot>
          <div class="v-table__load-more-total">共 {{ loadMore.total||0 }} 条</div>
        </div>
      </template>
    </el-table>
    <el-pagination
      v-if="showPagination"
      ref="pagination"
      class="v-table-pagination"
      v-bind="paginationProps"
      :page-size.sync="pagination.pageSize"
      :current-page.sync="pagination.currentPage"
      v-on="paginationListeners"
    />
  </div>
</template>

<script>
import {getStyle} from 'element-ui/src/utils/dom'
import {addResizeListener, removeResizeListener} from 'element-ui/src/utils/resize-event'
import VButton from '@/components/VButton'

export default {
  name: 'VTable',

  components: {VButton},

  inheritAttrs: false,

  props: {
    data: Array,
    columns: Array,
    showIndex: Boolean,
    showSelection: Boolean,
    showOverflowTooltip: Boolean,

    /* 操作配置 {
        buttons: [
          // asset: 资源code, assetType: 没有权限时是隐藏还是disabled, click: click 事件回调
          {name: '删除', icon:'el-icon-delete', asset: 'deleteAssetCode', assetType: 'hidden'||'disabled', click: function(row, button, event){}},
          ...
        ],
        // 可以配置el-table-column的属性，如label等
        ...
      }*/
    operation: [Object, Array],

    // 参考el-pagination配置，但是current-change事件更名为current-page-change
    pagination: Object,

    /* 加载更多回调函数，loadMore时，pagination配置无效 {
        total: 0,
        text: '加载更多...', // 呈现的文字，默认“加载更多...”
        load: function() {}, // 回调
      }*/
    loadMore: Object,

    // 是否自适应高度，默认false
    autoresize: Boolean
  },

  data() {
    return {
      height: undefined
    }
  },

  computed: {
    indexColumn() {
      const column = this.columns.filter(column => column && column.type === 'index')[0]
      return column || (this.showIndex ? {type: 'index', label: '序号'} : undefined)
    },
    selectionColumn() {
      const column = this.columns.filter(column => column && column.type === 'selection')[0]
      return column || (this.showSelection ? {type: 'selection'} : undefined)
    },
    showColumns() {
      const columns = this.columns.filter(column => ![this.indexColumn, this.selectionColumn].includes(column))
      if (this.indexColumn) {
        columns.unshift(this.indexColumn)
      }
      if (this.selectionColumn) {
        columns.unshift(this.selectionColumn)
      }
      return columns
    },
    operationColumn() {
      if (Array.isArray(this.operation)) {
        return {buttons: this.operation}
      }
      return this.operation
    },
    showOperationColumn() {
      return this.operationColumn && this.operationColumn.buttons.length
    },
    buttons() {
      return this.operationColumn.buttons || []
    },
    showPagination() {
      return !this.loadMore && !!this.pagination
    },
    paginationProps() {
      return {layout: 'total, sizes, ->, prev, pager, next, jumper', ...this.pagination}
    },
    paginationListeners() {
      const listeners = {}
      if (this.$listeners['size-change']) {
        listeners['size-change'] = this.$listeners['size-change']
      }
      if (this.$listeners['prev-click']) {
        listeners['prev-click'] = this.$listeners['prev-click']
      }
      if (this.$listeners['next-click']) {
        listeners['next-click'] = this.$listeners['next-click']
      }
      if (this.$listeners['current-page-change']) {
        listeners['current-change'] = this.$listeners['current-page-change']
      }
      return listeners
    }
  },

  mounted() {
    this.__resize = () => {
      // 16px是分页margin-top
      const pH = this.$refs.pagination && (this.$refs.pagination.$el.clientHeight + parseInt(getStyle(this.$refs.pagination.$el, 'marginTop'))) || 0
      this.height = this.$el.clientHeight - pH
    }
    this.$nextTick(this.__resize)
    this.autoresize && addResizeListener(this.$el, this.__resize)
  },

  beforeDestroy() {
    this.autoresize && removeResizeListener(this.$el, this.__resize)
  },

  methods: {
    getButtonIconPath(icon) {
      if (icon && (icon.startsWith('/static/') || icon.startsWith('data:image'))) {
        return icon
      }
    },
    getLabel(item) {
      return item.name !== undefined ? item.name : item.text !== undefined ? item.text : item.label !== undefined ? item.label : (item.value || item.id)
    },
    getValue(item) {
      return item.value !== undefined ? item.value : item.id !== undefined ? item.id : item.label
    },
    transEnum(enums = [], value, defaultValue = '未知') {
      if (value === undefined || value === '' || value === null) {
        return ''
      }
      if (String(value).includes(',')) {
        value = value.split(',')
      }
      if (Array.isArray(value)) {
        return Array.from(new Set(value.map(v => enums.filter(type => this.getValue(type) == v).map(type => this.getLabel(type))[0] || defaultValue))).join(',')
      }
      return enums.filter(type => this.getValue(type) == value).map(type => this.getLabel(type))[0] || defaultValue
    },
    transInnerType(enums = [], value, defaultValue = 'primary') {
      if (value === undefined || value === '' || value === null) {
        return defaultValue
      }
      return enums.filter(type => this.getValue(type) == value).map(type => type.type)[0] || defaultValue
    },
    handleCellMouseEnter(row, column, cell, event) {
      this.$emit('cell-mouse-enter', row, column, cell, event)
      if(!!this.showOverflowTooltip) return

      // 判断是否text-overflow, 如果是就显示tooltip
      const cellChild = event.target.querySelector('.cell')
      // if (!column.showOverflowTooltip || !cellChild.childNodes.length) {
      //   return;
      // }
      // use range width instead of scrollWidth to determine whether the text is overflowing
      // to address a potential FireFox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1074543#c3
      const range = document.createRange()
      range.setStart(cellChild, 0)
      range.setEnd(cellChild, cellChild.childNodes.length)
      const rangeWidth = range.getBoundingClientRect().width
      const padding = (parseInt(getStyle(cellChild, 'paddingLeft'), 10) || 0) + (parseInt(getStyle(cellChild, 'paddingRight'), 10) || 0)
      const rangeHeight = range.getBoundingClientRect().height
      const paddingV = (parseInt(getStyle(cellChild, 'paddingTop'), 10) || 0) + (parseInt(getStyle(cellChild, 'paddingBottom'), 10) || 0)

      const $tableBody = this.$refs.table.$children[this.$refs.table.$children.length - 1]
      if ((Math.floor(rangeWidth + padding) > Math.floor(cellChild.offsetWidth || cellChild.scrollWidth > cellChild.offsetWidth) ||
          Math.floor(rangeHeight + paddingV) > Math.floor(cellChild.offsetHeight || cellChild.scrollHeight > cellChild.offsetHeight)
      ) && $tableBody.$refs.tooltip) {
        const tooltip = $tableBody.$refs.tooltip;
        // TODO 会引起整个 Table 的重新渲染，需要优化
        tooltip.referenceElm = cell;
        $tableBody.tooltipContent = cell.innerText || cell.textContent;
        if(tooltip.showPopper) {
          tooltip.$refs.popper && (tooltip.$refs.popper.style.display = 'none');
          tooltip.doDestroy(true);
          tooltip.destroyPopper();
          tooltip.handleClosePopper();
        }
        tooltip.setExpectedState(true);
        $tableBody.activateTooltip(tooltip);
      }
    },
    handleCellMouseLeave(row, column, cell, event) {
      this.$emit('cell-mouse-leave', row, column, cell, event);
      if(!!this.showOverflowTooltip) return

      const $tableBody = this.$refs.table.$children[this.$refs.table.$children.length - 1];
      const tooltip = $tableBody.$refs.tooltip;
      tooltip && tooltip.hide();
    },

    // 代理ElTable的内部方法
    clearSelection(...args) {
      return this.$refs.table.clearSelection(...args)
    },
    toggleRowSelection(...args) {
      return this.$refs.table.toggleRowSelection(...args)
    },
    toggleAllSelection(...args) {
      return this.$refs.table.toggleAllSelection(...args)
    },
    toggleRowExpansion(...args) {
      return this.$refs.table.toggleRowExpansion(...args)
    },
    setCurrentRow(...args) {
      return this.$refs.table.setCurrentRow(...args)
    },
    clearSort(...args) {
      return this.$refs.table.clearSort(...args)
    },
    clearFilter(...args) {
      return this.$refs.table.clearFilter(...args)
    },
    doLayout(...args) {
      return this.$refs.table.doLayout(...args)
    },
    sort(...args) {
      // noinspection JSCheckFunctionSignatures
      return this.$refs.table.sort(...args)
    }
  }
}
</script>

<style lang="scss">
  @import "~@/styles/variables.scss";

  .v-table__wrapper {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .v-table {
    width: 100%;

    .el-table__body-wrapper {
      transition: max-height 300ms cubic-bezier(0.23, 1, 0.32, 1);
    }
  }

  .v-table.el-table--medium .el-link {
    font-size: 14px;
  }

  .v-table.el-table--small .el-link {
    font-size: 12px;
  }

  .v-table.el-table--mini .el-link {
    font-size: 12px;
  }

  .v-table .el-button--text {
    padding: 0;
  }

  .v-table__operate-cell .el-button--text {
    padding: 0;
    line-height: inherit;
    border: none;
    /* 不加的话，外层div会撑高一点 */
    vertical-align: top;
  }

  .v-table__operate-button {
    position: relative;
  }

  .v-table__load-more {
    text-align: center;
    line-height: 36px;
    cursor: pointer;
    /*border-bottom: 1px solid #dfe6ec;*/
    position: relative;

    &:hover a {
      color: $colorPrimary;
    }

    .v-table__load-more-total {
      font-weight: 400;
      color: $colorTextRegular;
      position: absolute;
      top: 0;
      right: $gap;

      @media screen and (max-width: $mediaWidth) {
        right: $minGap;
      }
    }
  }

  .v-table-pagination {
    margin-top: $gap;

    @media screen and (max-width: $mediaWidth) {
      margin-top: $minGap;
    }
  }

  // el-table限制最高4行
  .v-table.el-table .cell {
    display: -webkit-box;
    overflow: hidden;
    line-height: $tableCellLineHeight;
    max-height: #{$tableCellMaxLine * $tableCellLineHeight};
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: $tableCellMaxLine;

    .el-link {
      display: inline;
    }
  }
</style>
