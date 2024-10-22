import { IWeatherSources } from "@/types";

type WeatherSourceConfig = {
  name: IWeatherSources;
  label: string;
  forecastDays: number;
  timeSteps?: number;
};

export const weatherSourcesConfigList: WeatherSourceConfig[] = [
  {
    name: "tomorrow",
    label: "Tomorrow",
    forecastDays: 2,
  },
  {
    name: "weatherApi",
    label: "Weather Api",
    forecastDays: 3,
  },
  {
    name: "openMeteo",
    label: "Open Meteo",
    forecastDays: 7,
  },
];

export const weatherSourcesConfigMap = weatherSourcesConfigList.reduce(
  (acc, { name, ...rest }) => {
    acc[name] = { name, ...rest };
    return acc;
  },
  {} as Record<string, WeatherSourceConfig>
);
