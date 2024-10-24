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

  //defined the header of the sheet
  const header = ["timeStamp", "humidity", "temperature"];
  //extract and format the data based on the schema of api response
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
  //defined the header of the sheet
  const header = ["timeStamp", "humidity", "temperature", "uv"];

  //extract and format the data based on the schema of api response
  const daysData: any[][] = [];
  targetDataArr.forEach((day: any) => daysData.push(day.hour));
  const hoursData = daysData.flat();
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
  const targetDataArr = data.hourly;
  const header = Object.keys(targetDataArr);
  const dataArr = [header];
  for (let i = 0; i < targetDataArr.time.length; i++) {
    const row = header.map((title) => targetDataArr[title][i]);
    dataArr.push(row);
  }

  return dataArr;
}
