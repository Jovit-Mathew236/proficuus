import Image from "next/image";
import React from "react";

const Success = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center ">
      <div className="z-10">
        <h1 className="text-3xl font-black">HEY You are all set</h1>
        <p>We sended a message to your email</p>
      </div>
      <Image
        src="/images/bgwelcome.png"
        alt="success"
        width={2000}
        height={2000}
        className="absolute w-screen h-screen object-cover z-0"
      />
    </div>
  );
};

export default Success;
