<template>
  <PageWrapper>
    <PageBlock>
      <!--   列数自适应   -->
      <VDetailForm
        label-width="50px"
        :items="[
          {label: '姓名', value: '张三张三张三'},
          {label: '年龄', value: 20},
          {label: '年龄', value: 20},
          {label: '年龄', value: () => '通过函数来格式化value', type: 'copy'},
          {label: '标签', value: 1, type: 'tag', data: [{label: '标签', value: 1, type: 'success'}]},
          {label: '枚举', value: 1, type: 'enum', data: [{label: '枚举Label', value: 1}]},
          {label: '多枚举', value: '1,2', type: 'enum', data: [{label: '枚举1', value: 1},{label: '枚举2', value: 2}]},
          {label: '链接', value: '链接', type: 'link', innerType: 'danger', click: () => $message.warning('click 链接')},
          {label: '年龄', value: 20},
          {label: '年龄', value: 20, prop: 'slot1'},
          {label: '年龄', value: 20},
          {label: '年龄', value: 20},
          {label: '年龄', value: 20},
          {label: '备注', minWidth: 800, value: '看到的法律框架大幅度的疯狂的减肥的路口附近的浪费的路口附近的的离开房间啊；的我我解放路才可能链接ad，大；打飞机的垃圾的风景达到减肥都拉飞机的打飞机啊打飞机都放假多久了多久啊啊家'},
          {label: '备注', minWidth: 800, value: '看到的法律框架大幅度的疯狂的减肥的路口附近的浪费的路口附近的的离开房间啊；的我我解放路才可能链接ad，大；打飞机的垃圾的风景达到减肥都拉飞机的打飞机啊打飞机都放假多久了多久啊啊家'},
        ]"
      >
        <template v-slot:slot1>
          <el-tag size="mini">prop指定slot来自定义呈现</el-tag>
        </template>
      </VDetailForm>
    </PageBlock>

    <PageBlock>
      <!--   value通过model传入   -->
      <VDetailForm
        label-width="60px"
        :items="[
          {label: '姓名1', prop: 'name1'},
          {label: '姓名2', prop: 'name2', value: (value) => `model的值：${value}，转换后的值: 自行实现`},
          {label: '年龄1', prop: 'age1'},
          {label: '年龄2', prop: 'age2'},
          {label: '备注', prop: 'remark', line: true},
        ]"
        :model="{
          name1: 'value通过model传入value通过model传入value通过model传入value通过model传入value通过model传入',
          name2: 'model-value-for-name2',
          age1: 'value通过model传入value通过model传入value通过model传入',
          age2: 'value通过model传入value通过model传入value通过model传入',
          remark: 'value通过model传入value通过model传入value通过model传入value通过model传入value通过model传入value通过model传入value通过model传入value通过model传入value通过model传入value通过model传入value通过model传入',
        }"
      >
        <template v-slot:age1>
          <el-tag size="mini">age1指定slot来自定义呈现</el-tag>
        </template>
      </VDetailForm>
    </PageBlock>

    <PageBlock flexible>
      <!--   列数固定   -->
      <VDetailForm
        label-width="50px"
        :cols="3"
        :items="[
          {label: '姓名', value: '张三张三张三'},
          {label: '年龄', value: 20},
          {label: '年龄', value: 20},
          {label: '年龄', value: 20},
          {label: '年龄', value: 20},
          {label: '年龄', value: 20},
          {label: '年龄', value: 20},
          {label: '年龄', value: 20},
          {label: '年龄', value: 20},
          {label: '年龄', value: 20},
          {label: '备注', line: true, value: '看到的法律框架大幅度的疯狂的减肥的路口附近的浪费的路口附近的的离开房间啊；的我我解放路才可能链接ad，大；打飞机的垃圾的风景达到减肥都拉飞机的打飞机啊打飞机都放假多久了多久啊啊家'},
          {label: '备注', line: true, value: '看到的法律框架大幅度的疯狂的减肥的路口附近的浪费的路口附近的的离开房间啊；的我我解放路才可能链接ad，大；打飞机的垃圾的风景达到减肥都拉飞机的打飞机啊打飞机都放假多久了多久啊啊家'},
        ]"
      />
    </PageBlock>
  </PageWrapper>
</template>

<script>
export default {
  name: 'VDetailFormExample',
  data() {
    return {}
  },
  computed: {}
}
</script>
