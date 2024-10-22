import { IWeatherSources } from "@/types";

type WeatherSourceConfig = {
  name: IWeatherSources;
  label: string;
};

export const weatherSourcesConfigList: WeatherSourceConfig[] = [
  {
    name: "tomorrow",
    label: "tomorrow",
  },
  {
    name: "weatherApi",
    label: "weatherApi",
  },
  {
    name: "openMeteo",
    label: "Open Meteo",
  },
];
