import express from 'express'
import authRouter from './authRouter/authRouter'
import productRouter from './productRouter/productRouter'
const router = express.Router()

router.use('/auth', authRouter)
router.use('/product', productRouter)

export default router

