"use client";
import { Card, CardContent, CardOverflow } from "@mui/joy";
import { WeatherForecastForm } from "./_components/form";

export default function Home() {
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
          width: 500,
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
          <CardContent>Form</CardContent>
        </CardOverflow>
        <CardContent sx={{ gap: 1.5, minWidth: 200 }}>
          <WeatherForecastForm />
        </CardContent>
      </Card>
    </div>
  );
}
