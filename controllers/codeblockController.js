const CodeBlock = require('../models/codeblockModel')
const mongoose = require('mongoose')

//get all codeblocks
const getCodeBlocks = async (req, res) => {
    //console.log('Endpoint accessed at:', new Date());
    const codeBlocks = await CodeBlock.find({}).sort({createdAt: -1})
    //console.log('Retrieved code blocks:', codeBlocks);
    res.status(200).json(codeBlocks)
}

//get a single codeblock
const getCodeBlock = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such codeblock'})
    }

    const codeBlock = await CodeBlock.findById(id)

    if(!codeBlock) {
        return res.status(404).json({error: 'No such codeblock'})
    }

    res.status(200).json(codeBlock)
}

//create new codeblock
const createCodeBlock = async (req, res) => {
    const {title, code} = req.body
    // add doc to db
    try{
        const codeBlocks = await CodeBlock.create({title, code})
        res.status(200).json(codeBlocks)
    }catch (error){
        res.status(400).json({error: error.message})
    }
}

//update a codeblock
const updateCodeBlock = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such codeblock'})
    }

    const codeBlocks = await CodeBlock.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!codeBlocks) {
        return res.status(404).json({error: 'No such codeblock'})
    }

    res.status(200).json
}

module.exports = {
    getCodeBlock,
    getCodeBlocks,
    createCodeBlock,
    updateCodeBlock
}