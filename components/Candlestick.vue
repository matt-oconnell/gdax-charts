<template>
  <div class="echarts">
    <IEcharts v-if="ready" :option="option"></IEcharts>
  </div>
</template>

<script>
import IEcharts from 'vue-echarts-v3/src/full.vue'

export default {
  name: 'view',
  components: {
    IEcharts
  },
  props: {
    option: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ready () {
      return !!this.option.dataZoom
    }
  }
}
</script>

<style scoped>
  div {
    width: 100%;
    height: 600px;
  }
</style>
