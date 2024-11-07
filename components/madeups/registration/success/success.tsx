"use client";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import Image from "next/image";
import React, { useEffect } from "react";
// import getConfig from "next/config";

// const { publicRuntimeConfig } = getConfig();
// const { basePath } = publicRuntimeConfig;

const Success = () => {
  useEffect(() => {
    const duration = 10 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white">
      <div className="z-10 text-center m-5 p-5 bg-white bg-opacity-20 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-2">🎉 Congratulations!</h1>
        <p className="text-lg mb-4">
          You&apos;re all set. We’ve sent a message to your email.
        </p>
        <Button
          onClick={() => {
            // OPEN gmail
            window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
          }}
          className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition"
        >
          Go check your email
        </Button>
      </div>
      <Image
        src="/images/bgwelcome.png"
        // src={`${basePath}/images/bgwelcome.png`}
        alt="success background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 opacity-30"
      />
    </div>
  );
};

export default Success;
