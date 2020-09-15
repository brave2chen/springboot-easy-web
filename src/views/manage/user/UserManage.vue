<template>
  <PageWrapper class="UserManage">
    <PageBlock>
      <VTitle :buttons="condition.buttons" :title="condition.title" border />
      <VForm :model="condition.data" :items="conditionItems" label-width="50px" margin-top />
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
      />
    </PageBlock>

    <VDialog :visible.sync="form.visible" :title="form.title">
      <PageBlock>
        <VForm :model="form.data" :items="formItems" :buttons="form.buttons" />
      </PageBlock>
    </VDialog>

    <VDialog :visible.sync="roleForm.visible" :title="roleForm.title">
      <PageBlock>
        <VForm
          style="width: 655px; margin: 0 auto;"
          :model="roleForm.data"
          :items="[
            {prop: 'username', label: '用户账号', type: 'input', readonly: true, line: true},
            {prop: 'nickname', label: '用户昵称', type: 'input', readonly: true, line: true},
            {prop: 'roles', label: '角色', type: 'transfer', line: true, data: roles, titles: ['未选择角色列表', '已选择角色列表']},
          ]"
          :buttons="roleForm.buttons"
        />
      </PageBlock>
    </VDialog>
  </PageWrapper>
</template>

<script>

import {getItems} from '@/api/direction'
import {page, remove, save, setRoles, update} from '@/api/user'
import {page as getRoles} from '@/api/role'

export default {
  data() {
    return {
      gender: [],
      roles: [],

      condition: {
        title: '查询条件',
        buttons: [
          {name: '查询', click: this.loadData}
        ],
        data: {
          sex: []
        }
      },

      table: {
        title: '用户列表',
        buttons: [
          {name: '新增', click: this.showSaveOrUpdateForm}
        ],
        data: [],
        columns: [
          {prop: 'username', label: '账号', type: 'input'},
          {prop: 'mobile', label: '手机号码', type: 'input'},
          {prop: 'email', label: '邮箱地址', type: 'input'},
          {prop: 'nickname', label: '昵称', type: 'input'},
          {prop: 'genderName', label: '性别', type: 'input'}
        ],
        operation: {
          buttons: [
            {icon: 'el-icon-edit', click: this.showSaveOrUpdateForm},
            {icon: 'el-icon-delete', click: this.remove},
            {name: '角色设置', click: this.setRoles}
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
        title: '创建用户',
        buttons: [
          {name: '取消', plain: true, click: () => (this.form.visible = false)},
          {name: '保存', click: this.saveOrUpdate}
        ],
        data: {}
      },

      roleForm: {
        visible: false,
        title: '角色设置',
        buttons: [
          {name: '取消', plain: true, click: () => (this.roleForm.visible = false)},
          {name: '保存', click: this.setRoles}
        ],
        data: {
          roles: []
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
        {prop: 'identity', label: '身份', type: 'input', placeholder: '请输入 账号/手机/邮箱/昵称'},
        {prop: 'sex', label: '性别', type: 'select', multiple: true, data: this.gender}
      ]
    },
    formItems() {
      return [
        {prop: 'username', label: '账号', type: 'input'},
        {prop: 'password', label: '密码', type: 'password', autocomplete: 'new-password'},
        {prop: 'mobile', label: '手机号码', type: 'input'},
        {prop: 'email', label: '邮箱地址', type: 'input'},
        {prop: 'nickname', label: '昵称', type: 'input'},
        {prop: 'gender', label: '性别', type: 'select', data: this.gender}
      ]
    }
  },

  mounted() {
    this.loadData()

    getItems('sex', true).then(gender => (this.gender = gender))
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
      this.form.title = row.id ? '修改用户信息' : '创建用户'
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
      const action = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
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

    async setRoles(row) {
      if (this.roleForm.visible === false) {
        this.roleForm.visible = true
        this.roleForm.data.id = row.id
        this.roleForm.data.username = row.username
        this.roleForm.data.nickname = row.nickname
        this.roleForm.data.roles = row.rolesId

        if (this.roles.length === 0) {
          const {data = []} = await getRoles({pageSize: 1000})
          this.roles = data.map(({id, name}) => ({label: name, key: id}))
        }
        return
      }
      await setRoles(this.roleForm.data.id, this.roleForm.data.roles)
      this.$message.success('操作成功')
      this.roleForm.visible = false
      await this.loadData(true)
    }
  }
}
</script>