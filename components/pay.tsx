"use client"; // Ensure this is at the top for Next.js or similar environments
import { useEffect } from "react";

const Pay = () => {
  useEffect(() => {
    // Redirect to the UPI link when the component mounts
    window.location.href =
      "upi://pay?pa=georgeenakurian-1@okhdfcbank&pn=Georgeena%20kurian&aid=uGICAgID_47rsVQ";
  }, []);

  return null; // No UI is rendered since we're redirecting immediately
};

export default Pay;
