import { weatherSourcesConfigList } from "@/app/lib/config";
import { joyTheme } from "@/app/lib/theme";
import { IWeatherSources } from "@/types";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormLabel, Radio, radioClasses, RadioGroup, Sheet } from "@mui/joy";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  setSelectedValue: Dispatch<SetStateAction<IWeatherSources>>;
}
export const WeatherSources = (props: IProps) => {
  const { setSelectedValue } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSelectedValue(event.target.value as IWeatherSources);
  };

  return (
    <RadioGroup
      aria-label="platform"
      defaultValue={weatherSourcesConfigList[0]?.name}
      overlay
      name="platform"
      onChange={handleChange}
      sx={{
        flexDirection: "row",
        gap: 2,
        [`& .${radioClasses.checked}`]: {
          [`& .${radioClasses.action}`]: {
            inset: -1,
            border: "3px solid",
            borderColor: "primary.500",
          },
        },
        [`& .${radioClasses.radio}`]: {
          display: "contents",
          "& > svg": {
            zIndex: 2,
            position: "absolute",
            top: "-8px",
            right: "-8px",
            bgcolor: "background.surface",
            borderRadius: "50%",
          },
        },
      }}
    >
      {weatherSourcesConfigList.map((source) => (
        <Sheet
          key={source.name}
          variant="outlined"
          sx={{
            borderRadius: "md",

            boxShadow: "sm",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
            p: 2,
            minWidth: 120,
          }}
        >
          <Radio
            id={source.name}
            value={source.name}
            checkedIcon={
              <FontAwesomeIcon
                icon={faCircleCheck}
                fontSize={joyTheme.fontSize.sm}
              />
            }
          />
          <FormLabel htmlFor={source.name}>{source.label}</FormLabel>
        </Sheet>
      ))}
    </RadioGroup>
  );
};
