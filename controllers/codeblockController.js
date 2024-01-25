
const CodeBlock = require('../models/codeblockModel');
const mongoose = require('mongoose');

// Get all codeblocks
const getCodeBlocks = async (req, res) => {
    // Retrieve all codeblocks from the database, sorted by creation date
    const codeBlocks = await CodeBlock.find({}).sort({ createdAt: -1 });
    // Respond with the retrieved codeblocks
    res.status(200).json(codeBlocks);
};

// Get a single codeblock by ID
const getCodeBlock = async (req, res) => {
    const { id } = req.params;

    // Check if the provided ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such codeblock' });
    }

    // Find the codeblock by ID
    const codeBlock = await CodeBlock.findById(id);

    // Check if the codeblock exists
    if (!codeBlock) {
        return res.status(404).json({ error: 'No such codeblock' });
    }

    // Respond with the retrieved codeblock
    res.status(200).json(codeBlock);
};

// Update a codeblock by ID
const updateCodeBlock = async (req, res) => {
    const { id } = req.params;

    // Check if the provided ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such codeblock' });
    }

    // Find and update the codeblock by ID with the provided data
    const codeBlock = await CodeBlock.findOneAndUpdate({ _id: id }, { ...req.body });

    // Check if the codeblock exists
    if (!codeBlock) {
        return res.status(404).json({ error: 'No such codeblock' });
    }

    // Respond with a success status
    res.status(200).json();
};

// Export the functions to be used in other modules
module.exports = {
    getCodeBlock,
    getCodeBlocks,
    updateCodeBlock,
};
