import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@mui/joy";
import { ReactNode } from "react";

export interface IFieldIconWithTooltip {
	tooltipText: ReactNode;
}
export const FieldInfoIconWithTooltip = (props: IFieldIconWithTooltip) => {
	return (
		<Tooltip title={props.tooltipText}>
			<FontAwesomeIcon
				size="lg"
				icon={faCircleInfo}
				color={"var(--joy-palette-neutral-500)"}
			/>
		</Tooltip>
	);
};
