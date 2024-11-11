import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { FacebookIcon, YoutubeIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-10 dark:bg-gray-800 bg-slate-50/90 bg-opacity-30 backdrop-blur-md dark:text-white  rounded-tr-2xl rounded-tl-2xl">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/images/logo.png"
            alt="KCC Logo"
            width={200}
            height={200}
            className="w-44 mb-4"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-8 justify-center md:text-left">
          {/* Follow Us Section */}
          <div className="w-fit">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <a
              href="https://www.instagram.com/jy_mest"
              className="flex items-center gap-2 md:justify-start mb-2"
            >
              <InstagramLogoIcon />
              Instagram
            </a>
            <a
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
            </a>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="mb-2 font-thin">
              <strong>Steve Paul</strong> - Proficuus&apos;24 Coordinator
            </p>
            <p className="mb-2 font-thin">
              <a
                href="tel:++919400038737"
                className="text-yellow-500 hover:underline"
              >
                9400038737
              </a>
            </p>
            {/* <p className="mb-2 font-thin">
              <strong>Don Benny</strong> - KCC General Coordinator
            </p>
            <p className="mb-2 font-thin">
              <a
                href="tel:+918848762429"
                className="text-yellow-500 hover:underline"
              >
                8848762429
              </a>
            </p>
            <p className="mb-2 font-thin">
              <strong>Alwin Thomas</strong> - KCC Mobilization Coordinator
            </p>
            <p className="mb-2 font-thin">
              <a
                href="tel:+918606721186"
                className="text-yellow-500 hover:underline"
              >
                8606721186
              </a>
            </p> */}
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 text-center">
          <Image
            src="/images/logo.png"
            alt="KCC Logo"
            width={100}
            height={100}
            className="m-auto mb-2 w-8 h-auto"
          />
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
