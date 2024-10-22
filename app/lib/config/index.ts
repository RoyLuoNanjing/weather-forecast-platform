import { IWeatherSources } from "@/types";

type WeatherSourceConfig = {
  name: IWeatherSources;
  label: string;
  forecastDays: number;
  apiUrl: string;
  timeSteps?: number | string;
  options?: { [key: string]: string }[];
};

export const weatherSourcesConfigList: WeatherSourceConfig[] = [
  {
    name: "tomorrow",
    label: "Tomorrow",
    forecastDays: 2,
    apiUrl: "https://api.tomorrow.io/v4/timelines",
    timeSteps: "1h",
    options: [{ temperature: "temperature" }, { humidity: "humidity" }],
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
    options: [
      { temperature: "temperature_2m" },
      { windSpeed: "wind_speed_10m" },
    ],
  },
];

export const weatherSourcesConfigMap = weatherSourcesConfigList.reduce(
  (acc, { name, ...rest }) => {
    acc[name] = { name, ...rest };
    return acc;
  },
  {} as Record<string, WeatherSourceConfig>
);
