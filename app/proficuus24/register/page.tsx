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
                name: "Sahrdaya College of Engineering and Technology",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "PB NO 17, College Rd",
                  addressLocality: "Kodakara",
                  addressRegion: "Kerala",
                  postalCode: "680684",
                  addressCountry: "IN", // Country code for India
                },
              },
              url: "https://jymest.com/proficuus24/register",
              description:
                "Register for the Proficuus'24 event at Sahrdaya College of Engineering and Technology.",
              image: "https://jymest.com/images/proficuus.png",
              organizer: {
                "@type": "Organization",
                name: "JYMEST",
                url: "https://jymest.com",
              },
              offers: {
                "@type": "Offer",
                url: "https://jymest.com/proficuus24/register",
                priceCurrency: "INR", // Currency for India
                price: "800", // Assuming free registration; adjust as needed
                eligibleRegion: {
                  "@type": "Place",
                  name: "Kerala, India",
                },
              },
              eventAttendanceMode:
                "https://schema.org/OfflineEventAttendanceMode", // Set to offline as per your input
              eventStatus: "https://schema.org/EventScheduled", // Event is confirmed and scheduled
              performer: [], // No fixed performers, so leave this empty
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
