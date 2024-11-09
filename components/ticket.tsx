import Image from "next/image";
import React, { useRef, useEffect } from "react";
import QrCreator from "qr-creator";

// Define the props for the Ticket component
interface TicketProps {
  name: string;
  zone: string;
  collage: string;
  userId: string;
}

export const Ticket: React.FC<Readonly<TicketProps>> = ({
  name,
  zone,
  collage,
  userId,
}) => {
  const qrCodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (qrCodeRef.current) {
      // Clear previous QR code
      qrCodeRef.current.innerHTML = "";

      // Render the new QR code with the userId as the content
      QrCreator.render(
        {
          text: userId, // QR code text is the userId
          radius: 0.5, // Adjust the radius of the QR code corners
          ecLevel: "H", // Error correction level
          fill: "#112C70", // QR code color (primary color)
          background: "#ffffff", // background color
          size: 120, // Size of the QR code
        },
        qrCodeRef.current
      );
    }
  }, [userId]);

  return (
    <div className="w-full max-w-[600px] mx-auto border-2 border-gray-300 rounded-lg rounded-b-none md:rounded-l-lg md:rounded-r-none md:border-r-2 bg-transparent">
      <div className="flex flex-col md:flex-row">
        {/* Left Section of the Ticket */}
        <div
          style={{
            backgroundColor: "#112C70", // primary color
            color: "white",
          }}
          className="rounded-lg rounded-b-none md:rounded-l-lg md:rounded-r-none border-0 md:border-r-0 pt-8 pb-4 px-8 md:px-12"
        >
          <div className="text-sm mb-4">
            <strong>An awakening call for budding professionals</strong>
          </div>

          <div className="text-5xl md:text-6xl mb-2">
            Proficuus&apos;24 &gt;&gt;&gt;
          </div>

          <div className="flex items-center mb-4 text-lg">
            <span>TRISSUR</span>
            <span className="mx-3">/</span>
            <span>DEC 20 - 23, 2024</span>
          </div>

          <div
            style={{
              backgroundColor: "#BB63FF", // secondary color
              color: "white",
            }}
            className="w-full flex items-center px-[7px] py-1 rounded-full"
          >
            <div className="bg-white rounded-full border border-gray-400">
              <Image
                className="object-contain rounded-full"
                src="/favicon.ico" // Use the default favicon or another icon if needed
                alt={collage}
                width={50}
                height={50}
              />
            </div>
            <div className="pl-3 text-sm">
              “Be dressed ready for service and keep your lamps burning”
            </div>
          </div>
        </div>

        {/* Right Section of the Ticket (QR Code and User Info) */}
        <div
          // style={{
          //   borderTop: `8px dashed #112C70`, // primary color for border
          // }}
          className="bg-white py-8 px-4 text-black text-center md:text-left border-t-8  md:border-l-8 md:border-t-0 border-dashed border-[#112C70]"
        >
          <div className="text-lg font-semibold">{name}</div>
          <div className="text-sm text-gray-500">{collage}</div>
          <div className="text-sm text-gray-500">{zone}</div>

          {/* QR Code Section */}
          <div className="mt-4">
            <div
              className="w-28 h-28 mx-auto rounded-lg "
              ref={qrCodeRef}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
