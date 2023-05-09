import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method == "GET") {
    const { id } = req.query;

    try {
      
      const users = await User.findById(id).select({
        messages: 1,
      });
      return res.status(200).json({ msg: "Success", users });
    } catch (error) {
      return res.status(500).json({ msg: "Server error" });
    }
  }

  return res.status(404).json({ msg: "Method not found" });
}
