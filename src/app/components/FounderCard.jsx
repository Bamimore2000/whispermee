"use client";
import { founders } from "../../utils/founder-info";
import { useState } from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import Message from "../components/Message";
import { GoArrowUpRight } from "react-icons/go";
const FounderCard = ({ image, name, socials }) => {
  console.log(socials);
  const [open, setOpen] = useState(false);
  return (
    <>
      <article className="mb-6">
        <div className="image relative cursor-pointer h-[200px] w-[200px]">
          <Image layout="fill" src={image} />
        </div>
        <h3 className="name text-lg">{name}</h3>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="button block border border-black px-2"
        >
          <span className="underline">Connect</span>
        </button>
      </article>
      <Message open={open} setOpen={setOpen} height="55vh">
        <div className="w-[90%] mx-auto mt-12 md:pb-4 ">
          <div className="wrapper ">
            <h1 className="text-2xl">Connect</h1>
            {socials.map((social, index) => {
              const { name, icon, link } = social;
              return (
                <article
                  key={index}
                  className="flex items-center gap-6 mt-8 text-xl"
                >
                  <span className="social-icon">{icon}</span>
                  <Link
                    onClick={() => {
                      setOpen(false);
                    }}
                    target="_blank"
                    className="underline"
                    href={link}
                  >
                    Via {name}{" "}
                  </Link>
                  <span className="icon">
                    <GoArrowUpRight />
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </Message>
    </>
  );
};
export default FounderCard;
