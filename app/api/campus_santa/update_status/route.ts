import { NextRequest, NextResponse } from "next/server";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxn5Ns8Lcys1v2zBIE49FcCwMB2Ns1kVkS25PUCGu6U7PGq6cOAwf3hp-ril0Dts1dV/exec";

export async function POST(req: NextRequest) {
  try {
    const { action, college, date, status } = await req.json();

    if (!action) {
      return NextResponse.json(
        { message: "Missing required parameter: action" },
        { status: 400 }
      );
    }

    // Handle different actions based on the 'action' in the POST request body
    if (action === "updateStatus") {
      if (!college || !date) {
        return NextResponse.json(
          { message: "Missing required parameters: college and date" },
          { status: 400 }
        );
      }

      try {
        // Use URLSearchParams to properly encode parameters
        const params = new URLSearchParams({
          action: "updateStatus",
          college: college,
          date: date,
          status: status || "Pending",
        });

        const response = await fetch(`${SCRIPT_URL}?${params.toString()}`, {
          method: "POST", // Explicitly set method to POST
        });

        // Check if the response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Try to parse the response text as JSON
        const responseText = await response.text();

        try {
          const data = JSON.parse(responseText);
          return NextResponse.json(data, { status: 200 });
        } catch (jsonError) {
          // If parsing fails, log the raw response and return an error
          console.log("Error parsing JSON:", jsonError);

          console.error("Non-JSON response:", responseText);
          return NextResponse.json(
            { message: "Received non-JSON response from Google Apps Script" },
            { status: 500 }
          );
        }
      } catch (fetchError) {
        console.error("Fetch error:", fetchError);
        return NextResponse.json(
          { message: `Fetch error: ${(fetchError as Error).message}` },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ message: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { message: `Error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
