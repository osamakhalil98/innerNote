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
  } else {
    res.status(400).json({ success: false });
  }
};
