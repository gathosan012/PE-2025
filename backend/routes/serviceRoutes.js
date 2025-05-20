import { Router } from 'express'
import authorizeAdmin from '../middleware/authMiddleware.js'
import { createServiceController, getServiceDetails, updateServiceDetails, deleteServiceDetails } from '../controllers/serviceController.js'


const serviceRouter = Router()

serviceRouter.post("/create",authorizeAdmin,createServiceController)
serviceRouter.post('/get',getServiceDetails)

//update service
serviceRouter.put('/update-service-details',authorizeAdmin, updateServiceDetails)

//delete service
serviceRouter.delete('/delete-service',authorizeAdmin, deleteServiceDetails)


export default serviceRouter