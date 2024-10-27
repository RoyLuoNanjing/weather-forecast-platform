import { IWeatherSources } from "@/types";
import { selectedApiAdapter } from "./adapters";

export async function getWeatherForecastDataRequest(
  source: IWeatherSources,
  data: any
) {
  //Get formatted params from the adapter  based on the selection
  const customizedParams = selectedApiAdapter(source, data);
  const finalParams = {
    ...customizedParams,
    source: source, // need to pass the source name to the backend as well
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

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}
