import { IWeatherSources } from "@/types";

type WeatherSourceConfig = {
  name: IWeatherSources;
  label: string;
  forecastDays: number;
  apiUrl: string;
  timeSteps?: number;
};

export const weatherSourcesConfigList: WeatherSourceConfig[] = [
  {
    name: "tomorrow",
    label: "Tomorrow",
    forecastDays: 2,
    apiUrl: "https://api.tomorrow.io/v4/timelines",
  },
  {
    name: "weatherApi",
    label: "Weather Api",
    forecastDays: 3,
    apiUrl: "http://api.weatherapi.com/v1/forecast.json",
  },
  {
    name: "openMeteo",
    label: "Open Meteo",
    forecastDays: 7,
    apiUrl: "https://api.open-meteo.com/v1/forecast",
  },
];

export const weatherSourcesConfigMap = weatherSourcesConfigList.reduce(
  (acc, { name, ...rest }) => {
    acc[name] = { name, ...rest };
    return acc;
  },
  {} as Record<string, WeatherSourceConfig>
);
