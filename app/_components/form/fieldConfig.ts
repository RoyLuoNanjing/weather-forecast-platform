import { IWeatherSources } from "@/types";
import { IControlledFormFieldArr } from ".";
import { weatherSourcesConfigMap } from "@/app/lib/config";

interface IProps {
  selectedWeatherSource: IWeatherSources;
}
export const useWeatherParamsFieldConfig = (props: IProps) => {
  const { selectedWeatherSource } = props;
  const weatherParamsFieldArr: IControlledFormFieldArr = [
    {
      name: "forecastDays",
      label: "Forecast Days",
      type: "number",
      component: "slider",
      range: [1, weatherSourcesConfigMap[selectedWeatherSource].forecastDays],
      step: 1,
    },
    {
      name: "units",
      label: "units",
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
  { value: 1, label: "metrics" },
  { value: 2, label: "imperial" },
];
