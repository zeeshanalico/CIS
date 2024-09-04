import express from 'express'
import authRouter from './authRouter/authRouter'
import productRouter from './productRouter/productRouter'
import userRouter from './userRouter/userRouter'
import kioskRouter from './kioskRouter/kioskRouter'
import authorizeUser from '../middleware/authorizeUser'
import { Role, Roles } from '../roles/roles'
const router = express.Router()

router.use('/auth', authRouter)//decodeAccessToken will not work for it
router.use('/product', productRouter)
router.use('/user', authorizeUser([Roles.ADMIN, Roles.SUPER_ADMIN]), userRouter)
router.use('/kiosk', authorizeUser([Roles.ADMIN, Roles.SUPER_ADMIN]), kioskRouter)

export default router

