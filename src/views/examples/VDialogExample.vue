<template>
  <PageWrapper>
    <PageBlock padding-bottom>
      <VButton @click="dialog1=true">按钮1</VButton>
      <VButton @click="dialog2=true">按钮2</VButton>
      <VButton @click="dialog3=true">按钮3</VButton>
      <VButton :click="() => dialog4 = true">按钮4</VButton>
    </PageBlock>
    <VDialog :visible.sync="dialog1" title="dialog1">
      <PageBlock flexible>dialog1</PageBlock>
    </VDialog>

    <VDialog :visible.sync="dialog2">
      <PageBlock flexible>
        dialog2 没有title
        <VButton @click="dialog2=false">close</VButton>
      </PageBlock>
    </VDialog>

    <VDialog
      :visible.sync="dialog3"
      title="dialog3"
      :buttons="[
        {name: '查询', icon: 'el-icon-search', click: () => $message.success('search')},
        {name: '新增', icon: 'el-icon-search', click: () => $message.success('add')},
      ]"
    >
      <PageBlock flexible>dialog3 有buttons</PageBlock>
    </VDialog>

    <VDialog :visible.sync="dialog4" title="dialog4">
      <el-scrollbar style="height: 100%" wrap-style="overflow-x:hidden;">
        <PageBlock style="height: 1000px">
          dialog4 有footer，且滚动条只在中间部分
        </PageBlock>
      </el-scrollbar>
      <template v-slot:footer>
        <VButton icon="el-icon-search">查询</VButton>
        <VButton icon="el-icon-plus">新增</VButton>
      </template>
    </VDialog>

  </PageWrapper>
</template>

<script>

export default {
  name: 'VDialogExample',
  data() {
    return {
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false
    }
  }
}
</script>
