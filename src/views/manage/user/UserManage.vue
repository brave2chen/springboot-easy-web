<template>
  <PageWrapper class="UserManage">
    <PageBlock>
      <VTitle :buttons="buttons" border>查询条件</VTitle>
      <VForm :model="condition" :items="conditionItems" margin-top />
    </PageBlock>

    <PageBlock flexible>
      <VTable :data="data" :columns="columns" :pagination="pagination" :operation="operation" autoresize show-index />
    </PageBlock>

    <VDialog :visible.sync="form.visible" :title="form.title">
      <PageBlock>
        <VForm :model="form.data" :items="formItems" :buttons="form.buttons" />
      </PageBlock>
    </VDialog>
  </PageWrapper>
</template>

<script>

import {getItems} from '@/api/direction'
import {page, update, save, remove} from '@/api/user'

export default {
  data() {
    return {
      gender: [],

      title: '',

      condition: {
        sex: []
      },

      buttons: [
        {name: '查询', click: this.loadData},
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
          {icon: 'el-icon-edit', click: this.showSaveOrUpdateForm}
        ],
      },
      pagination: {
        currentPage: 1,
        pageSize: 20,
        total: 0
      },

      form: {
        visible: false,
        title: '创建用户',
        buttons: [
          {name: '取消', plain: true, click: () => (this.form.visible = false)},
          {name: '保存', click: this.saveOrUpdate}
        ],
        data: {}
      }
    }
  },

  computed: {
    params() {
      const {currentPage: pageIndex, pageSize} = this.pagination
      return {...this.condition, pageIndex, pageSize}
    },
    conditionItems() {
      return [
        {prop: 'identity', label: '身份', type: 'input', placeholder: '请输入 账号/手机/邮箱/昵称'},
        {prop: 'sex', label: '性别', type: 'checkbox', data: this.gender}
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
        this.pagination.currentPage = 1
      }
      const {data, page: {totalCount = 0}} = await page(this.params)
      if (data) {
        this.data = data
        this.pagination.total = totalCount
      }
    },
    showSaveOrUpdateForm(row = {}) {
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

    async remove(id) {
      return remove(id)
    }
  }
}
</script>
