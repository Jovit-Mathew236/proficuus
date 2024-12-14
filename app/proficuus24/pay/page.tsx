import Pay from "@/components/pay";
import React from "react";
import Head from "next/head"; // Import the Head component from Next.js

const page = () => {
  return (
    <>
      <Head>
        <meta property="og:title" content="Donate for Proficuus" />
        <meta property="og:description" content="Description of your page." />
        <meta property="og:image" content="/images/pay.png" />
        <meta
          property="og:url"
          content="https://www.jymest.com/proficuus24/pay"
        />
        <title>Donate for Proficuus</title>
      </Head>
      <Pay />
    </>
  );
};

export default page;
