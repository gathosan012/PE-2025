import { Router } from 'express'
import auth from '../middleware/auth.js'
import {admin} from '../middleware/Admin.js'
import { createSerivceController, updateService, deleteService  } from '../controllers/service.controllers.js'

const serviceRouter = Router()

productRouter.post("/create",auth, admin, createSerivceController)
productRouter.put('/update-service',auth, admin, updateService)
productRouter.delete('/delete-service', auth, admin, deleteService)

export default serviceRouter