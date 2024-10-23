import { weatherSourcesConfigMap } from "@/app/lib/config";
import { NextRequest, NextResponse } from "next/server";

export async function getWeatherForecastDataController(
  req: NextRequest,
  _res: NextResponse
) {
  const data: any = req.nextUrl.searchParams;
  const weatherSource = data.get("source");

  data.delete("source"); // we don't need this to be sent to api
  const apiUrl = weatherSourcesConfigMap[weatherSource].apiUrl;

  const paramsForWeatherApi = data;

  const customizedHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const apiKey = weatherSourcesConfigMap[weatherSource].apiKey;
  if (apiKey) {
    customizedHeaders[apiKey.name] = apiKey.key;
  }

  try {
    const response = await fetch(`${apiUrl}?${paramsForWeatherApi}`, {
      method: "GET",
      headers: customizedHeaders,
    });

    const data = await response.json();
    return NextResponse.json(
      { body: data },
      {
        status: response.status,
      }
    );
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return NextResponse.json(
      { body: "Bad request" },
      {
        status: 500,
      }
    );
  }
}
