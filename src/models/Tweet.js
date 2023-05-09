import mongoose, { models } from "mongoose";

const TweetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
  },
  images: [{
    type: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  retweet: {
    isRetweet: {
      type: Boolean,
      default: false,
    },
    tweet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
    },
    retweetCreatedAt: {
      type: Date,
      default: Date.now,
    },
  },

  numberOfRetweets: {
    type: Number,
    default: 0,
  },

  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      tweet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
      },
      text: {
        type: String,
      },
      commentReplies: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          tweet: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tweet",
          },
          text: {
            type: String,
          },
          replyCreatedAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      commentCreatedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Tweet = models.Tweet || mongoose.model("Tweet", TweetSchema);
export default Tweet;
