import { weatherSourcesConfigMap } from "@/app/lib/config";
import { NextResponse } from "next/server";

interface IFetchWeatherData {
  apiUrl: string;
  params: any;
  weatherSource: any;
}
export async function fetchWeatherData(props: IFetchWeatherData) {
  const { apiUrl, params, weatherSource } = props;
  const apiKey = weatherSourcesConfigMap[weatherSource].apiKey;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  //some api requires key in the header
  if (apiKey) {
    headers[apiKey.name] = apiKey.key;
  }

  try {
    const response = await fetch(`${apiUrl}?${params}`, {
      method: "GET",
      headers: headers,
    });

    const data = await response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}
