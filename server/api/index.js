import { Router } from 'express'

import candle from './candle'

const router = Router()

router.use(candle)

export default router
