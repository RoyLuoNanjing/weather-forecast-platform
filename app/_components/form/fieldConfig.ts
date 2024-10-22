import { IControlledFormFieldArr } from ".";

export const useWeatherParamsFieldConfig = () => {
  const weatherParamsFieldArr: IControlledFormFieldArr = [
    {
      name: "forecastDays",
      label: "Forecast Days",
      type: "number",
      component: "slider",
      range: [1, 3],
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
