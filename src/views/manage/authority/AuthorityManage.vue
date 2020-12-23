<template>
  <PageWrapper class="AuthorityManage">
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
        autoresize
        show-index
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

import {page, remove, save, update, refresh} from '@/api/authority'

const methods = [
  {label: '全部', value: ''},
  {label: 'GET', value: 'GET'},
  {label: 'POST', value: 'POST'},
  {label: 'PUT', value: 'PUT'},
  {label: 'DELETE', value: 'DELETE'},
  {label: 'PATCH', value: 'PATCH'}
]

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
        title: '权限列表',
        buttons: [
          {name: '新增', click: () => this.showSaveOrUpdateForm()},
          {name: '重置缓存', click: () => this.refresh()}
        ],
        data: [],
        columns: [
          {prop: 'name', label: '权限名称'},
          {prop: 'method', label: '请求方法'},
          {prop: 'path', label: '请求路径'}
        ],
        operation: {
          buttons: [
            {icon: 'el-icon-edit', click: (row) => this.showSaveOrUpdateForm(row)},
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
        title: '创建权限',
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
        {prop: 'name', label: '权限名称', type: 'input', span: 8, clearable: true},
        {prop: 'method', label: '请求方法', type: 'select', data: methods, span: 8, clearable: true},
        {prop: 'path', label: '请求路径', type: 'input', span: 8, clearable: true}
      ]
    },
    formItems() {
      return [
        {prop: 'name', label: '权限名称', type: 'input'},
        {prop: 'method', label: '请求方法', type: 'select', data: methods},
        {prop: 'path', label: '请求路径', type: 'input'}
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
    async showSaveOrUpdateForm(row = {}) {
      this.form.title = row.id ? '修改权限信息' : '创建权限'
      this.form.data = row
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
      const action = await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => false)
      if (action) {
        await remove(id)
        this.$message.success('操作成功')
        await this.loadData(true)
      }
    },
    async refresh() {
      await refresh()
      this.$message.success('操作成功')
    }
  }
}
</script>
