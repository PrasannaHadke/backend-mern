const Contact = require('../models/contact.model')
const contact = async (req,res)=>{
    try {
        const {username , email , message } = req.body;
        const userMessage = await Contact.create({ username, email , message})
        
        return res.status(201).json({message : userMessage})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Internal Server Error"})
    }
}

module.exports = {contact}