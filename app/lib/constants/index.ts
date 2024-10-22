import { Libraries } from "@react-google-maps/api";

export const googleMapApiKey =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export const libraries = ["places"] as Libraries;
