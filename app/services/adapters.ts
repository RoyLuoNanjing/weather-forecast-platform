import { IWeatherSources } from "@/types";
import { weatherSourcesConfigMap } from "../lib/config";

interface IEssentialAdapterParams {
  coordinates: [number, number];
  forecastDays: number;
  units: string;
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

interface ITomorrowAdapterParams extends IEssentialAdapterParams {
  timeSteps: number | null;
  fields: string[];
}
function tomorrowAdapter(params: ITomorrowAdapterParams) {
  const source = "tomorrow";
  //get the fields strings from the config file using the source name
  const fields = weatherSourcesConfigMap[source].options?.map(
    (option: any) => Object.values(option)[0]
  );

  return {
    location: params.coordinates.toString(),
    timesteps: params.timeSteps ? params.timeSteps + "h" : "",
    fields: fields?.toString() || "",
    endTime: `nowPlus${params.forecastDays}d`,
    units: params.units === "celsius" ? "metric" : "imperial",
  };
}

function weatherApiAdapter(params: IEssentialAdapterParams) {
  return {
    q: params.coordinates.toString(),
    days: params.forecastDays.toString(),
    units: params.units,
  };
}

interface IOpenMeteoAdapterParams extends IEssentialAdapterParams {
  fields: string[];
}
function openMeteoAdapter(params: IOpenMeteoAdapterParams) {
  const source = "openMeteo";
  const fields = weatherSourcesConfigMap[source].options?.map(
    (option: any) => Object.values(option)[0] as string
  );

  return {
    latitude: params.coordinates[0].toString(),
    longitude: params.coordinates[1].toString(),
    hourly: fields?.toString() || "",
    forecast_days: params.forecastDays?.toString(),
  };
}
