// "use client";
// import Image from "next/image";
// import React, { useRef } from "react";
// import QrCreator from "qr-creator";

// interface EmailTemplateProps {
//   name: string;
//   zone: string;
//   collage: string;
//   userId: string;
// }

// export const EmailTemplateParticipant: React.FC<
//   Readonly<EmailTemplateProps>
// > = ({ name, zone, collage, userId }) => {
//   const qrCodeRef = useRef<HTMLDivElement>(null);

//   React.useEffect(() => {
//     if (qrCodeRef.current) {
//       // Clear previous QR code
//       qrCodeRef.current.innerHTML = "";

//       // Render new QR code
//       QrCreator.render(
//         {
//           text: userId, // Customize text for QR code
//           radius: 0.5, // 0.0 to 0.5
//           ecLevel: "H", // L, M, Q, H
//           fill: "#FFFFFF", // foreground color
//           background: null, // color or null for transparent
//           size: 75, // in pixels
//         },
//         qrCodeRef.current
//       );
//     }
//   }, [userId]); // Dependency array to re-generate QR code if userId changes

//   return (
//     <div>
//       <h6>
//         Welcome, {name}! Your registration as a Proficuus&apos;24 is successful!
//       </h6>

//       <div className="relative mt-48 rotate-90 text-white">
//         <div className="absolute bottom-4 left-4 font-semibold">
//           <p>
//             {name} - {zone} - participant
//           </p>
//           <p>{collage}</p>
//         </div>
//         <div className="absolute top-14 -right-4 -rotate-90 w-40 text-right">
//           <p className="uppercase font-black">{name}</p>
//           <p className="font-semibold">{collage}</p>
//         </div>
//         <div className="absolute bottom-4 right-4">
//           <div className="w-20 h-20 rounded-lg" ref={qrCodeRef}></div>
//         </div>
//         <Image
//           src="/images/ticket.png"
//           alt="Ticket Image"
//           width={300}
//           height={300}
//           className="mb-44 w-full"
//         />
//       </div>
//     </div>
//   );
// };

/* eslint-disable react/no-unescaped-entities */
import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplateParticipant: React.FC<
  Readonly<EmailTemplateProps>
> = ({ firstName }) => (
  <div
    style={{
      backgroundColor: "#f9fafb",
      minHeight: "100vh",
      padding: "2rem 0rem",
    }}
  >
    <div
      style={{
        maxWidth: "42rem",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        borderRadius: "0.5rem",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        overflow: "hidden",
      }}
    >
      {/* Header with logo background */}
      <div
        style={{
          backgroundColor: "#2563eb",
          padding: "2.5rem 2rem",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "#ffffff",
            marginBottom: "0.75rem",
          }}
        >
          PROFICUUS'24
        </h1>
        <p
          style={{
            color: "#bfdbfe",
            fontSize: "1.125rem",
            marginBottom: "1rem",
          }}
        >
          An awakening call for budding professionals
        </p>
        <p
          style={{
            color: "#ffffff",
            fontSize: "1rem",
            fontStyle: "italic",
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            paddingTop: "1rem",
            maxWidth: "80%",
            margin: "0 auto",
          }}
        >
          "Be dressed ready for service and keep your lamps burning"
        </p>
      </div>

      {/* Main content */}
      <div
        style={{
          padding: "2rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#1f2937",
            marginBottom: "1.5rem",
          }}
        >
          Welcome, {firstName}! 🎉
        </h2>

        <div
          style={{
            // display: "flex",
            // flexDirection: "column",
            gap: "1.5rem",
            color: "#4b5563",
          }}
        >
          <p
            style={{
              fontSize: "1.125rem",
            }}
          >
            Your registration for PROFICUUS'24 has been successfully confirmed!
          </p>

          <div
            style={{
              backgroundColor: "#eff6ff",
              borderLeft: "4px solid #2563eb",
              padding: "1.25rem",
              borderRadius: "0.25rem",
              marginTop: "0.5rem",
            }}
          >
            <p
              style={{
                fontWeight: "500",
                color: "#1e40af",
                lineHeight: "1.6",
              }}
            >
              Prepare yourself for a transformative journey that will ignite
              your professional spirit and illuminate your path forward.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "1.5rem",
              borderRadius: "0.5rem",
              marginTop: "1rem",
            }}
          >
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "0.75rem",
              }}
            >
              Access Your Profile
            </h3>
            <p
              style={{
                color: "#4b5563",
                marginBottom: "0.5rem",
              }}
            >
              Start your journey by logging in with:
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: "0",
                marginBottom: "1.25rem",
              }}
            >
              <li
                style={{
                  color: "#4b5563",
                  marginBottom: "0.25rem",
                }}
              >
                • Your registered email address
              </li>
              <li
                style={{
                  color: "#4b5563",
                  marginBottom: "1rem",
                }}
              >
                • The Phone number you created during registration
              </li>
            </ul>
            <a
              href="https://proficuus.jymest.com/profile"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "#adadada3",
                color: "#f8fafc",
                padding: "0.75rem 2rem",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.2s",
                fontWeight: "500",
                textDecoration: "none",
                display: "inline-block",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#1d4ed8")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#2563eb")
              }
            >
              Login to Your Profile
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          backgroundColor: "#f9fafb",
          padding: "2rem",
          textAlign: "center",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <p
          style={{
            fontSize: "0.875rem",
            color: "#4b5563",
            marginBottom: "1rem",
          }}
        >
          Need guidance? We're here to support your journey.
        </p>
        <a
          href="tel:+919400038737"
          style={{
            backgroundColor: "#2563eb",
            color: "#ffffff",
            padding: "0.75rem 2rem",
            borderRadius: "9999px",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.2s",
            fontWeight: "500",
            textDecoration: "none",
            display: "inline-block",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#1d4ed8")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#2563eb")
          }
        >
          Contact Support
        </a>
      </div>
    </div>
  </div>
);
