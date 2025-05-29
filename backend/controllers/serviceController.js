import Service from '../models/Service.model.js'

export const createServiceController = async(request,response)=>{
    try {
        const {name, price, type, description} = request.body 
        const landlordId = request.user?.id;

        if(!name || !price || !type ){
            return response.status(400).json({
                message : "Enter required fields",
                error : true,
                success : false
            })
        }

        if(!landlordId){
            return response.json({
                message: "Landlord id missing from request",
                error: true,
                success: false
            })
        }

        const newService = new Service({
            name ,
            price,
            type,
            description,
            landlordId
        })
        const saveService = await newService.save()

        return response.json({
            message : "Service Created Successfully",
            data : saveService,
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getServiceDetails = async(request,response)=>{
    try {
        const { serviceId } = request.body 

        if (!serviceId) {
            return response.status(400).json({
                message: "Service ID is required",
                error: true,
                success: false
            })
        }

        const service = await Service.findById({serviceId })

        if (!service){
            return response.status(404).json({
                message: "service not found",
                error: true,
                success: false
            })
        }

        return response.json({
            message : "service details retrieved",
            data : service,
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const updateServiceDetails = async(request,response)=>{
    try {
        const { _id, ...updateFields } = request.body 

        if(!_id){
            return response.status(400).json({
                message : "provide service _id",
                error : true,
                success : false
            })
        }

        const updateService = await Service.findByIdAndUpdate({ _id, updateFields})

        if (!updateService) {
            return response.status(404).json({
                message: "Service not found",
                error: true,
                success: false        
            })
        }

        return response.json({
            message : "updated successfully",
            data : updateService,
            error : false,
            success : true
        })



    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const deleteServiceDetails = async(request,response)=>{
    try {
        const { _id } = request.body 

        if(!_id){
            return response.status(400).json({
                message : "provide _id ",
                error : true,
                success : false
            })
        }

        const deleteService = await Service.findOneAndDelete({_id})

        if (!deletedService) {
        return response.status(404).json({
            message: "Service not found",
            error: true,
            success: false,
        });
        }

        return response.json({
            message : "Delete successfully",
            error : false,
            success : true,
            data : deleteService
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}