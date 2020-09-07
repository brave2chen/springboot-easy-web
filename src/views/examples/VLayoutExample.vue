<template>
  <PageWrapper>
    <FlexBox flex="0 0 200px">
      <FlexItem :span="16">
        <FlexBox>
          <FlexItem :span="4">
            <PageBlock />
          </FlexItem>
          <FlexItem :span="12">
            <PageBlock />
          </FlexItem>
          <FlexItem :span="8">
            <PageBlock />
          </FlexItem>
        </FlexBox>
      </FlexItem>
      <FlexItem :span="8">
        <PageBlock />
      </FlexItem>
    </FlexBox>
    <PageBlock class="margin-top" flexible padding-bottom>
      <el-scrollbar v-if="scroll && elScroll" style="height: 100%" noresize wrap-style="overflow-x: hidden;">
        <div class="bg-dark" style="height: 500px;">
          PageBlock flexible scroll inner
          <el-button type="primary" @click="scroll = !scroll">{{ scroll ? '切换全屏滚动' : '切换局部滚动' }}</el-button>
          <el-button type="waning" @click="elScroll = !elScroll">{{ !elScroll ? '切换ElScrollbar' : '切换原生滚动条' }}</el-button>
        </div>
      </el-scrollbar>
      <div v-else-if="scroll && !elScroll" style="height: 100%;overflow-x: hidden;">
        <div class="bg-dark" style="height: 500px;">
          PageBlock flexible scroll inner
          <el-button type="primary" @click="scroll = !scroll">{{ scroll ? '切换全屏滚动' : '切换局部滚动' }}</el-button>
          <el-button type="waning" @click="elScroll = !elScroll">{{ !elScroll ? '切换ElScrollbar' : '切换原生滚动条' }}</el-button>
        </div>
      </div>
      <div v-else class="bg-dark" style="height: 500px;">
        PageBlock flexible scroll fullPage
        <el-button type="primary" @click="scroll = !scroll">{{ scroll ? '切换全屏滚动' : '切换局部滚动' }}</el-button>
      </div>
    </PageBlock>
    <PageBlock padding-bottom>
      <FlexBox style="height: 200px;" :direction="direction">
        <FlexItem :span="8">
          <div class="bg-dark">
            <el-button type="primary" @click="(direction=direction === 'column'?'row':'column')">{{ direction === 'row' ? '切换垂直布局' : '切换横向布局' }}</el-button>
          </div>
        </FlexItem>
        <FlexItem :span="8"><div class="bg-dark" style="height: 100%">2</div></FlexItem>
        <FlexItem :span="8"><div class="bg-dark" style="height: 100%">3</div></FlexItem>
      </FlexBox>
    </PageBlock>
  </PageWrapper>
</template>

<script>
import PageWrapper from '@/components/VLayout/PageWrapper'
import PageBlock from '@/components/VLayout/PageBlock'
import FlexBox from '@/components/VLayout/FlexBox'
import FlexItem from '@/components/VLayout/FlexItem'

export default {
  name: 'VLayoutExample',
  components: {FlexItem, FlexBox, PageBlock, PageWrapper},

  data() {
    return {
      scroll: true,
      elScroll: true,
      direction: 'column'
    }
  }
}
</script>
