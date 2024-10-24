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
import { Box, Button } from "@mui/joy";
import { useWeatherParamsDefaultValues } from "./defaultValues";
import { IWeatherSources } from "@/types";
import { useEffect, useState } from "react";
import { getWeatherForecastDataRequest } from "@/app/services/weatherService";
import { googleSheetBaseUrl } from "@/app/lib/constants";

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
  selectedPlace: google.maps.places.PlaceResult | null;
}

export const WeatherForecastForm = (props: IProps) => {
  const { selectedWeatherSource, selectedPlace } = props;
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [googleSheetId, setGoogleSheetId] = useState<string | null>(null);
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
    const coordinates = [
      /* keep this for the demo in case google map stops working in China */
      selectedPlace?.geometry?.location?.lat() || 42.3478,
      selectedPlace?.geometry?.location?.lng() || -71.0466,
    ];
    setIsButtonLoading(true);
    setGoogleSheetId(null);

    try {
      const res = await getWeatherForecastDataRequest(selectedWeatherSource, {
        coordinates: coordinates,
        timeSteps: null,
        forecastDays: data.forecastDays,
        units: data.units.label,
      });
      if (res && res.googleSheetId) {
        setGoogleSheetId(res.googleSheetId);
      }
    } catch (error) {
      console.log(error);
    }

    setIsButtonLoading(false);
  };

  return (
    <>
      {renderControlledFormInputFields({
        fields: weatherParamsFieldArr,
        formSetValue: setValue,
        control: control,
      })}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 4,
          mt: 2,
        }}
      >
        <Button
          variant="outlined"
          loading={isButtonLoading}
          color="primary"
          sx={{
            "--variant-borderWidth": "2px",
            borderRadius: 40,
            borderColor: "primary.500",
          }}
          onClick={handleSubmit(onSubmit)}
        >
          Go
        </Button>

        {!isButtonLoading && googleSheetId && (
          <Button
            variant="outlined"
            loading={isButtonLoading}
            color="primary"
            sx={{
              "--variant-borderWidth": "2px",
              borderRadius: 40,
              borderColor: "primary.500",
            }}
            onClick={() =>
              window.open(googleSheetBaseUrl + googleSheetId, "_blank")
            }
          >
            Read
          </Button>
        )}
      </Box>
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
