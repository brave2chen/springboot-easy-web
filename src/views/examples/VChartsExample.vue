<template>
  <PageWrapper>
    <PageBlock flexible>
      <VCharts :options="options" autoresize />
    </PageBlock>
  </PageWrapper>
</template>

<script>
import VCharts from '@/components/VCharts'

export default {
  name: 'VChartsExample',
  components: {VCharts},
  data() {
    return {
      // 此处传入echart的配置即可
      options: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      }
    }
  }
}
</script>
