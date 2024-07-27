"use client";
import Link from "next/link";
import { FaGreaterThan } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Home = () => {
  const [open, setOpen] = useState(false);
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
    <main className="w-[98%] max-w-[1300px] mx-auto h-[100vh]">
      <nav className="hidden md:flex justify-between items-center md:h-[100px]">
        <div className="logo md:flex-1 text-[30px]">WhisperMe</div>
        <div className="about-home hidden md:flex md:flex-1 md:gap-2 text-[20px] items-center ">
          <Link href="/" className="about">
            About
          </Link>
          <div className="dot">
            <BsDot />
          </div>
          <Link href="/" className="home">
            Home
          </Link>
        </div>
      </nav>
      <section className="article main-bg bg-fuchsia-100 rounded-lg">
        <nav className="flex md:hidden justify-between items-center">
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
                className="hamburger-display grid place-items-center gap-0 bg-white md:hidden z-10 absolute"
              >
                <div>
                  <Link href="/" className="about text-2xl">
                    About
                  </Link>
                  <div href="/" className="home text-2xl">
                    Home
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
        <main className="h-full w-full grid place-items-center">
          <article className="md:w-[50%] mx-auto ">
            <h1 className="italic bold text-[40px] md:text-[50px] tracking-wide mb-2">
              WhisperMe
            </h1>
            <p className="secondary text-lg md:text-xl mb-6">
              Ever truly wanted to know what people think about you? WhisperMe
              allows you to share and recieve anonymous messages
            </p>
            <button className="text-white bg-black p-3 mb-2">
              <Link className="flex items-center gap-2" href="/auth/login">
                Recieve anonymous messages
                <FaGreaterThan />
              </Link>
            </button>
          </article>
        </main>
      </section>
    </main>
  );
};
export default Home;
