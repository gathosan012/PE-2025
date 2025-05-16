import ServiceModel from "../../../model/service.model";

export const createSerivceController = async(request, response) => {
    try {
        const {
            name,
            price,
            unit,
            description,
            landlord_id
        } = request.body
    
    if (!name || !price || !unit) {
        return response.status(400).json({
            message: "Enter required field",
            error: true,
            success: false
        })
    }

    const service = new ServiceModel({
        name, price, unit, description, landlord_id
    })

    const saveService = await service.save()

    return response.json({
        message: "Product Created Successfully",
        data: saveProduct,
        error: false,
        success: true
    })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const updateService = async(request,response)=>{
    try {
        const { _id } = request.body 

        if(!_id){
            return response.status(400).json({
                message : "provide service _id",
                error : true,
                success : false
            })
        }

        const updateService = await ServiceModel.updateOne({ _id : _id },{
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

export const deleteService = async(request,response)=>{
    try {
        const { _id } = request.body 

        if(!_id){
            return response.status(400).json({
                message : "provide _id ",
                error : true,
                success : false
            })
        }

        const deleteService = await ServiceModel.deleteOne({_id : _id })

        return response.json({
            message : "Delete successfully",
            error : false,
            success : true,
            data : deleteProduct
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
