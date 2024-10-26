"use client";
import Image from "next/image";
import React, { useRef } from "react";
import QrCreator from "qr-creator";

interface EmailTemplateProps {
  name: string;
  zone: string;
  collage: string;
  userId: string;
}

export const EmailTemplateParticipant: React.FC<
  Readonly<EmailTemplateProps>
> = ({ name, zone, collage, userId }) => {
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
          size: 75, // in pixels
        },
        qrCodeRef.current
      );
    }
  }, [userId]); // Dependency array to re-generate QR code if userId changes

  return (
    <div>
      <h6>
        Welcome, {name}! Your registration as a Proficuus&apos;24 is successful!
      </h6>

      <div className="relative mt-48 rotate-90 text-white">
        <div className="absolute bottom-4 left-4 font-semibold">
          <p>
            {name} - {zone} - participant
          </p>
          <p>{collage}</p>
        </div>
        <div className="absolute top-14 -right-4 -rotate-90 w-40 text-right">
          <p className="uppercase font-black">{name}</p>
          <p className="font-semibold">{collage}</p>
        </div>
        <div className="absolute bottom-4 right-4">
          <div className="w-20 h-20 rounded-lg" ref={qrCodeRef}></div>
        </div>
        <Image
          src="/images/ticket.png"
          alt="Ticket Image"
          width={300}
          height={300}
          className="mb-44 w-full"
        />
      </div>
    </div>
  );
};
