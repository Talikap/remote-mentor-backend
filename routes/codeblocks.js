const express = require('express')
const {
    getCodeBlocks,
    getCodeBlock,
    updateCodeBlock,
} = require('../controllers/codeblockController')

const router = express.Router();

//GET all codeblocks
router.get('/', getCodeBlocks)

//GET a single codeblock
router.get('/:id', getCodeBlock)

//UPDATE a codeblock
router.patch('/:id', updateCodeBlock)

module.exports = router