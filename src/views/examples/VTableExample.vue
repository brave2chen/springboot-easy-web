<template>
  <PageWrapper>
    <PageBlock padding-bottom>
      <VTable
        :columns="[
          {prop: 'a', label: '姓名', minWidth: 80, type: 'link', click: (value) => $message.success(value)},
          {prop: 'b', label: '别名', minWidth: 100, type: 'tag', data: [{label: '别名b1', value: 'b1'},{label: '别名b2', value: 'b2'}]},
          {prop: 'c', label: '翻译1', minWidth: 100, type: 'enum', data: [{label: '翻译1.1', value: 1},{label: '翻译1.2', value: 2}]},
          {prop: 'd', label: '翻译2', minWidth: 100, type: 'enum', data: [{label: '翻译2.1', value: 1},{label: '翻译2.2', value: 2}]},
          {prop: 'e', label: '翻译3', minWidth: 100, formatter: (row, column, cellValue, index) => cellValue + '_翻译3'}
        ]"
        :data="[{a: 'a1', b: 'b1', c: 1, d: '1,2', e: 2},{a: 'a2', b: 'b2', c:2, d:2, e: 1},{a: 'a3', b: 'b1', c: 2, d: '1', e: 2}]"
        :pagination="{currentPage: 2, pageSize: 10, total: 100}"
        show-index
        show-selection
      />
    </PageBlock>

    <PageBlock class="display-flex flex-direction-column" padding-bottom flexible>
      <VTitle
        class="flex-none"
        title="TABEL—DEMO2"
        border
        :buttons="buttons"
      />
      <VTable
        class="flex-auto"
        autoresize
        :columns="[{prop: 'a', label: '姓名', minWidth: 80},{prop: 'b', label: '别名', minWidth: 100}]"
        :data="[{a: 'a', b: 'b'},{a: 'a', b: 'b'},{a: 'a', b: 'b'},{a: 'a', b: 'b'},{a: 'a', b: 'b'},{a: 'a', b: 'b'},{a: 'a', b: 'b'},{a: 'a', b: 'b'},{a: 'a', b: 'b'},{a: 'a', b: 'b'},{a: 'a', b: 'b'},{a: 'a', b: 'b'},{a: 'a', b: 'b'},{a: 'a', b: 'b'},{a: 'a', b: 'b'}]"
        :load-more="{total: 100, load: () => $message.success('加载更多数据')}"
        show-index
        show-selection
      />
    </PageBlock>

    <VDialog title="新增" :visible.sync="visible">
      <PageBlock>
        <div style="height: 200px">static body</div>
      </PageBlock>

      <el-scrollbar class="flex-auto margin-top" wrap-style="overflow-x:hidden;">
        <PageBlock>
          <div style="height: 250px">scroll body 1</div>
        </PageBlock>
        <PageBlock>
          <div style="height: 250px">scroll body 2</div>
        </PageBlock>
        <PageBlock>
          <div style="height: 250px">scroll body 3</div>
        </PageBlock>
      </el-scrollbar>

      <template v-slot:buttons>
        <VButton type="primary" size="small" @click="visible=false">保存</VButton>
      </template>
    </VDialog>

  </PageWrapper>
</template>

<script>

export default {
  name: 'VTablexample',
  data() {
    return {
      visible: false,
      buttons: [{name: '新增', click: () => this.visible = true}]
    }
  }
}
</script>
