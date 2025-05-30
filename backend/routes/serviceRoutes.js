import { Router } from 'express'
import authorizeAdmin, { authorizeLandlord } from '../middleware/authMiddleware.js'
import { createServiceController, getServiceDetails, updateServiceDetails, deleteServiceDetails } from '../controllers/serviceController.js'


const serviceRouter = Router()

serviceRouter.post("/create",authorizeLandlord,createServiceController)
serviceRouter.post('/get',getServiceDetails)

//update service
serviceRouter.put('/update-service-details',authorizeLandlord, updateServiceDetails)

//delete service
serviceRouter.delete('/delete-service',authorizeLandlord, deleteServiceDetails)


export default serviceRouter