const express = require('express')
const {
    getCodeBlocks,
    getCodeBlock,
    createCodeBlock,
    updateCodeBlock,
} = require('../controllers/codeblockController')

const router = express.Router();

//GET all codeblocks
router.get('/', getCodeBlocks)

//GET a single codeblock
router.get('/:id', getCodeBlock)

//POST a new codeblock
router.post('/', createCodeBlock)

//UPDATE a codeblock
router.patch('/:id', updateCodeBlock)

module.exports = router