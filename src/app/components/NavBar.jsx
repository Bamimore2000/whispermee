"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { links } from "../../utils/links";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
const NavBar = () => {
  const { data: session } = useSession();

  const pathname = usePathname();

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
    marginTop: open ? "0px" : "9px",
  };

  const transformBarsReverse = {
    transform: open ? "rotate(-45deg)" : "none",
    marginTop: open ? "-9px" : "9px",
  };
  return (
    <>
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
              clipPath: "circle(0 at 100% 0)",
            }}
            animate={{
              width: "100vw",
              height: "100vh",
              borderRadius: 0,
              top: 0,
              right: 0,
              opacity: 1,
              clipPath: "circle(150% at 100% 0)",
            }}
            exit={{
              width: "0vw",
              height: "0vh",
              borderRadius: "100%",
              opacity: 0,
              clipPath: "circle(0 at 100% 0)",
            }}
            transition={{
              duration: 0.5,
            }}
            className=" z-10 absolute bg-white"
          >
            <div className="wrapper w-[90%] mx-auto mt-5 md:hidden">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl">Hi {session?.user?.name}</h1>
                  <p className="text-xl">{session.user.email}</p>
                </div>

                <div
                  onClick={() => setOpen((prev) => !prev)}
                  className="hamburger block z-20 md:hidden cursor-pointer"
                >
                  <div style={{ ...barStyle, ...transformBars }}></div>
                  <div style={{ ...barStyle, ...transformBarsReverse }}></div>
                </div>
              </div>

              <div className="links flex flex-col gap-3 mt-10">
                {links.map((links, index) => {
                  const { name, link } = links;
                  return (
                    <Link
                      key={index}
                      onClick={() => setOpen(false)}
                      className="block text-lg"
                      href={link}
                    >
                      {name}
                    </Link>
                  );
                })}

                {/* <Link className="block text-lg" href="#">
                  Messages
                </Link>
                <Link className="block text-lg" href="#">
                  Analytics
                </Link>
                <Link className="block text-lg" href="#">
                  Settings
                </Link> */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="w-full fixed top-0 shadow-md z-8 bg-white h-[60px] md:h-[121px] md:bg-[#CBDDFD] mx-auto">
        {/* navbar for mobile */}
        <div className="flex items-center w-[90%] mx-auto justify-between md:hidden mt-5">
          <h1 className="text-[20px]">WhisperMe</h1>
          <div
            onClick={() => setOpen((prev) => !prev)}
            className="hamburger block z-20 md:hidden cursor-pointer"
          >
            <div style={{ ...barStyle, ...transformBars }}></div>
            <div style={{ ...barStyle, ...transformBarsReverse }}></div>
          </div>
        </div>
        <div className="pc-header min-h-20 w-[90%] mx-auto hidden md:block pt-4">
          <h1 className="mb-4 header-title text-2xl">WhisperMe</h1>
          <div className="map">
            <div className="items flex gap-3">
            {links.map((links, index) => {
              const { name, link } = links;
              const isHome = pathname === link;
              return (
                <Link
                  key={index}
                  style={{ borderBottom: isHome ? "2px black solid" : "" }}
                  className="p-4"
                  href={link}
                >
                  <span
                    style={{ backgroundColor: isHome ? "white" : "" }}
                    className="p-2"
                  >
                    {name}
                  </span>
                </Link>
              );
            })}
            
          </div>
          <button className="p-6 bg-black text-white"  type="button" onClick={()=>{
            signOut()
          }}>Sign out</button>

          </div>
          
        </div>
      </nav>
    </>
  );
};
export default NavBar;
