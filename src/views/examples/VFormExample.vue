<template>
  <PageWrapper>
    <PageBlock>
      <VForm label-width="40px">
        <VFormItem v-model="condition.name" label="姓名" type="text" :span="12" />
        <VFormItem v-model="condition.age" label="年龄" type="number" :span="12" />
        <VFormItem v-model="condition.remark" label="备注" type="textarea" line :rows="3" />
      </VForm>
    </PageBlock>

    <PageBlock>
      <VForm
        label-width="40px"
        :model="condition"
        :items="[
          {label: '姓名', prop: 'name', type: 'text', prepend:'http://', append: '.com'},
          {label: '年龄', prop: 'age', type: 'number', controls: false, suffixIcon: 'fa fa-percent'},
          {label: '备注', prop: 'remark', type: 'textarea', line: true, rows: 3},
        ]"
        :buttons="[
          {name: '取消', plain: true, click: () => $message.warning('取消')},
          {name: '保存', click: () => $message.success('保存成功')},
        ]"
      />
    </PageBlock>

    <PageBlock>
      <VForm
        label-width="40px"
        :model="condition"
        :items="[
          {label: '姓名', prop: 'name', type: 'text', prepend: {prop: 'samplingMethod', type: 'select', data: data, width: 100}},
          {label: '年龄', prop: 'age', type: 'slot'},
        ]"
      >
        <template v-slot:age>
          <FlexBox>
            <FlexItem>
              <VInput v-model="condition.age" type="text" />
            </FlexItem>
            <FlexItem>
              <VInput v-model="condition.age" type="number" />
            </FlexItem>
          </FlexBox>
        </template>
        <template v-slot:tips>
          提示：可以添加提示文本再最后
        </template>
      </VForm>
    </PageBlock>

    <PageBlock padding-bottom flexible>
      <VButton plain type="primary" @click="() => $refs.condition.resetFields()">重置</VButton>
      <VButton type="primary" @click="() => $refs.condition.validate()">验证</VButton>
    </PageBlock>
  </PageWrapper>
</template>

<script>
import VForm from '@/components/VForm'
import VButton from '@/components/VButton/index'

export default {
  name: 'VFormExample',
  components: {VButton, VForm},
  data() {
    return {
      data: [{label: '选项1', value: 1}, {label: '选项2', value: 2}, {label: '选项3', value: 3}],
      condition: {
        name: '',
        age: undefined,
        remark: ''
      },
      rules: {
        name: [{required: true, trigger: 'blur', message: '请输入名称'}],
        age: [{required: true, trigger: 'blur', message: '请输入年龄'}]
      }
    }
  },
  computed: {}
}
</script>
