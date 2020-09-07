<template>
  <div v-clickoutside="handleClose" class="v-tile-select">
    <el-input
      ref="reference"
      class="v-tile-select"
      v-bind="$attrs"
      :value="showValue"
      readonly
      @click.native.stop="toggleMenu"
    >
      <template slot="suffix"><i :class="['el-select__caret', 'el-input__icon', 'el-icon-' + iconClass]" /></template>
      <slot slot="prepend" name="prepend" />
      <slot slot="append" name="append" />
    </el-input>
    <transition name="el-zoom-in-top" @after-leave="doDestroy">
      <VTileSelectDropdown v-show="visible" ref="popper" :append-to-body="popperAppendToBody">
        <table cellspacing="0" cellpadding="0" class="el-date-table" @click.stop="handleClick" @mousemove="handleMouseMove">
          <tbody>
            <tr v-for="(row, key) in tableRows" :key="key" class="el-date-table__row">
              <td v-for="(cell, key) in row" :key="key" :class="getCellClasses(cell)">
                <div>
                  <span>{{ cell.label }}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </VTileSelectDropdown>
    </transition>
  </div>
</template>

<script>
import {arrayFind, arrayFindIndex, coerceTruthyValueToArray} from 'element-ui/src/utils/util'
import Clickoutside from 'element-ui/src/utils/clickoutside'
import VTileSelectDropdown from './components/VTileSelectDropdown'
import Emitter from 'element-ui/src/mixins/emitter'

// remove the first element that satisfies `pred` from arr
// return a new array if modification occurs
// return the original array otherwise
const removeFromArray = function(arr, pred) {
  const idx = typeof pred === 'function' ? arrayFindIndex(arr, pred) : arr.indexOf(pred)
  return idx >= 0 ? [...arr.slice(0, idx), ...arr.slice(idx + 1)] : arr
}

