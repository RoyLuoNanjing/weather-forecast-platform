import {
	FormControl,
	FormHelperText,
	FormLabel,
	Typography,
	Slider,
} from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import { ReactNode } from "react";
import { Control, Controller } from "react-hook-form";
import { FieldInfoIconWithTooltip } from "./fieldInfoIcon";

export interface IFormSliderField {
	name: string;
	label: string;
	description?: string;
	helpText?: string | ReactNode;
	min: number;
	max: number;
	step?: number;
	control: Control<any>;
	marks?: boolean | { value: number; label: string }[];
	isDisabled?: boolean;
	isRequired?: boolean;
	isHidden?: boolean;
	handleOnChange?: (
		event: Event,
		value: number | number[],
		activeThumb: number,
	) => void;
	fieldContainerStyle?: SxProps;
	inputFieldStyle?: SxProps;
}

export const FormSliderField = (props: IFormSliderField) => {
	const {
		name,
		label,
		description,
		helpText,
		min,
		max,
		step,
		control,
		marks,
		isDisabled,
		isHidden,
		handleOnChange,
		fieldContainerStyle,
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
					<FormControl
						id={name}
						error={Boolean(error)}
						sx={{ mb: 2, ...fieldContainerStyle }}
					>
						{label && (
							<FormLabel sx={{ marginTop: 1 }}>
								<Typography level="body-md" mr={1}>
									{label}
								</Typography>

								{helpText && <FieldInfoIconWithTooltip tooltipText={helpText} />}
							</FormLabel>
						)}
						<FormHelperText sx={{ mb: 1.5, whiteSpace: "pre-line" }}>
							{description}
						</FormHelperText>
						<Slider
							valueLabelDisplay="on"
							step={step || 1}
							size="md"
							min={min || 0}
							max={max || 100}
							marks={marks}
							value={value}
							onChange={(event, value, activeThumb) => {
								onChange(event, value, activeThumb);
								handleOnChange && handleOnChange(event, value, activeThumb);
							}}
							onBlur={onBlur}
							disabled={isDisabled}
							sx={inputFieldStyle}
						/>
						<FormHelperText>{error?.message ?? ""}</FormHelperText>
					</FormControl>
				);
			}}
		/>
	);
};
