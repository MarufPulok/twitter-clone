import mongoose from "mongoose"

const connection = {} 

const connect = async () => {
    if(connection.isConnected) {
        console.log('using existing connection')
        return
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        connection.isConnected = db.connections[0].readyState
        console.log('connection successful')
    } catch (err) {
        console.log('error: ',err)
    }
}

export default connect
