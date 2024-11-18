"use client";
import React from "react";
import { CollageWiseChart } from "./modules/collage-wise-chart";
import { useParticipants } from "@/lib/context/participantContext";
// import { useSidebar } from "@/components/ui/sidebar";

const ProficuusHome = () => {
  const { participantsData } = useParticipants();
  // const { state } = useSidebar();

  return (
    <div className="w-full h-full pb-4">
      <div className="flex gap-4 w-full items-center py-4">
        {/* <div
          className={`rounded-md h-full overflow-scroll border w-full ${
            state === "expanded"
              ? "lg:max-w-[calc(100vw-19rem)]"
              : "lg:max-w-[100%]"
          } `}
        > */}
        <CollageWiseChart participantsData={participantsData} />
        {/* <CollageWiseChart participantsData={participantsData} /> */}
      </div>
      {/* </div> */}
    </div>
  );
};

export default ProficuusHome;
