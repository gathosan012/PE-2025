const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({

    permission_name:{
        type:String,
        required: true
    },
    is_default:{
        type: Number,
        default: 0      // 0 -> not default, 1-> default
    }
})

module.exports = mongoose.model('Permission', PermissionSchema);
