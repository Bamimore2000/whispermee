"use client";
import { useEffect, useState } from "react";

import { LuMessageSquare } from "react-icons/lu";
import { Comment } from "react-loader-spinner";

import { useSession } from "next-auth/react";
import { getAllMessages } from "../../actions";
import MessageCard from "../../components/MessageCard";

const Messages = () => {
  const getMessages = async () => {};
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState([]);
  const [oldMessages, setOldMessages] = useState([]);
  const [renderMessages, setRenderMessages] = useState([]);
  const [render, setRender] = useState("new");
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const { email } = session?.user;
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [sliced, setSliced] = useState(false);
  const [sheetContent, setSheetContent] = useState("");

  // getAllMessages(session.user.email).then((res) => console.log(res));
  useEffect(() => {
    const getMessages = async (email) => {
      setLoading(true);
      const response = await getAllMessages(email);
      const messages = response.messages;
      const currentTimestamp = new Date();
      const newThreshold = currentTimestamp - 24 * 60 * 60 * 1000; // 24 hours ago

      const newMsgs = messages.filter(
        (msg) => new Date(msg.createdAt) >= newThreshold
      );
      const oldMsgs = messages.filter(
        (msg) => new Date(msg.createdAt) < newThreshold
      );

      setMessages(messages); // Set the raw messages first
      setNewMessages(newMsgs);
      setOldMessages(oldMsgs);

      // Directly set renderMessages based on current render state
      // setRenderMessages(render === "new" ? newMsgs : oldMsgs);
      setRenderMessages(() => {
        const rendering = render === "new" ? newMsgs : oldMsgs;

        // Check if there is a limit and rendering length is greater than the limit
        if (limit && rendering.length > limit) {
          // Return a sliced array based on the limit
          setSliced(true);
          return rendering.slice(0, limit);
        } else {
          // Return the whole rendering array
          setSliced(false);
          return rendering;
        }
      });

      setLoading(false);
    };

    if (email) {
      getMessages(email);
    }
  }, [render, email, limit]); // Depend on render and email to trigger the effect

  return (
    <main>
      <div className="home-wrapper w-[90%] pb-3 md:max-w-[640px] mx-auto mt-10">
        <h1 className="text-3xl tracking-wide"> Messages</h1>
        {loading ? (
          <div className="h-full w-full grid place-content-center">
            <Comment backgroundColor="black" />
          </div>
        ) : (
          <div className="mt-12">
            <div className="flex gap-4 ">
              <div
                onClick={() => setRender("new")}
                style={{
                  borderBottom: render === "new" ? "solid black 1px" : "",
                }}
                className="p-2  cursor-pointer"
              >
                {/* <span
                  style={{ display: render === "new" ? "block" : "none" }}
                  className="h-2 w-2 bg-green-500 rounded-full absolute right-0 top-0 "
                ></span> */}
                <p>New</p>
              </div>
              <div
                onClick={() => setRender("old")}
                style={{
                  borderBottom: render === "old" ? "solid black 1px" : "",
                }}
                className="p-2 cursor-pointer"
              >
                {/* <span
                  style={{ display: render === "old" ? "block" : "none" }}
                  className="h-2 w-2 bg-green-500 rounded-full absolute right-0 top-0 "
                ></span> */}
                <p>Old</p>
              </div>
            </div>
            <div className="messages mt-7">
              {renderMessages.length < 1 ? (
                <p>There are no {render} messages</p>
              ) : (
                renderMessages?.map((message, index) => {
                  return (
                    <MessageCard
                      key={message._id}
                      {...message}
                      open={open}
                      setOpen={setOpen}
                    />
                  );
                })
              )}
            </div>
            <div className="button relative">
              {/* {renderMessages.length > 5 && ( */}
              {sliced && (
                <button
                  onClick={() => {
                    setLimit("");
                    setSliced(false);
                  }}
                  className="w-full mt-6 flex items-center gap-3 justify-center p-3 border border-black"
                >
                  <LuMessageSquare /> See all messages
                </button>
              )}
              {!sliced && renderMessages.length > 5 && (
                <button
                  onClick={() => {
                    setLimit(5);
                  }}
                  className="w-full mt-6 flex items-center gap-3 justify-center p-3 border border-black"
                >
                  <LuMessageSquare /> See less messages
                </button>
              )}

              {/* )} */}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
export default Messages;
