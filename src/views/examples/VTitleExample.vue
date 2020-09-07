<template>
  <PageWrapper>
    <PageBlock padding-bottom>
      <VTitle title="标题1" border />
    </PageBlock>

    <PageBlock>
      <VTitle title="标题2" :buttons="[{name: '按钮1', click: () => $message.success('click 按钮1')}]" />
    </PageBlock>

    <PageBlock no-padding-top>
      <!-- 此时padding-top需要改变一下，因为el-tabs占据了比较大line-height-->
      <VTitle class="padding-top--auto-none">
        <template v-slot:title>
          <el-tabs value="1">
            <el-tab-pane name="1" label="TAB1" />
            <el-tab-pane name="2" label="TAB1" />
          </el-tabs>
        </template>
        <template v-slot:buttons>
          <el-link :underline="false">更多</el-link>
        </template>
      </VTitle>
    </PageBlock>

    <PageBlock no-padding-top>
      <!-- 此时padding-top需要改变一下，因为el-tabs占据了比较大line-height-->
      <VTitle
        class="padding-top--auto-none"
        no-padding-bottom
        :buttons="[{name: '按钮1', click: () => $message.success('click 按钮1')}]"
      >
        <template v-slot:title>
          <el-tabs value="1">
            <el-tab-pane name="1" label="TAB1" />
            <el-tab-pane name="2" label="TAB1" />
          </el-tabs>
        </template>
      </VTitle>
    </PageBlock>

  </PageWrapper>
</template>

<script>

export default {
  name: 'VTitleExample',
  data() {
    return {}
  }
}
</script>
