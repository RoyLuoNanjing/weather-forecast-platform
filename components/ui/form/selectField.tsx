import {
  FormControl,
  FormHelperText,
  FormLabel,
  Typography,
  Option,
  Select,
} from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import { ReactNode } from "react";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import { FieldInfoIconWithTooltip } from "./fieldInfoIcon";

export interface IFormSelectField {
  name: string;
  label: string;
  description?: string;
  helpText?: string | ReactNode;
  optionArr: IOption[];
  control: Control<any>;
  formSetValue: UseFormSetValue<any>;
  isDisabled?: boolean;
  isRequired?: boolean;
  isHidden?: boolean;
  fieldContainerStyle?: SxProps;
  inputFieldStyle?: SxProps;
}

interface IOption {
  value: number;
  label: string;
}

export const FormSelectField = (props: IFormSelectField) => {
  const {
    name,
    label,
    description,
    helpText,
    optionArr,
    control,
    formSetValue,
    isDisabled,
    isRequired,
    isHidden,
    fieldContainerStyle,
    inputFieldStyle,
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onBlur, ref }, fieldState: { error } }) => {
        if (isHidden) return <></>;

        return (
          <FormControl
            id={name}
            error={Boolean(error)}
            sx={{ mb: 2, fontFamily: "inherit", ...fieldContainerStyle }}
          >
            {label && (
              <FormLabel sx={{ marginTop: 1, fontFamily: "inherit" }}>
                <Typography
                  level="body-md"
                  mr={1}
                  sx={{ fontFamily: "inherit" }}
                >
                  {label}
                </Typography>

                {helpText && (
                  <FieldInfoIconWithTooltip tooltipText={helpText} />
                )}
              </FormLabel>
            )}
            {description && (
              <FormHelperText
                sx={{ mb: 1.5, whiteSpace: "pre-line", fontFamily: "inherit" }}
              >
                {description}
              </FormHelperText>
            )}

            <Select
              name={name}
              slotProps={{
                root: { ref },
              }}
              value={(value as IOption)?.value}
              // manually running on change and updating value due to JoyUI select issue - https://github.com/mui/material-ui/issues/36946
              onChange={(
                event: React.SyntheticEvent | null,
                newValue: number | null
              ) => {
                formSetValue(
                  name,
                  {
                    value: newValue as number,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    label: event?.target?.innerText,
                  },
                  {
                    shouldDirty: true,
                  }
                );
              }}
              onBlur={onBlur}
              disabled={isDisabled}
              required={isRequired}
              sx={{ fontFamily: "inherit", ...inputFieldStyle }}
            >
              {optionArr?.map((option) => {
                return (
                  <Option
                    key={option.value}
                    value={option.value}
                    sx={{ fontFamily: "inherit" }}
                  >
                    {option.label}
                  </Option>
                );
              })}
            </Select>
            <FormHelperText>{error?.message ?? ""}</FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};
