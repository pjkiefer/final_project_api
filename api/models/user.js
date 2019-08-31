const mongoose = require('mongoose')
const Assignment = require('./assignment')

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const schema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        lowercase:true,
        trim: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] 
    },
    first_name:{
        type: String,
        trim: true,
        required: true
    },
    last_name:{
        type: String,
        trim: true,
        required: true
    },
    password:{
        type: String,
        required: true,
        minlength: 8
    },
    admin:{
        type: Boolean,
        default: false
    },
    instructor:{
        type: Boolean,
        default: false
    },
    assignments:[Assignment],
    possible_score:{
        type: Number,
        default: 0,
        min: 0,
        max: 1000
    },
    student_score:{
        type: Number,
        default: 0,
        min: 0,
        max: 1000
    }

    
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

module.exports = mongoose.model('User', schema)