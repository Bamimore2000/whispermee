"use server";
import { signIn, signOut } from "../../auth";
import { getUserFromDb } from "../../utils/db";
import { getUserFromDbByUsername } from "../../utils/db";
import User from "../../(models)/UserModel";
import Messages from "../../(models)/Messages";

export const socialSignIn = async (formData) => {
  const action = formData.get("action");
  await signIn(action, {
    redirectTo: "/auth/username",
  });
};

// signout
export const socialSignOut = async ()=>{
  await signOut()
}

// gets the user from the database
export const getUser = async (username) => {
  const response = await getUserFromDb(username);
  const parsedResponse = JSON.parse(JSON.stringify(response));
  return parsedResponse;
};

// gets the user from the database by username
export const getUserbyUsername = async (email) => {
  const response = await getUserFromDbByUsername(email);
  const parsedResponse = JSON.parse(JSON.stringify(response));
  return parsedResponse;
};

// checks if a username is available or not
export const checkUserNameAvailability = async (name) => {
  const response = await User.findOne({ username: name });
  if (response) {
    return { error: "username already exists" };
  }
  if (!response) {
    return { success: `${name} is available` };
  }
};

// submit a message
export const submitMessage = async (message, username) => {
  // return { success: "message received" };
  const postMessage = await Messages.create({
    content: message,
  });
  const id = postMessage._id;

  const response = await User.findOneAndUpdate(
    { username: username },
    { $push: { messages: id } }
  );
  if (response) {
    return { success: "message succesfully sent" };
  }

  // get the message
  // send the message to the particular username
  // what returns is grabbed and the id is grabbed
  // the grabbed id is then passed into the user messages
};

// submit a username
export const submitUsername = async (name, email) => {
  const normalizedName = name.toLowerCase();
  const response = await User.findOneAndUpdate(
    { email: email },
    { username: normalizedName }
  );
  if (response) {
    return { success: "Username added succesfully" };
  } else {
    return { error: "there was a little problem" };
  }
};

// get messages
export const getAllMessages = async (email) => {
  // Fetch user with populated messages and sort messages by createdAt in descending order
  const response = await User.findOne({ email }).populate({
    path: "messages",
    options: { sort: { createdAt: -1 } }, // Sort messages by createdAt in descending order
  });

  const parsedResponse = JSON.parse(JSON.stringify(response));
  return parsedResponse;
};

// check if username exists
// if username exists, say it is not availabe
// if username exists, then they are allowed to register
