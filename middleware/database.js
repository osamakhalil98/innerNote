import mongoose from "mongoose";

export default async function dbConnect() {
  const connection = {};
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  if (connection.isConnected) return;
  const db = await mongoose.connect(
    "mongodb+srv://theosadxen:nahar2011@cluster0.a5rdm.mongodb.net/notesdb?retryWrites=true&w=majority",
    options
  );

  connection.isConnected = db.connections[0].readyState;
}
