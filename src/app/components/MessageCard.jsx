"use client";
import { PiGreaterThanLight } from "react-icons/pi";
import MessageSheet from "./Message";
import { useState, useEffect } from "react";

// Function to generate a random color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const MessageCard = ({ content, createdAt }) => {
  // Function to calculate time ago
  const calculateTimeAgo = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diff = now.getTime() - created.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      if (days === 1) {
        return "yesterday";
      } else {
        const options = { day: "numeric", month: "short" };
        return created.toLocaleDateString(undefined, options);
      }
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else {
      return `${minutes}m ago`;
    }
  };

  const [open, setOpen] = useState(false);
  const [bgColor, setBgColor] = useState(getRandomColor());

  useEffect(() => {
    // Set a new random background color when the component mounts
    setBgColor(getRandomColor());
  }, []);

  const handleCardClick = () => {
    setOpen(true);
  };

  return (
    <>
      <article
        onClick={handleCardClick}
        className="flex justify-between my-3 items-center cursor-pointer"
      >
        <div className="flex gap-3">
          <div
            className="image h-12 grid place-items-center w-12 md:h-14 md:w-14 rounded-full"
            style={{ backgroundColor: bgColor }}
          >
            <img className="h-1/2 w-1/2" src="/ghost.png" alt="Ghost" />
          </div>
          <div className="excerpt-date">
            <p
              className="excerpt w-[250px] md:400px"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {content}
            </p>
            <span className="date text-slate-500">
              {calculateTimeAgo(createdAt)}
            </span>
          </div>
        </div>

        <span className="forward h-10 w-10 bg-[#F5F5F5] grid place-items-center rounded-full">
          <PiGreaterThanLight fontWeight="extrabold" />
        </span>
      </article>
      <MessageSheet open={open} setOpen={setOpen} height="40vh">
        <div className="message w-[90%] md:w-[100%] mx-auto mt-12 md:mt-0 md:mx-0 overflow-scroll md:overflow-hidden p-4 bg-[#F8F8F8]">
          {content}
        </div>
      </MessageSheet>
    </>
  );
};

export default MessageCard;
