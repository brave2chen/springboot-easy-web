<template>
  <PageWrapper>
    <PageBlock padding-bottom flexible>
      <VButton type="primary" @click="$message.info('@click')">@click 绑定事件</VButton>
      <VButton type="success" :click="() => $message.success('click called')">click属性 绑定事件</VButton>
      <VButton type="warning" name="name属性绑定按钮名称" />
      <VButton type="info" asset="没有权限disabled">没有权限disabled</VButton>
      <span>此处没有权限hidden掉了一个BUTTON<VButton type="error" asset="没有权限disabled" asset-type="hidden">没有权限hidden</VButton></span>

      <VButton type="primary" :icon="image" />
      <VButton plain type="success" :icon="image" />
      <VButton round type="warning" :icon="image" />
      <VButton circle type="info" :icon="image" />
      <VButton type="error" :icon="image" />
      <VButton type="text" :icon="image" />
    </PageBlock>

  </PageWrapper>
</template>

<script>
import VButton from '@/components/VButton'
import image from '@/assets/404_images/404_cloud.png'

export default {
  name: 'VTitleExample',
  components: {VButton},
  data() {
    return {image}
  }
}
</script>
