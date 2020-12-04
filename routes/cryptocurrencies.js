import { Router } from 'express'
const router = Router()

import { getAll } from '../controllers/cryptoCurrencies/getAllCryptos'
import { addCrypto } from '../controllers/cryptoCurrency/addCrypto'
import { getMyCryptos } from '../controllers/cryptoCurrency/getMyCryptos'

import { verifyToken } from '../middlewares/verifyToken'

router.get('/get-all', [ verifyToken ], getAll)

router.get('/get/my-cryptos', [ verifyToken ], getMyCryptos)

router.post('/add', [ verifyToken ], addCrypto)

export default router
