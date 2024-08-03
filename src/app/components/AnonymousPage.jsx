"use client";
import { useState } from "react";
import { submitMessage } from "../actions";
import MessageSheet from "./Message";
import { Hearts } from "react-loader-spinner";
import Link from "next/link";
import NavBarPublic from "./NavBarPublic";

const AnonymousPage = ({ user }) => {
  const { username } = user;
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const message = text;
    console.log(message);
    try {
      const response = await submitMessage(message, username);
      if (response.success) {
        setText("");
        setDisabled(true);
        setOpen(true);
      } else {
        setError(true);
      }
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText("");
    setDisabled(true);
  };

  return (
    <>
      <MessageSheet height="65vh" open={open} setOpen={setOpen}>
        <div className="p-4 w-full mt-[50px]">
          {!error ? (
            <div>
              <div className="hearts w-full grid place-items-center">
                <Hearts />
              </div>

              <h1 className="text-xl md:text-2xl text-center">
                Your anonymous message has been successfully sent. 🎉 The
                recipient will never know it’s from you!
              </h1>
              <button
                onClick={() => {
                  setDisabled(true);
                  setOpen(false);
                }}
                className="w-full bg-white text-black mt-3 p-3 border border-black cursor-pointer"
              >
                Send another anonymous message
              </button>
              <Link
                href="/auth/login"
                className="w-full mt-3 block text-center bg-black text-white p-3 border border-black cursor-pointer"
              >
                Receive anonymous messages
              </Link>
            </div>
          ) : (
            <div>
              Sorry, we cannot send your message to {username} at the moment
            </div>
          )}
        </div>
      </MessageSheet>
      <main className="sign-in min-h-[100vh]">
        {/* <NavBarPublic/> */}
        <div className="main-wrapper mt-[15px] md:mt-0 flex flex-col md:p-5 md:w-[98%] md:flex-row items-center gap-6 h-full">
          <section className="first basis-2/6 md:basis-2/5 h-[100%] w-full flex items-end">
            <div className="image-container h-full w-full"></div>
          </section>
          <section className="second basis-4/6 md:basis-3/5 m-[10px] p-5 w-full">
            <div className="main-wrapper">
              <h1 className="mb-3">
                Send a message to{" "}
                <span className="text-[#3300ff]"> @{username}</span>
              </h1>
              <form onSubmit={handleSubmit}>
                <textarea
                  className="bg-[#ECECEC] text-black w-full border-none outline-none p-4 resize-none"
                  placeholder="Type in your anonymous message"
                  onChange={(e) => {
                    setText(e.target.value);
                    setDisabled(e.target.value.length < 1);
                  }}
                  value={text}
                  name="message"
                  id="message-textarea"
                  cols="20"
                  rows="10"
                />
                <button
                  type="button"
                  onClick={handleClear}
                  className="w-full mt-3 mb-4 p-3 border border-black"
                >
                  Clear
                </button>
                <button
                  disabled={disabled}
                  style={{
                    cursor: disabled ? "not-allowed" : "pointer",
                    opacity: disabled ? "0.5" : "1",
                  }}
                  className="bg-black p-3 w-full block text-white"
                  type="submit"
                >
                  {loading ? "Sending..." : "Send message"}
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default AnonymousPage;
