"use client";

import { useState } from "react";
import { PiGreaterThanLight } from "react-icons/pi";
import LittleNotification from "../components/LittleNotfication";
import MessageSheet from "./Message";

const DashboardComponent = ({ name, username }) => {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const url = "whispermee.app/anonymous";
  const copyText = async (username) => {
    try {
      // Replace with your text to be copied
      await navigator.clipboard.writeText(`${url}/${username}`);
      setCopied(true);
      // Reset copied state after 3 seconds (optional)
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };
  return (
    <main>
      {/* the bar that notifies */}
      {open && (
        <MessageSheet open={open} setOpen={setOpen}>
          <h1>Yes</h1>
        </MessageSheet>
      )}
      <div className="home-wrapper w-[90%] md:max-w-[640px] mx-auto mt-10">
        <h1 className="text-3xl tracking-wide"> Hi {name},</h1>
        <p className="text-base w-2/3">
          Ready to see what your friends have to say? Check your messages
        </p>
        <div className="mt-12">
          <article>Steps</article>
          <div className="w-full h-[350px] bg-[#F5F5F5] mt-4 p-8 relative flex flex-col justify-between">
            <p>whisperme.app/{username}</p>
            <span
              onClick={() => setOpen(true)}
              className="absolute cursor-pointer right-3 top-3 text-center bg-[#E4EFFF] p-2 rounded-2xl w-16"
            >
              Edit
            </span>
            <button
              onClick={() => copyText(username)}
              className="w-[90%] bg-[#262626] mx-auto items-center justify-center gap-2 text-white underline flex p-3"
            >
              Copy Link <PiGreaterThanLight color="white" />
            </button>
          </div>
          {copied && (
            <div className="flex justify-end mt-6">
              <LittleNotification text="copied" />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
export default DashboardComponent;
