import mongoose from "mongoose";

export default async function dbConnect() {
  const MONGODB_URI = process.env.MONGODB_URI;
  const connection = {};
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  if (connection.isConnected) return;
  const db = await mongoose.connect(MONGODB_URI, options);

  connection.isConnected = db.connections[0].readyState;
  console.log(connection.isConnected)
  
}
