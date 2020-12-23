<template>
  <PageWrapper class="RoleManage">
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

    <VDialog :visible.sync="authorityForm.visible" :title="authorityForm.title">
      <PageBlock>
        <VForm
          style="width: 655px; margin: 0 auto;"
          :model="authorityForm.data"
          :items="[
            {prop: 'name', label: '角色账号', type: 'input', readonly: true, line: true},
            {prop: 'code', label: '角色昵称', type: 'input', readonly: true, line: true},
            {prop: 'authorities', label: '角色', type: 'transfer', line: true, data: authorities, titles: ['未授权资源', '已授权资源']},
          ]"
          :buttons="authorityForm.buttons"
        />
      </PageBlock>
    </VDialog>
  </PageWrapper>
</template>

<script>

import {page, get, remove, save, update, setAuthorities} from '@/api/role'
import {page as getAuthorities} from '@/api/authority'

export default {
  data() {
    return {
      authorities: [],

      condition: {
        title: '查询条件',
        buttons: [
          {name: '查询', click: () => this.loadData(true)}
        ],
        data: {
          sex: []
        }
      },

      table: {
        title: '角色列表',
        buttons: [
          {name: '新增', click: () => this.showSaveOrUpdateForm()}
        ],
        data: [],
        columns: [
          {prop: 'name', label: '角色名称'},
          {prop: 'code', label: '角色代码'}
        ],
        operation: {
          buttons: [
            {icon: 'el-icon-edit', click: (row) => this.showSaveOrUpdateForm(row)},
            {icon: 'el-icon-delete', click: (row) => this.remove(row)},
            {name: '权限设置', click: (row) => this.setAuthorities(row)}
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
        title: '创建角色',
        buttons: [
          {name: '取消', plain: true, click: () => (this.form.visible = false)},
          {name: '保存', click: () => this.saveOrUpdate()}
        ],
        data: {}
      },

      authorityForm: {
        visible: false,
        title: '权限设置',
        buttons: [
          {name: '取消', plain: true, click: () => (this.authorityForm.visible = false)},
          {name: '保存', click: () => this.setAuthorities()}
        ],
        data: {
          authorities: []
        }
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
        {prop: 'name', label: '角色名称', type: 'input', clearable: true},
        {prop: 'code', label: '角色代码', type: 'input', clearable: true}
      ]
    },
    formItems() {
      return [
        {prop: 'name', label: '角色名称', type: 'input'},
        {prop: 'code', label: '角色代码', type: 'input'}
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
      this.form.title = row.id ? '修改角色信息' : '创建角色'
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
      const action = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
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

    async setAuthorities(row) {
      if (this.authorityForm.visible === false) {
        this.authorityForm.data = {}
        this.authorityForm.visible = true
        const {data = {}} = await get(row.id)
        this.authorityForm.data = {...data, authorities: (data.authorities || []).map(role => role.id)}

        if (this.authorities.length === 0) {
          const {data = []} = await getAuthorities({pageSize: 1000})
          this.authorities = data.map(({id, name}) => ({label: name, key: id}))
        }
        return
      }
      await setAuthorities(this.authorityForm.data.id, this.authorityForm.data.authorities)
      this.$message.success('操作成功')
      this.authorityForm.visible = false
      await this.loadData(true)
    }
  }
}
</script>
