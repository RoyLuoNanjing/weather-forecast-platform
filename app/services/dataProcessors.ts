import { IWeatherSources } from "@/types";

export function processWeatherData(
  source: IWeatherSources,
  data: any,
  param: any
) {
  switch (source) {
    case "tomorrow":
      return processTomorrowData(data);
    case "weatherApi":
      return processWeatherApiData(data, param);
    default:
      return processOpenMeteoData(data);
  }
}

export function processTomorrowData(data: any) {
  const targetDataArr = data.data.timelines[0].intervals;
  const header = ["timeStamp", "humidity", "temperature"];
  const dataArr = targetDataArr.map((interval: any) => {
    const timeStamp = interval.startTime;
    const humidity = interval.values.humidity;
    const temperature = interval.values.temperature;
    return [timeStamp, humidity, temperature];
  });
  dataArr.unshift(header);
  return dataArr;
}

export function processWeatherApiData(data: any, param: any) {
  const targetDataArr = data.forecast.forecastday;

  const daysData: any[][] = [];
  targetDataArr.forEach((day: any) => daysData.push(day.hour));

  const hoursData = daysData.flat();
  const header = ["timeStamp", "humidity", "temperature", "uv"];

  const temperatureUnits = param.get("units");
  const dataArr = hoursData.map((interval: any) => {
    const timeStamp = interval.time;
    const humidity = interval.humidity;
    const temperature =
      temperatureUnits === "celsius" ? interval.temp_c : interval.temp_f;
    const uv = interval.uv;
    return [timeStamp, humidity, temperature, uv];
  });
  dataArr.unshift(header);
  return dataArr;
}

export function processOpenMeteoData(data: any) {
  // 处理 openMeteo 系统的返回数据
  return {
    temperature: data.temperature,
    condition: data.weather_condition,
    forecastDays: data.days,
  };
}
