import dbConnect from "../../../middleware/database";
import Note from "../../../models/Note";
import mongoose from "mongoose";

dbConnect();
export default async (req, res) => {
  const { method } = req;
  const { id } = req.query;

  if (method === "GET") {
    try {
      const note = await Note.findById(id);
      /*await Note.findById("61b7b8a18fa711da3d515c3b").update(
        { sad: 0 },
        { sad: 1 }
      );*/
      if (!note) {
        res
          .status(404)
          .json({ success: false, message: "This note doesn't exist" });
      }
      res.status(200).json({ success: true, data: note });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "something went wrong",
        error: error,
      });
    }
  }

  if (method === "PUT") {
    console.log(req.body);
  } else {
    res.status(400).json({ success: false });
  }
};
