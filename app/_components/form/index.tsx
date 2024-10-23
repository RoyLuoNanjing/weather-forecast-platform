"use client";
import { FormSwitchField } from "@/components/ui/form/switchField";
import { inputFieldCommonStyle } from "@/styles/common";
import { weatherParamsFormSchema } from "./schema";
import { Control, useForm, UseFormSetValue } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWeatherParamsFieldConfig } from "./fieldConfig";
import {
  FormSelectField,
  FormSliderField,
  FormTextField,
} from "@/components/ui/form";
import { Button } from "@mui/joy";
import { useWeatherParamsDefaultValues } from "./defaultValues";
import { IWeatherSources } from "@/types";
import { useEffect } from "react";
import { getWeatherForecastData } from "@/app/services/weatherService";

export type WeatherParamsFormFields = z.infer<typeof weatherParamsFormSchema>;

export type IControlledFormFieldArr = {
  name: keyof WeatherParamsFormFields;
  label: string;
  type: string;
  component:
    | "textField"
    | "textArea"
    | "select"
    | "multipleSelect"
    | "switch"
    | "slider";
  endDecorator?: string;
  options?: { value: number; label: string }[];
  range?: [number, number];
  step?: number;
}[];

interface IProps {
  selectedWeatherSource: IWeatherSources;
}

export const WeatherForecastForm = (props: IProps) => {
  const { selectedWeatherSource } = props;
  const { weatherParamsFieldArr } = useWeatherParamsFieldConfig({
    selectedWeatherSource,
  });
  const { control, handleSubmit, setValue, reset } =
    useForm<WeatherParamsFormFields>({
      mode: "onBlur",
      reValidateMode: "onBlur",
      resolver: zodResolver(weatherParamsFormSchema),
      defaultValues: useWeatherParamsDefaultValues().weatherParamsDefaultValues,
    });

  //make sure the values in the form are reset
  useEffect(() => {
    reset();
  }, [reset, selectedWeatherSource]);

  const onSubmit = async (data: WeatherParamsFormFields) => {
    const res = await getWeatherForecastData("weatherApi", {
      coordinates: [42.3478, -71.0466],
      timeSteps: 1,
      forecastDays: 3,
      units: "celsius",
    });

    console.log(res);
  };

  return (
    <>
      {renderControlledFormInputFields({
        fields: weatherParamsFieldArr,
        formSetValue: setValue,
        control: control,
      })}
      <Button
        variant="outlined"
        color="primary"
        sx={{
          "--variant-borderWidth": "2px",
          borderRadius: 40,
          borderColor: "primary.500",
          mx: "auto",
        }}
        onClick={handleSubmit(onSubmit)}
      >
        Go
      </Button>
    </>
  );
};

const renderControlledFormInputFields = ({
  fields,
  formSetValue,
  control,
}: {
  fields: IControlledFormFieldArr;
  formSetValue: UseFormSetValue<any>;
  control: Control<any>;
}) => {
  return fields.map((field) => {
    switch (field.component) {
      case "textField":
        return (
          <FormTextField
            name={field.name}
            control={control}
            key={field.name}
            label={field.label}
            fieldContainerStyle={inputFieldCommonStyle}
            endDecorator={field.endDecorator}
          />
        );
      case "select":
        return (
          <FormSelectField
            name={field.name}
            control={control}
            key={field.name}
            label={field.label}
            fieldContainerStyle={inputFieldCommonStyle}
            optionArr={field.options!}
            formSetValue={formSetValue}
          />
        );
      case "switch":
        return (
          <FormSwitchField
            name={field.name}
            control={control}
            key={field.name}
            label={field.label}
            fieldContainerStyle={inputFieldCommonStyle}
          />
        );
      case "slider":
        return (
          <FormSliderField
            name={field.name}
            control={control}
            key={field.name}
            label={field.label}
            min={field.range![0]}
            max={field.range![1]}
            step={field.step}
          />
        );
      default:
        break;
    }
  });
};
