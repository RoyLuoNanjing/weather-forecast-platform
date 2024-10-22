import {
  FormControl,
  FormHelperText,
  FormLabel,
  Switch,
  Typography,
} from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import { ReactNode } from "react";
import { Control, Controller } from "react-hook-form";
import { FieldInfoIconWithTooltip } from "./fieldInfoIcon";

export interface IFormSwitchField {
  name: string;
  label: string;
  helpText?: string | ReactNode;
  description?: string | ReactNode;
  control: Control<any>;
  optionArr?: { value: number | string; label: string | ReactNode }[];
  fieldContainerStyle?: SxProps;
}
export const FormSwitchField = (props: IFormSwitchField) => {
  const { name, helpText, description, label, control, fieldContainerStyle } =
    props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <FormControl
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

            <Switch onChange={field.onChange} variant="outlined" />

            {description && <FormHelperText>{description}</FormHelperText>}
            <FormHelperText>{error?.message ?? ""}</FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};
