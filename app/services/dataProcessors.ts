export function processTomorrowData(data: any) {
  // 处理 tomorrow 系统的返回数据
  return {
    temperature: data.temp,
    condition: data.condition,
    forecastDays: data.forecast_days,
  };
}

export function processWeatherApiData(data: any) {
  // 处理 weatherApi 系统的返回数据
  return {
    temperature: data.current.temp_c,
    condition: data.current.condition.text,
    forecastDays: data.forecast.forecastday.length,
  };
}

export function processOpenMeteoData(data: any) {
  // 处理 openMeteo 系统的返回数据
  return {
    temperature: data.temperature,
    condition: data.weather_condition,
    forecastDays: data.days,
  };
}
