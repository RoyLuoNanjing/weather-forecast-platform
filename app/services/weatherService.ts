import { IWeatherSources } from "@/types";
import { selectedApiAdapter } from "./adapters";

export async function getWeatherForecastDataRequest(
  source: IWeatherSources,
  data: any
) {
  const customizedParams = selectedApiAdapter(source, data);
  const finalParams = {
    ...customizedParams,
    source: source,
  };

  try {
    const response = await fetch(
      `/api/v1/weather?${new URLSearchParams(finalParams)}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}
