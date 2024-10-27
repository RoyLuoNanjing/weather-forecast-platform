import { weatherSourcesConfigMap } from "@/app/lib/config";
import { NextRequest, NextResponse } from "next/server";
import { appendToGoogleSheet, createGoogleSheet } from "./googleSheetService";
import { fetchWeatherData } from "./weatherService";
import { processWeatherData } from "@/app/services/dataProcessors";

export async function getWeatherForecastDataController(
  req: NextRequest,
  _res: NextResponse
) {
  const params: any = req.nextUrl.searchParams;
  const weatherSource = params.get("source");

  params.delete("source"); // we don't need this param to be sent to api

  const apiUrl = weatherSourcesConfigMap[weatherSource].apiUrl; //get api url from the config

  try {
    /* Step 1. Fetch the raw data from the selected weather source*/
    const rawWeatherData = await fetchWeatherData({
      apiUrl,
      params,
      weatherSource,
    });

    /* Step 2. Process the data */
    const processedWeatherData = processWeatherData(
      weatherSource,
      rawWeatherData,
      params
    );

    /* Step 3. Create a google sheet */
    const newGoogleSheetId = await createGoogleSheet();

    /* Step 4. Append data to the google sheet based on the sheet id */
    if (newGoogleSheetId) {
      await appendToGoogleSheet({
        googleSheetId: newGoogleSheetId,
        values: processedWeatherData,
      });
    }
    return NextResponse.json(
      { googleSheetId: newGoogleSheetId },
      {
        status: 200,
      }
    );
  } catch (error) {
    let errorMessage = "An error occurred while processing your request.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
