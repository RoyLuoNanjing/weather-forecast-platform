import { weatherSourcesConfigMap } from "@/app/lib/config";
import { NextRequest, NextResponse } from "next/server";
import { appendToGoogleSheet, createGoogleSheet } from "./googleSheetService";
import { fetchWeatherData } from "./weatherService";

export async function getWeatherForecastDataController(
  req: NextRequest,
  _res: NextResponse
) {
  const params: any = req.nextUrl.searchParams;
  const weatherSource = params.get("source");
  params.delete("source"); // we don't need this param to be sent to api

  const apiUrl = weatherSourcesConfigMap[weatherSource].apiUrl;
  /* Step 1. Create a google sheet */
  const newGoogleSheetId = await createGoogleSheet();

  /* Step 2. Fetch the data */
  const rawWeatherData = await fetchWeatherData({
    apiUrl,
    params,
    weatherSource,
  });
  /* Step 3. Process the data */

  /* Step 4. Append to the google sheet based on the sheet id */
  if (newGoogleSheetId) {
    await appendToGoogleSheet({ googleSheetId: newGoogleSheetId });
  }

  //  try {
  //   return NextResponse.json(
  //     { body: data },
  //     {
  //       status: response.status,
  //     }
  //   );
  //  } catch (error) {
  //   return NextResponse.json(
  //     { body: "Bad request" },
  //     {
  //       status: 500,
  //     }
  //   );
  //  }
}
