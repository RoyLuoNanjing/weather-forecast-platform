import {
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Typography,
} from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import { ReactNode } from "react";
import { Control, Controller } from "react-hook-form";
import { FieldInfoIconWithTooltip } from "./fieldInfoIcon";

export interface IFormCheckboxField {
  name: string;
  label: string;
  helpText?: string | ReactNode;
  description?: string | ReactNode;
  control: Control<any>;
  optionArr: { value: number | string; label: string | ReactNode }[];
  fieldContainerStyle?: SxProps;
}
export const FormCheckboxField = (props: IFormCheckboxField) => {
  const {
    name,
    helpText,
    description,
    label,
    control,
    optionArr,
    fieldContainerStyle,
  } = props;

  return (
    <Grid role="group" padding={0} aria-labelledby="checkbox-group">
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          return (
            <FormControl
              error={Boolean(error)}
              sx={{ mb: 2, ...fieldContainerStyle }}
            >
              {label && (
                <FormLabel sx={{ marginTop: 1 }}>
                  <Typography level="title-md">
                    <span style={{ marginRight: 10 }}>{label}</span>
                    {helpText && (
                      <FieldInfoIconWithTooltip tooltipText={helpText} />
                    )}
                  </Typography>
                </FormLabel>
              )}
              <Grid container>
                {optionArr.map((checkboxOption) => {
                  return (
                    <Checkbox
                      {...field}
                      onChange={field.onChange}
                      checked={field.value.toString() === "true"}
                      value={field.value.toString()}
                      key={checkboxOption.value.toString()}
                      label={checkboxOption.label}
                      variant="outlined"
                    />
                  );
                })}
              </Grid>
              {description && <FormHelperText>{description}</FormHelperText>}
              <FormHelperText>{error?.message ?? ""}</FormHelperText>
            </FormControl>
          );
        }}
      />
    </Grid>
  );
};
