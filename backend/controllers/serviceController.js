import Service from '../models/Service.model.js'
import Service from '../models/Service.model.js'

export const createServiceController = async(request,response)=>{
    try {
        const {name, price, type, description} = request.body 

        if(!name || !price || !type ){
            return response.status(400).json({
                message : "Enter required fields",
                error : true,
                success : false
            })
        }

        const Service = new Service({
            name ,
            price,
            type,
            description
        })
        const saveService = await Service.save()

        return response.json({
            message : "Product Created Successfully",
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

        const service = await Service.findOne({ _id : serviceId })


        return response.json({
            message : "service details",
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
        const { _id } = request.body 

        if(!_id){
            return response.status(400).json({
                message : "provide service _id",
                error : true,
                success : false
            })
        }

        const updateService = await Service.updateOne({ _id : _id },{
            ...request.body
        })

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

        const deleteService = await Service.deleteOne({_id : _id })

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