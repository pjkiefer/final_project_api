const mongoose = require('mongoose')

const schema = mongoose.Schema({
    assignment_title:{
        type: String,
        required: true
    },
    project_link:{
        type: String,
        required: true
    },
    description:{
        type: String,
        default:''
    },
    possible_score:{
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    student_score:{
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    graded:{
        type :Boolean,
        required: true,
        default: false
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

module.exports = schema