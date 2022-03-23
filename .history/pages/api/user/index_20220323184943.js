import dbConnect from "../../../middleware/database";

export default async function userHandler(req, res) {
  dbConnect();
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        res
          .status(404)
          .json({ success: false, message: "This User Doesn't exist" });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: "something went wrong",
          error: error,
        });
      }

    default:
      return;
  }
}
