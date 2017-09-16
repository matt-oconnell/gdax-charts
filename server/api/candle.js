import { Router } from 'express'
import * as axios from 'axios'
import candleFormatter from '../../plugins/candleFormatter'

const router = Router()

router.get('/candle/:coin', async (req, res, next) => {
  const { coin } = req.params
  let { data } = await axios.get(`https://api.gdax.com/products/${coin}-USD/candles/1m`)
  res.json({
    option: candleFormatter(data)
  })
})

export default router
