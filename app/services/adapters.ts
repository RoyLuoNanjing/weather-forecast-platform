import { IWeatherSources } from "@/types";
import { weatherSourcesConfigMap } from "../lib/config";

interface WeatherParams {
  location: string;
  days?: number;
}

export function selectedApiAdapter(source: IWeatherSources, data: any) {
  switch (source) {
    case "tomorrow":
      return tomorrowAdapter(data);
    case "weatherApi":
      return weatherApiAdapter(data);
    default:
      return openMeteoAdapter(data);
  }
}

interface ITomorrowAdapterParams {
  coordinates: [number, number];
  timeSteps: number | null;
  fields: string[];
  forecastDays: number;
  units: string;
}
function tomorrowAdapter(params: ITomorrowAdapterParams) {
  const source = "tomorrow";
  const fields = weatherSourcesConfigMap[source].options?.map(
    (option: any) => Object.values(option)[0]
  );

  return {
    location: params.coordinates.toString(), //need to convert the coordinates to string
    timesteps: params.timeSteps + "h",
    fields: fields?.toString() || "",
    endTime: `nowPlus${params.forecastDays}d`,
    units: params.units,
  };
}

function weatherApiAdapter(params: WeatherParams) {
  // weatherApi 预报系统的参数适配
  return {
    city: params.location,
    days: params.days || 3, // 默认天数为3
  };
}

function openMeteoAdapter(params: WeatherParams) {
  // openMeteo 预报系统的参数适配
  return {
    area: params.location,
    period: params.days || 7, // 默认天数为7
  };
}
