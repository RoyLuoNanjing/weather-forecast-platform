"use client";
import { Card, CardContent, CardOverflow } from "@mui/joy";
import { WeatherForecastForm } from "./_components/form";
import { WeatherSources } from "./_components/weatherSources";
import { useState } from "react";
import { weatherSourcesConfigList } from "./lib/config";
import { IWeatherSources } from "@/types";
import { MapWithAutocomplete } from "./_components/autocomplete";

export default function Home() {
  const [selectedWeatherSource, setSelectedWeatherSource] =
    useState<IWeatherSources>(weatherSourcesConfigList[0].name);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        size="lg"
        variant="plain"
        orientation="horizontal"
        sx={{
          textAlign: "center",
          maxWidth: "100%",
          width: 1000,
          resize: "horizontal",
          overflow: "auto",
        }}
      >
        <CardOverflow
          variant="solid"
          color="primary"
          sx={{
            flex: "0 0 200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: "var(--Card-padding)",
          }}
        >
          <CardContent>
            <MapWithAutocomplete />
          </CardContent>
        </CardOverflow>
        <CardContent sx={{ gap: 1.5, minWidth: 200 }}>
          <WeatherSources setSelectedValue={setSelectedWeatherSource} />
          <WeatherForecastForm selectedWeatherSource={selectedWeatherSource} />
        </CardContent>
      </Card>
    </div>
  );
}
