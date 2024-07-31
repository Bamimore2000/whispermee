"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaGreaterThan } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import { PiGreaterThanLight } from "react-icons/pi";
import { AnimatePresence, motion } from "framer-motion";
import { LiaTimesSolid } from "react-icons/lia";

const NavBarPublic = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [open]);
  const barStyle = {
    width: "25px",
    height: "2px",
    backgroundColor: "#333",
    margin: "9px 0",
    transition: "0.4s",
    transformOrigin: "center",
  };

  const transformBars = {
    transform: open ? "rotate(45deg)" : "none",
    marginTop: open ? "0" : "9px",
  };

  const transformBarsReverse = {
    transform: open ? "rotate(-45deg)" : "none",
    marginTop: open ? "-9px" : "9px",
  };
  const initialStyle = {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "blue",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    transition: "width 0.5s ease, height 0.5s ease, border-radius 0.5s ease",
    zIndex: "999",
    cursor: "pointer",
  };

  const expandedStyle = {
    width: "100vw",
    height: "100vh",
    borderRadius: "0%",
    top: "0",
    left: "0",
    transform: "none",
  };
  return (
    <div>
      <nav className="hidden w-[85%] max-w-[1300px] mx-auto py-8 md:flex md:justify-between items-center md:h-[100px]">
        <div className="logo md:flex-1 text-[30px]">WhisperMe</div>
        <div className="about-home hidden md:flex md:flex-1 md:gap-2 text-[20px] items-center ">
          <Link href="/" className="home">
            Home
          </Link>
          <div className="dot">
            <BsDot />
          </div>
          <Link href="/about" className="about">
            About
          </Link>
        </div>
      </nav>
      <nav className="flex w-[85%] max-w-[1300px] mx-auto py-4 md:hidden justify-between items-center">
        <div className="logo text-[25px]">WhisperMe</div>
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="hamburger block z-20 md:hidden "
        >
          <div style={{ ...barStyle, ...transformBars }}></div>
          <div style={{ ...barStyle, ...transformBarsReverse }}></div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              key="about"
              initial={{
                width: "0vw",
                height: "0vh",
                borderRadius: "1000%",
                opacity: 0,
                right: "-100vw",
                top: "-100vh",
              }}
              animate={{
                width: "100vw",
                height: "100vh",
                borderRadius: 0,
                top: 0,
                right: 0,
                opacity: 1,
              }}
              exit={{
                width: "0vw",
                height: "0vh",
                borderRadius: "100%",
                opacity: 0,
              }}
              className="hamburger-display grid place-items-center gap-0 bg-white md:hidden z-10 fixed"
            >
              <div>
                <Link
                  onClick={() => {
                    setOpen(false);
                  }}
                  href="/"
                  className="home block text-2xl"
                >
                  Home
                </Link>
                <Link
                  onClick={() => {
                    setOpen(false);
                  }}
                  href="/about"
                  className="about block text-2xl"
                >
                  About
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};
export default NavBarPublic;
