import React, { useState } from "react";
import { Colors, Liquid } from "@/components/framer/liquid-gradient";

const COLORS: Colors = {
  color1: "#FFFFFF",
  color2: "#1E10C5",
  color3: "#9089E2",
  color4: "#FCFCFE",
  color5: "#F9F9FD",
  color6: "#B2B8E7",
  color7: "#0E2DCB",
  color8: "#0017E9",
  color9: "#4743EF",
  color10: "#7D7BF4",
  color11: "#0B06FC",
  color12: "#C5C1EA",
  color13: "#1403DE",
  color14: "#B6BAF6",
  color15: "#C1BEEB",
  color16: "#290ECB",
  color17: "#3F4CC0",
};

type Props = {
  title: string;
  onClick: () => void; // Define the onClick prop type
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Allow passing an SVG icon component
};

const GitHubButton: React.FC<Props> = ({ title, onClick, Icon }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex justify-center">
      <button
        onClick={onClick} // Attach onClick here
        className="relative  min-w-60 w-max h-[2.7em] mx-auto group dark:bg-black bg-white dark:border-white border-black border-2 rounded-lg"
        type="button"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute w-[112.81%] h-[128.57%] top-[8.57%] left-1/2 -translate-x-1/2 filter blur-[19px] opacity-70">
          <span className="absolute inset-0 rounded-lg bg-[#d9d9d9] filter blur-[6.5px]"></span>
          <div className="relative w-full h-full overflow-hidden rounded-lg">
            <Liquid isHovered={isHovered} colors={COLORS} />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[92.23%] h-[112.85%] rounded-lg bg-[#010128] filter blur-[7.3px]"></div>
        <div className="relative w-full h-full overflow-hidden rounded-lg">
          <span className="absolute inset-0 rounded-lg bg-[#d9d9d9]"></span>
          <span className="absolute inset-0 rounded-lg bg-black"></span>
          <Liquid isHovered={isHovered} colors={COLORS} />
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className={`absolute inset-0 rounded-lg border-solid border-[3px] border-gradient-to-b from-transparent to-white mix-blend-overlay filter ${
                i <= 2 ? "blur-[3px]" : i === 3 ? "blur-[5px]" : "blur-[4px]"
              }`}
            ></span>
          ))}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[70.8%] h-[42.85%] rounded-lg filter blur-[15px] bg-[#006]"></span>
          <span className="absolute flex items-center justify-between px-4 gap-2 top-[7%] left-[5%] w-[90%] h-[85%] rounded-lg  text-white  font-semibold tracking-wide whitespace-nowrap">
            <Icon className=" fill-white w-6 h-6 flex-shrink-0" />{" "}
            {/* Render dynamic icon */}
            {title} {/* Display dynamic title */}
          </span>
        </div>
      </button>
    </div>
  );
};

export default GitHubButton;