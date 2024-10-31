"use client";
import Image from "next/image";
import React, { useRef } from "react";
import QrCreator from "qr-creator";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { basePath } = publicRuntimeConfig;
interface TicketDataProps {
  name: string;
  zone: string;
  collage: string;
  userId: string;
}

export const Ticket: React.FC<Readonly<TicketDataProps>> = ({
  name,
  zone,
  collage,
  userId,
}) => {
  const qrCodeRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (qrCodeRef.current) {
      // Clear previous QR code
      qrCodeRef.current.innerHTML = "";

      // Render new QR code
      QrCreator.render(
        {
          text: userId, // Customize text for QR code
          radius: 0.5, // 0.0 to 0.5
          ecLevel: "H", // L, M, Q, H
          fill: "#FFFFFF", // foreground color
          background: null, // color or null for transparent
          size: 60, // in pixels
        },
        qrCodeRef.current
      );
    }
  }, [userId]); // Dependency array to re-generate QR code if userId changes

  return (
    <div>
      <div className="relative text-white scale-75">
        <div className="absolute bottom-4 left-4 font-semibold">
          <p>
            {name} - {zone} - participant
          </p>
          <p className="text-[12px]">{collage}</p>
        </div>
        <div className="absolute top-4 -right-2 -rotate-90 w-32 text-right">
          <p className="uppercase font-black text-[20px]">{name}</p>
          <p className="font-semibold text-[11px]">{collage}</p>
        </div>
        <div className="absolute bottom-4 right-4">
          <div className="w-14 h-14 rounded-lg" ref={qrCodeRef}></div>
        </div>
        <Image
          src={`${basePath}/images/ticket.png`}
          alt="Ticket Image"
          width={1000}
          height={1000}
          className=" w-full"
        />
      </div>
    </div>
  );
};
