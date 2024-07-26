import mongoose, { Schema } from "mongoose";
if (!process.env.MONGODB_URI) {
  throw new Error("Mongodb uri is not set");
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connection is succesfull"))
  .catch((err) => console.log("there is a problem connecting", err));

mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    full_name: { type: String, required: false },
    email: { type: String, required: true },
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    notifications: { type: Boolean, default: false },
    link: { type: String, default: "" },
    username: { type: String, default: "" },
    password: { type: String, default: "" },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
