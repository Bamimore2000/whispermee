"use client";
import { FaTimes } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import { useEffect } from "react";

// import { motion } from "framer-motion";
import {
  easeInOut,
  motion,
  useDragControls,
  useMotionValue,
  useAnimate,
} from "framer-motion";

const MessageSheet = ({ open, setOpen, children, height }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [open]);
  const [scope, animate] = useAnimate();
  const controls = useDragControls();
  const y = useMotionValue(0);

  const handleClose = () => {
    const yStart = typeof y.get() === "number" ? y.get() : 0;
    // grab the current div associated with scope as ref, then animate it with the styles
    animate(scope.current, {
      opacity: [1, 0],
    });
    animate("#drawer", {
      y: [yStart, height || 500],
    });
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div className="fixed top-0 left-0 z-50">
          <motion.div
            ref={scope}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleClose}
            className="parent h-[100vh] relative w-[100vw] bg-slate-400/50 md:grid md:place-items-center"
          >
            <motion.div
              id="drawer"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{
                ease: "easeInOut",
              }}
              onClick={(e) => e.stopPropagation()}
              dragListener={false}
              dragConstraints={{
                top: 0,
                bottom: 0,
              }}
              style={{ y, minHeight: height || "50vh" }}
              dragElastic={{
                top: 0,
                bottom: 0.5,
              }}
              onDragEnd={() => {
                if (y.get() >= 100) {
                  handleClose();
                }
              }}
              drag="y"
              dragControls={controls}
              className="message-wrapper w-[100vw] bg-white absolute left-0 bottom-0 rounded-t-xl md:hidden pb-14"
            >
              <motion.div
                onPointerDown={(e) => {
                  controls.start(e);
                }}
                className="header w-full h-12 cursor-grab absolute top-0 left-0 rounded-t-xl bg-white touch-none active:cursor-grabbing"
              >
                <LiaTimesSolid
                  onClick={() => handleClose()}
                  className="absolute right-3 top-3"
                  size={25}
                />
              </motion.div>
              <div className="overflow-y-scroll h-full">{children}</div>
            </motion.div>
            <div
              onClick={(e) => e.stopPropagation()}
              className="hidden md:block md:w-full md:max-w-[768px] bg-[#F8F8F8] min-h-[50vh]"
            >
              <div className="cancel w-full relative h-[50px] bg-[#F8F8F8] p-4 flex justify-end">
                <LiaTimesSolid
                  onClick={() => handleClose()}
                  className="absolute right-3 top-3 cursor-pointer"
                  size={25}
                />
              </div>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};
export default MessageSheet;
