<template>
  <PageWrapper class="midea-input-demo">
    <PageBlock>
      <el-row style="width: 600px;margin: 0 auto;">
        <el-col>
          <VInput v-model="text" type="text" prefix-icon="el-icon-search" />
        </el-col>

        <el-col>
          <VInput v-model.number="number" type="text" suffix-icon="fa fa-percent" />
        </el-col>

        <el-col>
          <VInput v-model="text" type="textarea" prefix-icon="el-icon-search" />
        </el-col>

        <el-col>
          <VInput v-model="number" type="number" />
        </el-col>

        <el-col>
          <VInput v-model="select" type="select" :data="data" />
        </el-col>
        <el-col>
          <VInput v-model="select" type="radio" :data="data" />
        </el-col>

        <el-col>
          <VInput v-model="multiple" type="select" multiple :data="data" />
        </el-col>
        <el-col>
          <VInput v-model="multiple" type="checkbox" :data="data" />
        </el-col>

        <el-col>
          <VInput v-model="date" type="date" />
        </el-col>
        <el-col>
          <VInput v-model="time" type="time" />
        </el-col>
        <el-col>
          <VInput v-model="datetime" type="datetime" />
        </el-col>

        <el-col>
          <VInput v-model="daterange" type="daterange" />
        </el-col>
        <el-col>
          <VInput v-model="timerange" type="timerange" />
        </el-col>
        <el-col>
          <VInput v-model="datetimerange" type="datetimerange" />
        </el-col>

        <el-col>
          <VInput v-model="switchValue" type="switch" active-text="按月付费" inactive-text="按年付费" />
        </el-col>

        <el-col>
          <VInput :value="80" type="slider" />
        </el-col>

        <el-col>
          <VInput :value="3.7" type="rate" />
        </el-col>

        <el-col>
          <VInput value="#F2F3F4" type="color" />
        </el-col>

        <el-col>
          <VInput v-model="multiple" type="transfer" :data="data.map(({label, value}) => ({key: value, label}))" />
        </el-col>

        <el-col>
          <VInput v-model="text" type="tileSelect" :rows="[[1,2,3],[4,5,6],[7,8,9],['*', 0, '#']]" />
        </el-col>

        <el-col>
          <VInput value="参考VButton" type="button" inner-type="primary" />
        </el-col>

        <el-col>
          <VInput value="普通文本" type="plaintext" />
        </el-col>

      </el-row>
    </PageBlock>
  </PageWrapper>
</template>

<script>
import VInput from '@/components/VInput'
import image from '@/assets/404_images/404_cloud.png'

export default {
  name: 'VInputExample',
  components: {VInput},
  data() {
    return {
      image,
      text: '',
      select: 1,
      multiple: [1, 2],
      number: 20,
      date: '2020-08-30',
      time: '12:12:12',
      datetime: '2020-08-30 12:00:00',
      daterange: '',
      timerange: '',
      datetimerange: '',
      switchValue: true,

      data: [{value: 1, label: '选项1'}, {value: 2, label: '选项2'}, {value: 3, label: '选项3'}, {value: 4, label: '选项4'}]
    }
  }
}
</script>

<style>
  .midea-input-demo .el-col {
    margin-bottom: 10px;
  }
</style>
