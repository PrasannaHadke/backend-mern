const mongoose = require('mongoose')

const URI =process.env.MONGODB_URI

const connectDb = async()=>{
    try {
        await mongoose.connect(URI);
        console.log(`Connected to DB successful`);
    } catch (error) {
        console.error(`Connection Failed`);
        process.exit(0);
    }
}

module.exports = connectDb