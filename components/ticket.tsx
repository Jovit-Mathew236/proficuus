import Image from "next/image";
import React, { useRef, useEffect } from "react";
import QrCreator from "qr-creator";

interface TicketProps {
  name: string;
  zone: string;
  collage: string;
  userId: string;
  isDownloading: boolean;
}

export const Ticket: React.FC<Readonly<TicketProps>> = ({
  name,
  zone,
  collage,
  userId,
  isDownloading,
}) => {
  const qrCodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (qrCodeRef.current) {
      qrCodeRef.current.innerHTML = "";
      QrCreator.render(
        {
          text: userId,
          radius: 0.5,
          ecLevel: "H",
          fill: "#112C70",
          background: null,
          size: 100,
        },
        qrCodeRef.current
      );
    }
  }, [userId]);

  return (
    <div
      className={`relative ${
        isDownloading ? "scale-90" : ""
      } w-full max-w-[800px] mx-auto sm:p-4`}
    >
      {/* Background Element */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-blue-900 blur-xl opacity-20 rounded-3xl" />

      {/* Main Ticket Container */}
      <div
        className={`relative bg-transparent ${
          isDownloading ? "min-w-[800px] md:min-w-full" : ""
        }`}
      >
        {/* Ticket Content */}
        <div
          className={`flex md:flex-row rounded-2xl overflow-hidden ${
            isDownloading ? "flex-row" : "flex-col"
          }`}
        >
          {/* Left/Top Section */}
          <div
            className={`relative ${
              isDownloading ? "w-[65%]" : "w-full"
            } md:w-[65%] bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 p-6 md:p-6`}
          >
            {/* Decorative Circle */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full -translate-y-32 translate-x-32" />

            <div className="relative">
              <div className="text-white/80 text-sm mb-3">
                An awakening call for budding professionals
              </div>

              <div className="text-4xl md:text-5xl mb-3 font-bold text-white">
                Proficuus&apos;24 &gt;&gt;&gt;
              </div>

              <p className="text-white/80 text-sm mb-3">
                Sahrdaya College of Engineering and Technology (Autonomous){" "}
              </p>
              <div className="flex items-center mb-4 text-base md:text-lg text-white/90">
                <span>IRINJALAKKUDA</span>
                <div className="w-1.5 h-1.5 mx-3 rounded-full bg-purple-400" />
                <span>DEC 20 - 23, 2024</span>
              </div>

              <div className="bg-purple-500 rounded-xl p-3 shadow-lg max-w-[400px]">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-1 rounded-full shadow-inner w-fit max-w-10">
                    <Image
                      className="object-contain rounded-full"
                      src="/images/logo.png"
                      alt={collage}
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="text-sm text-white leading-snug">
                    &quot;Be dressed ready for service and keep your lamps
                    burning&quot;
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-4 items-center">
                <Image
                  src="/images/jy-logo-white.png"
                  alt="logo"
                  width={100}
                  height={100}
                  className="w-7 h-7"
                />
                <p className="text-white text-sm">
                  Jesus Youth Medical Engineering Students Team
                </p>
              </div>
            </div>
          </div>

          {/* Right/Bottom Section with Subtract Effect */}
          <div
            className={`relative ${
              isDownloading ? "w-[35%]" : "w-full"
            } md:w-[35%] bg-white`}
          >
            {/* Mobile Top Subtract */}
            <div className={`${isDownloading ? "hidden" : "block"} md:hidden`}>
              <div className="absolute z-20 -top-4 left-0 -translate-x-1/2">
                <div className="w-8 h-8 bg-[#e3e6eb] dark:bg-primary-foreground rounded-full" />
              </div>
              <div className="absolute z-20 -top-4 right-0 translate-x-1/2">
                <div className="w-8 h-8 bg-[#e3e6eb] dark:bg-primary-foreground rounded-full" />
              </div>
              <div className="absolute -top-[2px] left-0 right-0 border-t-8 border-dashed border-blue-900/30" />
            </div>

            {/* Desktop Left Subtract */}
            <div className={`${isDownloading ? "block" : "hidden"} md:block`}>
              <div className="absolute left-0 top-0 w-8 h-full">
                <div className="absolute z-20 -left-4 -top-4">
                  <div className="w-8 h-8 bg-foreground dark:bg-primary-foreground rounded-full" />
                </div>
                <div className="absolute z-20 -left-4 -bottom-4">
                  <div className="w-8 h-8 bg-foreground dark:bg-primary-foreground rounded-full" />
                </div>
                <div className="absolute left-0 top-0 w-full h-full border-l-8 border-dashed border-blue-900/30" />
              </div>
            </div>

            {/* Content */}
            <div
              className={`p-6 md:p-6 flex flex-col ${
                isDownloading ? "items-start" : "items-center"
              } md:items-start gap-6`}
            >
              <div
                className={`ml-0 md:ml-8  ${
                  isDownloading ? "text-left" : "text-center"
                } md:text-left`}
              >
                <div className="text-xl font-bold text-blue-900">{name}</div>
                <div className="text-sm text-gray-600">{collage}</div>
                <div className="text-sm text-purple-600">{zone}</div>
              </div>

              <div className="ml-0 md:ml-8">
                <div className="bg-gray-50 p-2 rounded-lg shadow-inner">
                  <div ref={qrCodeRef} />
                </div>
                <div className="text-xs text-gray-500 mt-2 text-center">
                  Scan to verify
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
