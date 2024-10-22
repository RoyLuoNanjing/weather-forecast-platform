import {
  tomorrowAdapter,
  weatherApiAdapter,
  openMeteoAdapter,
} from "./adapters";

export async function getWeatherData(system: string, params: any) {
  let apiUrl = "";
  let formattedParams = {};

  // 根据不同的天气预报系统选择不同的参数适配器
  switch (system) {
    case "tomorrow":
      apiUrl = "https://api.tomorrow.io/weather";
      formattedParams = tomorrowAdapter(params);
      break;
    case "weatherApi":
      apiUrl = "https://api.weatherapi.com/v1";
      formattedParams = weatherApiAdapter(params);
      break;
    case "openMeteo":
      apiUrl = "https://api.open-meteo.com";
      formattedParams = openMeteoAdapter(params);
      break;
    default:
      throw new Error("Unknown weather system");
  }

  // 发出请求
  const response = await fetch(
    `${apiUrl}?${new URLSearchParams(formattedParams)}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch weather data: ${response.status}`);
  }

  return await response.json();
}
