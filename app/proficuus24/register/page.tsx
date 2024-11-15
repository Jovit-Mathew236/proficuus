// import { EmailTemplateParticipant } from "@/components/email-template-participant";
// import { EmailTemplate } from "@/components/email-template";
import { Participant } from "@/components/madeups/registration/participent";
import Head from "next/head";
import React from "react";

const page = () => {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org",
              "@type": "Event",
              name: "Proficuus'24 Registration",
              startDate: "2024-12-20",
              endDate: "2024-12-23",
              location: {
                "@type": "Place",
                name: "JYMEST",
                address: "Location Address",
              },
              url: "https://jymest.com/proficuus24/register",
              description: "Register for the Proficuus'24 event at JYMEST.",
              image: "https://jymest.com/images/proficuus.png",
              organizer: {
                "@type": "Organization",
                name: "JYMEST",
              },
            }),
          }}
        />
      </Head>
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
