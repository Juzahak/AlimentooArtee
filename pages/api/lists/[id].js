import dbConnect from "../../../util/mongo";
import List from "../../../models/List";
import axios from 'axios';

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    cookies
  } = req;
  const token = cookies.token

  dbConnect();

  if (method === "GET") {
    try {
      const list = await List.findById(id);
      res.status(200).json(list);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    try {
      const list = await List.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(list);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    
    try {
      await List.findByIdAndDelete(id);
      res.status(200).json("The list has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}