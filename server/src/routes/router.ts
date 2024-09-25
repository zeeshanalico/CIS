import express from 'express'
import authRouter from './authRouter/authRouter'
import productRouter from './productRouter/productRouter'
import userRouter from './userRouter/userRouter'
import kioskRouter from './kioskRouter/kioskRouter'
import vendorRouter from './vendorRouter/vendorRouter'
import vendorPurchaseRouter from './vendorPurchaseRouter/vendorPurchaseRouter'
import authorizeUser from '../middleware/authorizeUser'
import { Role, Roles } from '../roles/roles'
import saleRouter from './saleRouter/saleRouter'
import customerRouter from './customerRouter/customerRouter'
const router = express.Router()

router.use('/auth', authRouter)//decodeAccessToken will not work for it
router.use('/product', productRouter)
router.use('/user', authorizeUser([Roles.ADMIN, Roles.SUPER_ADMIN]), userRouter)
router.use('/kiosk', authorizeUser([Roles.ADMIN, Roles.SUPER_ADMIN]), kioskRouter)
router.use('/vendor', authorizeUser([Roles.ADMIN, Roles.SUPER_ADMIN, Roles.USER]), vendorRouter)
router.use('/customer', authorizeUser([Roles.ADMIN, Roles.SUPER_ADMIN, Roles.USER]), customerRouter)
router.use('/sale', authorizeUser([Roles.ADMIN, Roles.SUPER_ADMIN, Roles.USER]), saleRouter)
router.use('/vendor-purchase', authorizeUser([Roles.ADMIN, Roles.SUPER_ADMIN, Roles.USER]), vendorPurchaseRouter)

export default router

