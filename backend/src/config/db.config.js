const mongoose = require("mongoose")

exports.ConnectDB = async()=>{
    try {
            await mongoose.connect(process.env.MONGO_URI || '')
            console.log(`the db is connect with ${mongoose.connection.host}`.blue);
            
    } catch (error) {
        console.error(`Error connecting to the DB: ${error.message}`.red);
        mongoose.disconnect()
        process.exit(1)
    }
}
 
