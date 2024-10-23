import { IWeatherSources } from "@/types";
import { IControlledFormFieldArr } from ".";
import { weatherSourcesConfigMap } from "@/app/lib/config";

interface IProps {
  selectedWeatherSource: IWeatherSources;
}
export const useWeatherParamsFieldConfig = (props: IProps) => {
  const { selectedWeatherSource } = props;

  //weather api does not support one day forecast
  const defaultMinForecastDays = selectedWeatherSource === "weatherApi" ? 2 : 1;

  const weatherParamsFieldArr: IControlledFormFieldArr = [
    {
      name: "forecastDays",
      label: "Forecast Days",
      type: "number",
      component: "slider",
      range: [
        defaultMinForecastDays,
        weatherSourcesConfigMap[selectedWeatherSource].maxForecastDays,
      ],
      step: 1,
    },
    {
      name: "units",
      label: "Units",
      type: "string",
      component: "select",
      options: weatherUnitOptions,
    },
  ];

  return {
    weatherParamsFieldArr,
  };
};

export const weatherUnitOptions = [
  { value: 1, label: "celsius" },
  { value: 2, label: "fahrenheit" },
];
