import mongoose, { Schema } from "mongoose";
if (!process.env.MONGODB_URI) {
  throw new Error("Mongodb uri is not set");
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connection is succesfull"))
  .catch((err) => console.log("there is a problem connecting", err));

mongoose.Promise = global.Promise;

const messageSchema = new Schema(
  {
    content: { type: String, required: true },
    // Add other fields as needed
  },
  { timestamps: true }
);

const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;
