<template>
  <PageWrapper class="DictionaryManage">
    <PageBlock>
      <VTitle :buttons="condition.buttons" :title="condition.title" border />
      <VForm :model="condition.data" :items="conditionItems" margin-top />
    </PageBlock>

    <PageBlock class="display-flex flex-direction-column" flexible padding-bottom>
      <VTitle class="flex-none" :buttons="table.buttons" :title="table.title" border />
      <VTable
        class="flexible"
        :data="table.data"
        :columns="table.columns"
        :pagination="table.pagination"
        :operation="table.operation"
        row-key="id"
        autoresize
        @current-page-change="loadData()"
      />
    </PageBlock>

    <VDialog :visible.sync="form.visible" :title="form.title">
      <PageBlock>
        <VForm ref="form" :model="form.data" :items="formItems" :buttons="form.buttons" />
      </PageBlock>
    </VDialog>
  </PageWrapper>
</template>

<script>

import {page, remove, save, update} from '@/api/direction'

export default {
  data() {
    return {
      condition: {
        title: '查询条件',
        buttons: [
          {name: '查询', click: () => this.loadData(true)}
        ],
        data: {}
      },

      table: {
        title: '字典列表',
        buttons: [
          {name: '新增', click: () => this.showSaveOrUpdateForm()}
        ],
        data: [],
        columns: [
          {prop: 'sortId', label: '序号'},
          {prop: 'type', label: '字典类型'},
          {prop: 'itemName', label: '显示名'},
          {prop: 'itemValue', label: '存储值'},
          {prop: 'description', label: '描述说明'}
        ],
        operation: {
          buttons: [
            {icon: 'el-icon-edit', click: (row) => this.showSaveOrUpdateForm(row, false)},
            {icon: 'el-icon-plus', click: (row) => this.showSaveOrUpdateForm(row, true)},
            {icon: 'el-icon-delete', click: (row) => this.remove(row)}
          ]
        },
        pagination: {
          currentPage: 1,
          pageSize: 20,
          total: 0
        }
      },

      form: {
        visible: false,
        title: '创建字典',
        buttons: [
          {name: '取消', plain: true, click: () => (this.form.visible = false)},
          {name: '保存', click: () => this.saveOrUpdate()}
        ],
        data: {}
      }
    }
  },

  computed: {
    params() {
      const {currentPage: pageIndex, pageSize} = this.table.pagination
      return {...this.condition.data, pageIndex, pageSize}
    },
    conditionItems() {
      return [
        {prop: 'type', label: '字典类型', type: 'input', clearable: true},
        {prop: 'itemName', label: '显示名', type: 'input', clearable: true}
      ]
    },
    formItems() {
      return [
        {prop: 'type', label: '字典类型', type: 'input'},
        {prop: 'itemName', label: '显示名', type: 'input'},
        {prop: 'itemValue', label: '存储值', type: 'input'},
        {prop: 'description', label: '描述说明', type: 'input'}
      ]
    }
  },

  mounted() {
    this.loadData()
  },

  methods: {
    async loadData(reset = false) {
      if (reset) {
        this.table.pagination.currentPage = 1
      }
      const {data, page: {totalCount = 0}} = await page(this.params)
      if (data) {
        this.table.data = data
        this.table.pagination.total = totalCount
      }
    },
    async showSaveOrUpdateForm(row = {sortId: this.table.pagination.total + 1}, addChild) {
      this.form.title = row.id ? addChild ? `新增字典[${row.itemName}]子项` : '修改字典信息' : '创建字典'
      this.form.data = row.id && addChild ? {parentId: row.id, type: row.type, sortId: (row.children || []).length + 1} : row
      this.form.visible = true
      this.$nextTick(() => this.$refs.form.clearValidate())
    },
    async saveOrUpdate() {
      if (this.form.data.id) {
        await update(this.form.data.id, this.form.data)
      } else {
        await save(this.form.data)
      }
      this.$message.success('操作成功')
      this.form.visible = false
      await this.loadData(true)
    },
    async remove({id}) {
      const action = await this.$confirm('此操作将永久删除该字典, 是否继续?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => false)
      if (action) {
        await remove(id)
        this.$message.success('操作成功')
        await this.loadData(true)
      }
    }
  }
}
</script>
