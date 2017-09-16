<template>
  <div>
    <div>GDAX - LTC</div>
    <select v-model="selected">
      <option>LTC</option>
      <option>BTC</option>
      <option>ETH</option>
    </select>
    <candlestick :option="option"/>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import Candlestick from '~/components/Candlestick.vue'

async function fetch (type) {
  const { data } = await axios.get(`/api/candle/${type}`)
  return { option: data.option }
}

export default {
  components: {
    Candlestick
  },
  data () {
    return {
      selected: 'LTC'
    }
  },
  watch: {
    async selected (coin) {
      const { option } = await fetch(coin)
      this.option = option
    }
  },
  async asyncData ({ params, error }) {
    return fetch('LTC')
  }
}
</script>
