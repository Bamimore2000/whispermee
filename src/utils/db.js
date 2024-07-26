// get user from the db
import User from "../(models)/UserModel";

export const getUserFromDb = async (email) => {
  const user = await User.findOne({ email });
  console.log("user from server:", user);
  return user;
};

export const getUserFromDbByUsername = async (username) => {
  const user = await User.findOne({ username });
  console.log("user from server:", user);
  return user;
};
