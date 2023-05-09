import Message from "@/models/Message";


//Get conversations
const getConversation = async (req, res) => {
    try {
      const senderId = req.params;
  
      const messages = await MessageDBV2.find({
        "sender._id": senderId,
      })
        .populate("receiver")
        .populate("sender");
  
      const conversations = [];
  
      messages.forEach((message) => {
        const sender = {
          _id: message.sender._id,
          username: message.sender.username,
          email: message.sender.email,
          image: message.sender.image,
        };
  
        const receiver = {
          _id: message.receiver._id,
          username: message.receiver.username,
          email: message.receiver.email,
          image: message.receiver.image,
        };
  
        const conversation = {
          sender,
          receiver,
          messages: message.messages,
        };
  
        conversations.push(conversation);
      });
      res.status(200).json({ conversations });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export default async function handler(req, res) {
    await connectMongo();
    if (req.method == "GET") {
      await getConversation(req, res);
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  }