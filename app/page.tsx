"use client";

import { ImagesSlider } from "@/components/landing/ImageSlider";
import { motion } from "framer-motion";
import Link from "next/link";

const imagesArray = [
  "images/image1.jpg",
  "images/image5.jpg",
  "images/image4.jpg",
  "images/image3.jpg",
  "images/image2.jpg",
];

const HomePage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <ImagesSlider images={imagesArray}>
        <motion.div
          initial={{
            opacity: 0,
            y: -80,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="z-50 flex flex-col justify-center items-center"
        >
          <motion.p className="font-semibold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
            Discover Hidden Gems Of Cities
            <br /> with OpenCity AI <br />{" "}
            <p className="text-sm md:text-xl font-semibold mt-3">powered by OpenAI</p>
          </motion.p>
          <Link
            href="/chat"
            className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 active:scale-95 hover:bg-emerald-300/15 transition-all duration-200 text-white mx-auto text-center rounded-full relative mt-2"
          >
            <span>Get started →</span>
            <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
          </Link>
        </motion.div>
      </ImagesSlider>
    </div>
  );
};

export default HomePage;
