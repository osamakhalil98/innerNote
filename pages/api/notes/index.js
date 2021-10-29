import dbConnect from "../../../middleware/database";
import Note from "../../../models/Note";

export default async function handler(req, res) {
  dbConnect();

  const { noteType, message, email, name, noteName } = req.body;
  const { method } = req;
  try {
    // inserting the deconstructed data into our db
    switch (method) {
      case "GET":
        try {
          const notes = await Note.find({});
          res.status(200).json({ success: true, data: notes });
        } catch (error) {
          res.status(400).json({ success: false });
        }

        break;

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
        res.status(400).json({ success: false });
        break;
    }
  } catch (error) {
    res.status(400).json({
      message: `Something went wrong :/ ${error}`,
    });
  }
}
