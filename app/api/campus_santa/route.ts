import { NextRequest, NextResponse } from "next/server";

// Replace with your actual Google Apps Script URL
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwawS06oCPNqYxx-gwFnIzAf97LuWEMOFlUtsuulxzTBsqm9zFPjKsUD-YE0cSyq6em/exec";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const action = searchParams.get("action"); // Get the action from the query string (e.g., 'getColleges', 'getData')

  try {
    // Handle different actions based on the query parameter 'action'
    if (action === "getColleges") {
      // Call the getColleges endpoint
      const colleges = await fetch(`${SCRIPT_URL}?action=getColleges`)
        .then((response) => response.json())
        .then((data) => {
          return data; // Return list of colleges
        });

      return NextResponse.json(colleges, { status: 200 });
    }

    if (action === "getData") {
      const college = searchParams.get("college");
      const date = searchParams.get("date");

      if (!college || !date) {
        return NextResponse.json(
          { message: "Missing required parameters: college and date" },
          { status: 400 }
        );
      }

      // Call the getData endpoint
      const data = await fetch(
        `${SCRIPT_URL}?action=getData&college=${college}&date=${date}`
      )
        .then((response) => response.json())
        .then((data) => {
          return data; // Return filtered data for the specific college and date
        });

      return NextResponse.json(data, { status: 200 });
    }

    // Default response for unknown actions
    return NextResponse.json({ message: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { message: `Error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
