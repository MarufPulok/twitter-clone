import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    cus_id: {
      type: String,
    },
    notification: {
      type: Boolean,
      default: false,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderUsername: {
      type: String,
    },
    senderEmail: {
      type: String,
    },
    senderImage: {
      type: String,
    },
    receiverUsername: {
      type: String,
    },
    receiverEmail: {
      type: String,
    },
    receiverImage: {
      type: String,
    },
    messages: [
      {
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        receiver: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        senderUsername: {
          type: String,
        },
        senderEmail: {
          type: String,
        },
        senderImage: {
          type: String,
        },
        receiverUsername: {
          type: String,
        },
        receiverEmail: {
          type: String,
        },
        receiverImage: {
          type: String,
        },
        body: {
          type: String,
          required: true,
        },
        image: {
          type: String,
        },
        react: {
          type: String,
          enum: ["none", "like", "love", "dislike", "angry", "sad"],
          default: "none",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        seen: {
          type: Boolean,
          default: false,
        },
        seenAt: {
          type: Date,
        },
      },
    ],
  },
  { timestamps: true }
);

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;