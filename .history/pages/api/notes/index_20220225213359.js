import dbConnect from "../../../middleware/database";
import Note from "../../../models/Note";
import { verify } from "jsonwebtoken";

export default async function handler(req, res) {
  dbConnect();
  const allNotes = await Note.find();
  const notesLength = allNotes.length;

  const { noteType, message, email, name, noteName} =
    req.body;

  const { method } = req;
  const { type } = req.query;
  const { page } = req.query;

  
    verify(req.headers.authorization, process.env.JWT_KEY, function(err, decoded) {
      if(!err && decoded){
  
}
  
  
  try {
  

    switch (method) {
      case "GET":
        if (page) {
          try {
            const notes = await Note.find({})
              .skip((page - 1) * 9)
              .limit(9)
              .sort({ _id: -1 });

            const totalPages = Math.ceil(notesLength / 9);

            res.status(200).json({
              success: true,
              data: notes,
              totalPages: totalPages,
              currentPage: page,
            });
          } catch (error) {
            res.status(400).json({ error }, "This is the problem");
          }

          break;
        } else if (page && type !== "") {
          try {
            const notes = await Note.find({ noteType: type })
              .skip((page - 1) * 9)
              .limit(9)
              .sort({ _id: -1 });

            const totalPages = Math.ceil(notes.length / 9);

            res.status(200).json({
              success: true,
              data: notes,
              totalPages: totalPages,
              currentPage: page,
            });
          } catch (error) {
            res.status(400).json({ error }, "This is the problem");
          }

          break;
        } else if (type) {
          try {
            const notes = await Note.find({ noteType: type }).sort({ _id: -1 });
            const totalPages = Math.ceil(notes.length / 9);
            res.status(200).json({
              success: true,
              data: notes,
              totalPages: totalPages,
              currentPage: 1,
            });
          } catch (error) {
            res.status(400).json({ error }, "This is the problem");
          }

          break;
        } else {
          try {
            const notes = await Note.find({})
              .skip(0)
              .limit(9)
              .sort({ _id: -1 });

            const totalPages = Math.ceil(notesLength / 9);

            res.status(200).json({
              success: true,
              data: notes,
              totalPages: totalPages,
              currentPage: 1,
            });
          } catch (error) {
            res.status(400).json({ error }, "This is the problem");
          }

          break;
        }

      case "POST":
        try {
          const note = await Note.create({
            noteType,
            message,
            email,
            name,
            noteName,
          });

          res.status(201).json({ success: true, data: note });
        } catch (error) {
          res.status(400).json({ success: false });
        }

        break;

      default:
        res.status(400).json({ error: error }, "This is the errror lololo");
        break;
    }
  } catch (error) {
    res.status(400).json({
      message: `Something went wrong :/ ${error}`,
    });
  }
}
