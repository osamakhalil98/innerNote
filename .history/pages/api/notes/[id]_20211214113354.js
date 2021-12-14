import dbConnect from "../../../middleware/database";
import Note from "../../../models/Note";
import mongoose from "mongoose";

dbConnect();
export default async (req, res) => {
  const { method } = req;
  const { noteType, message, email, name, noteName, stats } = req.body;
  const { id } = req.query;

  switch (method) {
    case "GET":
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
  }

  if (method === "PUT") {
    try {
      const note = await Note.findById(id).update({
        noteType,
        message,
        email,
        name,
        noteName,
        stats,
      });
      if (!note) {
        res
          .status(404)
          .json({ success: false, message: "This note doesn't exist" });
      }

      res.status(204).json({ success: true, data: note });
    } catch (err) {
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
