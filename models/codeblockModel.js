const mongoose = require('mongoose')

const Schema = mongoose.Schema

const codeBlockSchema = new Schema({
    
    title: {
        type: String,
        required: true
    },
    question:{
        type: String,
        required: true
    },
    code: {
        type: String,
    }, 
    answer:{
        type: String,
        required: true
    },
})

module.exports = mongoose.model('CodeBlock', codeBlockSchema)

