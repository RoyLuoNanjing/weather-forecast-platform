import { IControlledFormFieldArr } from ".";

export const useWeatherParamsFieldConfig = () => {
  const weatherParamsFieldArr: IControlledFormFieldArr = [
    {
      name: "forecastDays",
      label: "Forecast Days",
      type: "number",
      component: "textField",
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

const weatherUnitOptions = [
  { value: 1, label: "metrics" },
  { value: 2, label: "imperial" },
];
