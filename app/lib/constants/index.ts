import { Libraries } from "@react-google-maps/api";

export const googleMapApiKey =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export const tomorrowWeatherApiKey =
  process.env.NEXT_PUBLIC_TOMORROW_API_KEY || "";

export const weatherApiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY || "";

export const libraries = ["places"] as Libraries;

export const appClientBaseUrl = {
  local: "http://localhost:3001",
};
