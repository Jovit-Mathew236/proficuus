"use client";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
// import { FacebookIcon, YoutubeIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const Footer: React.FC = () => {
  const { theme } = useTheme();
  return (
    <footer className="py-10 dark:bg-gray-800 bg-slate-50/90 bg-opacity-30 backdrop-blur-md dark:text-white  rounded-tr-2xl rounded-tl-2xl">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:items-center gap-4 mb-8">
          <Image
            src="/images/jymestlogo.png"
            alt="KCC Logo"
            width={200}
            height={200}
            className="w-16 h-16 mb-4"
          />
          <p className="max-w-md text-gray-500 dark:text-gray-400 text-sm">
            Jesus Youth Medical Engineering Students Team is a stream team under
            the Kerala campus ministry that addresses medical engineering
            campuses.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 justify-center md:text-left">
          {/* Follow Us Section */}
          <div className="w-fit">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <a
              target="_blank"
              href=" https://www.instagram.com/jymest_official/"
              className="flex items-center gap-2 md:justify-start mb-2"
            >
              <InstagramLogoIcon />
              Instagram
            </a>
            {/* <a
              href="https://youtube.com/@jy_mest"
              className="flex items-center gap-2 md:justify-start mb-2"
            >
              <YoutubeIcon size={15} /> YouTube
            </a>
            <a
              href="https://www.facebook.com/jy_mest?mibextid=ZbWKwL"
              className="flex items-center gap-2 md:justify-start mb-2"
            >
              <FacebookIcon size={15} />
              Facebook
            </a> */}
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="mb-2 font-thin">
              <strong>Steve Paul</strong> Proficuus General Coordinator
            </p>
            <p className="mb-2 font-thin">
              <a
                href="tel:+919400038737"
                className="text-yellow-500 hover:underline"
              >
                9400038737
              </a>
            </p>
            <p className="mb-2 font-thin">
              <strong>Adithyan S</strong> Proficuus Mobilisation Coordinator
            </p>
            <p className="mb-2 font-thin">
              <a
                href="tel:+919188682039"
                className="text-yellow-500 hover:underline"
              >
                9188682039
              </a>
            </p>
            <p className="mb-2 font-thin">
              <strong>Shaijal Devassia</strong> MEST Coordinator
            </p>
            <p className="mb-2 font-thin">
              <a
                href="tel:+919447624608"
                className="text-yellow-500 hover:underline"
              >
                9447624608
              </a>
            </p>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 text-center">
          {theme === "dark" ? (
            <Image
              src="/images/jy-logo-white.png"
              alt="KCC Logo"
              width={100}
              height={100}
              className="m-auto mb-2 w-8 h-auto"
            />
          ) : (
            <Image
              src="/images/jy-logo-black.png"
              alt="KCC Logo"
              width={100}
              height={100}
              className="m-auto mb-2 w-8 h-auto"
            />
          )}
          <p className="mt-4 text-sm font-thin">
            Copyright © Jesus Youth Medical Engineering Students Team - All
            Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
