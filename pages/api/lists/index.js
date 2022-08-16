import dbConnect from "../../../util/mongo";
import List from "../../../models/List";

export default async function handler(req, res) {
  const { method, cookies } = req;

  const token = cookies.token

  await dbConnect();

  if (method === "GET") {
    try {
      const list = await List.find();
      
      res.status(200).json(list);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    try {
      const list = await List.create(req.body);
      res.status(201).json(list);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}