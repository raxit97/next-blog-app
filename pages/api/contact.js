import { connectDatabse, insertDocument } from "../../utils/db-utils";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;
    let client;
    if (
      !email || !email.includes("@") ||
      !name || !name.trim() === "" ||
      !message || !message.trim() === ""
    ) {
      res.status(422).json({ message: "Validation error!!" });
      return;
    }
    const newMessage = { email, message, name };
    try {
      client = await connectDatabse();
    } catch (error) {
      res.status(500).json({ message: "DB connection failed!!" });
    }
    try {
      await insertDocument(client, "messages", newMessage);
      client.close();
      res.status(201).json({
        message: "Successfully stored new message!!",
        data: newMessage
      });
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Storing message failed!!" });
    }
  }
}
