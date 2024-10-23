import type { NextRequest, NextResponse } from "next/server";
import { getWeatherForecastDataController } from "./controller";

export const revalidate = 0;

export async function GET(req: NextRequest, res: NextResponse) {
  return await getWeatherForecastDataController(req, res);
}
