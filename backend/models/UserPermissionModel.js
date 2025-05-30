const mongoose = require('mongoose');

const userPermissionSchema = new mongoose.Schema({

    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    permissions:[{
        permissions_name: String,
        permission_value: [Number]  
    }]
})