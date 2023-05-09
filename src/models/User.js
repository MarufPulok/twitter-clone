import mongoose,{models} from "mongoose"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    bio: {
        type: String
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    dp: {
        type: String
    },
    cp: {
        type: String
    },
    tweets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet"
    }],
    retweets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet"
    }],
    joined: {
        type: Date,
        default: Date.now
    },
    born : {
        type: Date
    },

    // chat

    token: {
        type: String
    },
    notifications: [{
        chatID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        },
        messageID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message.messages"
        },
    }],
})

const User = models.User||mongoose.model("User", UserSchema)
export default User