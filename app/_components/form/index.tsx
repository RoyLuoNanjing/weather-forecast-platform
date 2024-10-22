"use client";
import { FormSwitchField } from "@/components/ui/form/switchField";
import { inputFieldCommonStyle } from "@/styles/common";
import { weatherParamsFormSchema } from "./schema";
import { Control, useForm, UseFormSetValue } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWeatherParamsFieldConfig } from "./fieldConfig";
import { FormSelectField, FormTextField } from "@/components/ui/form";

export type WeatherParamsFormFields = z.infer<typeof weatherParamsFormSchema>;

export type IControlledFormFieldArr = {
  name: keyof WeatherParamsFormFields;
  label: string;
  type: string;
  component: "textField" | "textArea" | "select" | "multipleSelect" | "switch";
  endDecorator?: string;
  options?: { value: number; label: string }[];
}[];

export const WeatherForecastForm = () => {
  const { weatherParamsFieldArr } = useWeatherParamsFieldConfig();
  const { control, handleSubmit, formState, setValue, reset, watch } =
    useForm<WeatherParamsFormFields>({
      mode: "onBlur",
      reValidateMode: "onBlur",
      resolver: zodResolver(weatherParamsFormSchema),
      // defaultValues:
      //   useDesignLoadDefaultValues().designLoadEssentialDefaultValues,
    });

  return renderControlledFormInputFields({
    fields: weatherParamsFieldArr,
    formSetValue: setValue,
    control: control,
  });
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
      default:
        break;
    }
  });
};
