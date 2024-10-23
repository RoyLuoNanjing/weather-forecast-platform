import { IWeatherSources } from "@/types";
import { weatherSourcesConfigMap } from "../lib/config";
import { selectedApiAdapter } from "./adapters";

export async function getWeatherData(source: IWeatherSources, data: any) {
  const apiUrl = weatherSourcesConfigMap[source].apiUrl;

  const formattedParams = selectedApiAdapter(source, data);

  //Different web has different names for their key in the header, thus we need to customized it
  const customizedHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const apiKey = weatherSourcesConfigMap[source].apiKey;
  if (apiKey) {
    customizedHeaders[apiKey.name] = apiKey.key;
  }

  const response = await fetch(
    `${apiUrl}?${new URLSearchParams(formattedParams)}`,
    {
      method: "GET",
      headers: customizedHeaders,
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch weather data: ${response.status}`);
  }

  return await response.json();
}