export default {
  name: 'VTileSelect',

  components: {VTileSelectDropdown},

  directives: {Clickoutside},

  mixins: [Emitter],

  inheritAttrs: false,

  props: {
    value: [String, Number, Array],

    rows: {
      require: true
    },

    multiple: {
      type: Boolean,
      default: false
    },

    isRange: {
      type: Boolean,
      default: false
    },

    disabledData: {},

    cellClassName: {},

    popperAppendToBody: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      visible: false,
      rangeState: {
        end: undefined,
        selecting: false
      },
      lastRow: null,
      lastColumn: null,
      min: undefined,
      max: undefined
    }
  },

  computed: {
    tableRows() {
      let min = this.min
      let max = this.max || this.rangeState.end
      if (min !== undefined && max !== undefined) {
        [min, max] = [Math.min(min, max), Math.max(min, max)]
      }

      const tableRows = []
      const rows = this.rows
      const disabledData = this.disabledData
      const cellClassName = this.cellClassName
      const selectedData = coerceTruthyValueToArray(this.value)

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        const newRow = []
        tableRows.push(newRow)

        for (let j = 0; j < row.length; j++) {
          let cell = row[j] instanceof Object ? row[j] : {value: row[j], label: row[j]}
          cell = {...cell, ...{row: i, column: j, type: 'normal', inRange: false, start: false, end: false}}
          cell.inRange = this.isRange && cell.value >= min && cell.value <= max
          cell.start = min !== undefined && cell.value === min
          cell.end = max !== undefined && cell.value === max
          // cell.type = 'today';
          // cell.type = 'prev-month';
          // cell.type = 'next-month';
          cell.selected = !this.isRange && arrayFind(selectedData, data => data === cell.value) !== undefined
          cell.disabled = typeof disabledData === 'function' && disabledData(cell)
          cell.customClass = typeof cellClassName === 'function' && cellClassName(cell)
          newRow.push(cell)
        }
      }
      return tableRows
    },
    labelMap() {
      const labelMap = Object.create(null)
      for (let i = 0; i < this.tableRows.length; i++) {
        const row = this.tableRows[i]
        for (let j = 0; j < row.length; j++) {
          labelMap[row[j].value] = row[j].label
        }
      }
      return labelMap
    },
    cellIndexMap() {
      const cellIndexMap = Object.create(null)
      for (let i = 0; i < this.tableRows.length; i++) {
        const row = this.tableRows[i]
        for (let j = 0; j < row.length; j++) {
          cellIndexMap[row[j].value] = i * row.length + j
        }
      }
      return cellIndexMap
    },
    showValue() {
      if (!this.value) return this.value

      const labels = coerceTruthyValueToArray(this.value).map(value => this.labelMap[value])
      if (this.isRange) {
        return this.multiple ? labels.map(([min, max]) => min + '-' + max).join(',') : labels[0] + '-' + labels[1]
      }
      return Array.isArray(this.value) ? labels.join(',') : labels[0]
    },
    iconClass() {
      return (this.visible ? 'arrow-up is-reverse' : 'arrow-up')
    }
  },

  watch: {
    value() {
      this.resetData()
    },
    tableRows() {
      this.$nextTick(() => this.broadcast('VTileSelectDropdown', 'updatePopper'))
    },
    visible(val) {
      if (!val) {
        this.broadcast('VTileSelectDropdown', 'destroyPopper')
        this.resetData()
      } else {
        this.broadcast('VTileSelectDropdown', 'updatePopper')
      }
      this.$emit('visible-change', val)
    }
  },

  beforeMount() {
    this.resetData()
  },

  methods: {
    cellMatchesData(cell, data) {
      return cell.value === data
    },

    getCellClasses(cell) {
      const selectionMode = this.selectionMode

      const classes = []
      if ((cell.type === 'normal' || cell.type === 'today') && !cell.disabled) {
        classes.push('available')
        if (cell.type === 'today') {
          classes.push('today')
        }
      } else {
        classes.push(cell.type)
      }

      // const defaultValue = this.defaultValue ? Array.isArray(this.defaultValue) ? this.defaultValue : [this.defaultValue] : [];
      // if (cell.type === 'normal' && defaultValue.some(data => this.cellMatchesData(cell, data))) {
      //   classes.push('default');
      // }

      if (selectionMode === 'single' && (cell.type === 'normal' || cell.type === 'today') && this.cellMatchesData(cell, this.value)) {
        classes.push('current')
      }

      if (cell.selected) {
        classes.push('selected')
      }

      if (cell.inRange && (cell.type === 'normal' || cell.type === 'today')) {
        classes.push('in-range')

        if (cell.start) {
          classes.push('start-date')
        }

        if (cell.end) {
          classes.push('end-date')
        }
      }

      if (cell.disabled) {
        classes.push('disabled')
      }

      if (cell.customClass) {
        classes.push(cell.customClass)
      }

      return classes.join(' ')
    },

    getDataOfCell(row, column) {
      return this.tableRows[row][column].value
    },

    handleMouseMove(event) {
      if (!this.rangeState.selecting) return

      let target = event.target
      if (target.tagName === 'SPAN') {
        target = target.parentNode.parentNode
      }
      if (target.tagName === 'DIV') {
        target = target.parentNode
      }
      if (target.tagName !== 'TD') return

      const row = target.parentNode.rowIndex
      const column = target.cellIndex

      // can not select disabled date
      if (this.tableRows[row][column].disabled) return

      // only update rangeState when mouse moves to a new cell
      // this avoids frequent Date object creation and improves performance
      if (row !== this.lastRow || column !== this.lastColumn) {
        this.lastRow = row
        this.lastColumn = column
        this.rangeState = {
          selecting: true,
          end: this.getDataOfCell(row, column)
        }
      }
    },

    handleClick(event) {
      let target = event.target
      if (target.tagName === 'SPAN') {
        target = target.parentNode.parentNode
      }
      if (target.tagName === 'DIV') {
        target = target.parentNode
      }

      if (target.tagName !== 'TD') return

      const row = target.parentNode.rowIndex
      const column = target.cellIndex
      const cell = this.tableRows[row][column]

      if (cell.disabled) return

      const newData = this.getDataOfCell(row, column)

      if (!this.isRange) {
        if (!this.multiple) {
          this.emitValue(newData, true)
        } else {
          const value = this.value || []
          let newValue
          if (!cell.selected) {
            newValue = [...value, newData].sort((a, b) => this.cellIndexMap[a] - this.cellIndexMap[b])
          } else {
            newValue = removeFromArray(value, data => data === newData)
          }
          this.emitValue(newValue)
        }
      } else {
        if (!this.multiple) {
          if (!this.rangeState.selecting) {
            this.min = newData
            this.max = undefined
            this.rangeState.end = undefined
            this.rangeState.selecting = true
          } else {
            if (newData >= this.min) {
              this.emitValue([this.min, newData], true)
            } else {
              this.emitValue([newData, this.min], true)
            }
            this.rangeState.selecting = false
          }
        } else {
          throw new Error('暂不支持')
        }
      }
    },
    resetData() {
      if (this.isRange) {
        this.value.length && (this.min = this.value[0])
        this.value.length > 1 && (this.max = this.value[this.value.length - 1])
        this.rangeState.end = undefined
        this.rangeState.selecting = false
      }
    },
    emitValue(value, hidden) {
      this.$emit('input', value)
      this.$emit('change', value)
      hidden && (this.visible = false)
    },

    doDestroy() {
      this.$refs.popper && this.$refs.popper.doDestroy()
    },
    toggleMenu() {
      this.visible = !this.visible
      if (this.visible) {
        (this.$refs.input || this.$refs.reference).focus()
      }
    },
    handleClose() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss">
  @import '~@/styles/variables.scss';

  .v-tile-select .el-input .el-select__caret {
    color: $colorTextPlaceholder;
    font-size: 14px;
    transition: transform .3s;
    transform: rotate(180deg);
    cursor: pointer;
  }

  .v-tile-select .el-input .el-select__caret.is-reverse {
    transform: rotate(0deg);
  }
</style>
