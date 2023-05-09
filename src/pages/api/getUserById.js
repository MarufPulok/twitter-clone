import User from "@/models/User";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const userId = req.query.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      } else {
        return res.status(200).json({ user });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong", err });
    }
  }
};

export default handler;
