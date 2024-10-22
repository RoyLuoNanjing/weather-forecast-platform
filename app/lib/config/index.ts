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
    forecastDays: 3,
  },
  {
    name: "weatherApi",
    label: "Weather Api",
    forecastDays: 3,
  },
  {
    name: "openMeteo",
    label: "Open Meteo",
    forecastDays: 3,
  },
];
