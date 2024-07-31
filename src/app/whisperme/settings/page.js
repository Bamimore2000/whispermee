"use client";
import { useState } from "react";
import { PiGreaterThanLight } from "react-icons/pi";
import { FaToggleOn } from "react-icons/fa";

const Settings = () => {
  const [openAccordion, setOpenAccordion] = useState("");
  return (
    <main>
      <div className="home-wrapper w-[90%] md:max-w-[640px] mx-auto mt-10">
        <h1 className="text-3xl tracking-wide"> Settings</h1>
        <p className="text-base w-2/3">Want to change something? No problem</p>
        <div className="mt-12">
          <section className="">
            <div
              onClick={() => {
                setOpenAccordion((prev) => {
                  prev === "profile"
                    ? setOpenAccordion("")
                    : setOpenAccordion("profile");
                });
              }}
              className="flex gap-4 items-center border-b border-black py-3 cursor-pointer"
            >
              <PiGreaterThanLight
                style={{
                  rotate: openAccordion === "profile" ? "90deg" : "none",
                  transition: "0.4s",
                }}
              />
              <p>Profile information</p>
            </div>
            <div
              style={{
                display: openAccordion === "profile" ? "block" : "none",
              }}
              className=""
            >
              <div className="mt-3">
                <p className="underline cursor-pointer my-2">Edit profile</p>
                <p className="underline cursor-pointer my-2">Change email</p>
              </div>
            </div>
          </section>
          <section className="">
            <div
              onClick={() => {
                setOpenAccordion((prev) => {
                  prev === "notifications"
                    ? setOpenAccordion("")
                    : setOpenAccordion("notifications");
                });
              }}
              className="flex gap-4 items-center border-b border-black py-3 cursor-pointer"
            >
              <PiGreaterThanLight
                style={{
                  rotate: openAccordion === "notifications" ? "90deg" : "none",
                  transition: "0.4s",
                }}
              />
              <p>Notifications</p>
            </div>
            <div
              style={{
                display: openAccordion === "notifications" ? "block" : "none",
              }}
              className=""
            >
              <div className="flex justify-between items-center mt-3">
                <p>Cancel all notifications from beeping me</p>
                <FaToggleOn className="cursor-pointerg" size={30} />
              </div>
            </div>
          </section>
          <section className="">
            <div
              onClick={() => {
                setOpenAccordion((prev) => {
                  prev === "delete"
                    ? setOpenAccordion("")
                    : setOpenAccordion("delete");
                });
              }}
              className="flex gap-4 items-center border-b border-black py-3 cursor-pointer"
            >
              <PiGreaterThanLight
                style={{
                  rotate: openAccordion === "delete" ? "90deg" : "none",
                  transition: "0.4s",
                }}
              />
              <p>Delete Accout</p>
            </div>
            <div
              style={{
                display: openAccordion === "delete" ? "block" : "none",
              }}
              className=""
            >
              <div className="delete-account text-red-400 cursor-pointer mt-2">
                Delete account
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
export default Settings;
