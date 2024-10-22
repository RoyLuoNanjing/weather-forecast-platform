import { IconDefinition, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
} from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import { HTMLInputTypeAttribute, ReactNode, useState } from "react";
import { Control, Controller } from "react-hook-form";

export interface IFormTextField {
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
  name: string;
  label: string;
  description?: string;
  helpText?: string | ReactNode;
  startDecorator?: ReactNode;
  endDecorator?: ReactNode;
  control: Control<any>;
  isDisabled?: boolean;
  isRequired?: boolean;
  isHidden?: boolean;
  enableLock?: boolean;
  lockIcon?: IconDefinition;
  fieldContainerStyle?: SxProps;
  inputContainerStyle?: SxProps;
  inputFieldStyle?: SxProps;
}
export const FormTextField = (props: IFormTextField) => {
  const [isLocked, setIsLocked] = useState(props.enableLock);
  const {
    type,
    autoComplete,
    name,
    label,
    description,
    helpText,
    startDecorator,
    endDecorator,
    control,
    isDisabled,
    isRequired,
    isHidden,
    enableLock,
    lockIcon,
    inputContainerStyle,
    inputFieldStyle,
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
      }) => {
        if (isHidden) return <></>;

        return (
          <FormControl error={Boolean(error)} sx={{ mb: 2 }}>
            {label && <FormLabel>{label}</FormLabel>}
            {description && (
              <FormHelperText
                sx={{ mb: 1, whiteSpace: "pre-line", fontFamily: "inherit" }}
              >
                {description}
              </FormHelperText>
            )}

            <Input
              type={type}
              startDecorator={startDecorator}
              endDecorator={endDecorator}
              name={name}
              slotProps={{
                input: {
                  ref,
                  autoComplete: autoComplete,
                },
              }}
              value={type === "number" ? (value as number) : (value as string)}
              onChange={(e) => {
                const inputVal = e.target.value;
                let newValue;
                if (type === "number") {
                  if (inputVal === "") {
                    newValue = null;
                  } else {
                    newValue = Number(inputVal);
                    if (isNaN(newValue)) {
                      newValue = null;
                    }
                  }
                } else {
                  newValue = inputVal;
                }

                onChange(newValue);
              }}
              onBlur={onBlur}
              onKeyDown={(event) => {
                // Allow only numeric characters and a few control keys (e.g., Backspace, Delete)
                const allowedKeys = [
                  ".",
                  "0",
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "-",
                  "Backspace",
                  "Delete",
                  "ArrowLeft",
                  "ArrowRight",
                  "Home",
                  "End",
                ];

                if (type === "number" && !allowedKeys.includes(event.key)) {
                  event.preventDefault();
                }

                if (event.key === "Enter") {
                  event.preventDefault();
                }
              }}
              // disables scroll - https://github.com/mui/material-ui/issues/7960
              onWheel={(e) =>
                e.target instanceof HTMLElement && e.target.blur()
              }
              required={isRequired}
              disabled={isDisabled || isLocked}
              sx={{ fontFamily: "inherit", ...inputFieldStyle }}
            />
            {enableLock && (
              <IconButton
                color="neutral"
                variant="plain"
                disabled={!isLocked}
                onClick={() => setIsLocked(false)}
              >
                <FontAwesomeIcon icon={lockIcon || faLock} fontSize={"1rem"} />
              </IconButton>
            )}

            <FormHelperText>{error?.message ?? ""}</FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};
