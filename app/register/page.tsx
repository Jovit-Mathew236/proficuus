// import { EmailTemplateParticipant } from "@/components/email-template-participant";
// import { EmailTemplate } from "@/components/email-template";
import { Participant } from "@/components/madeups/registration/participent";
import React from "react";

const page = () => {
  return (
    <>
      <Participant />
      {/* 
      <EmailTemplateParticipant
        name={"name"}
        zone={"zone"}
        collage={"collage"}
        userId={"userId"}
      /> */}
      {/* <EmailTemplate firstName="name" /> */}
    </>
  );
};

export default page;
