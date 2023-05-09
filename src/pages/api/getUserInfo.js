import User from "../../models/User";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const user = await User.findOne({ _id: req.query.id });
      res.status(200).json({ message: "User fetched", user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong", err });
    }
  }
};

export default handler;
