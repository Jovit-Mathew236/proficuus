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
              href="https://www.jymest.com/proficuus24/profile"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "#1f2937",
                color: "#fff",
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

          {/* Additional Content */}
          <div
            style={{
              marginTop: "1.5rem",
              color: "#4b5563",
            }}
          >
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "0.5rem",
              }}
            >
              𝓑𝓮𝓵𝓸𝓿𝓮𝓭 {firstName},
            </h3>
            <p>Welcome aboard Young Lantern!!🏮</p>
            <p>
              We're extremely thrilled to have you here & looking forward to
              meet you at PROFICUUS'24.
            </p>
            <p>
              No one has ever seen God; but if we Love one another, God lives in
              us & His Love is perfected in us! (1 John 4:12)
            </p>
            <p>
              Dearest one in Christ, get ready to share His amazing love to each
              and every soul you meet.
            </p>
            <p>See you soon at Proficuus'24... 𝓙𝓮𝓼𝓾𝓼 𝓵𝓸𝓿𝓮𝓼 𝔂𝓸𝓾</p>
            <p>
              𝗩𝗲𝗻𝘂𝗲: 𝘚𝘢𝘩𝘳𝘥𝘢𝘺𝘢 𝘊𝘰𝘭𝘭𝘦𝘨𝘦 𝘰𝘧 𝘌𝘯𝘨𝘪𝘯𝘦𝘦𝘳𝘪𝘯𝘨 & 𝘛𝘦𝘤𝘩𝘯𝘰𝘭𝘰𝘨𝘺, 𝘒𝘰𝘥𝘢𝘬𝘢𝘳𝘢,
              𝘛𝘩𝘳𝘪𝘴𝘴𝘶𝘳
            </p>
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <a
                href="https://www.google.com/maps/place/Sahrdaya+College+of+Advanced+Studies+Kodakara+Thrissur+Kerala/@10.350077989774016,76.28601117604977,15z"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  cursor: "pointer",
                }}
              >
                <img
                  src="https://www.jymest.com/images/map.png" // Replace with your desired image URL
                  alt="View on Google Maps"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "0.5rem",
                    border: "1px solid #e5e7eb", // Optional border for aesthetics
                  }}
                />
              </a>
            </div>
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
