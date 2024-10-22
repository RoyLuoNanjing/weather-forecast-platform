interface WeatherParams {
  location: string;
  days?: number;
}

export function tomorrowAdapter(params: WeatherParams) {
  // tomorrow 预报系统的参数适配
  return {
    query: params.location,
    forecast_days: params.days || 2, // 设置默认天数为2
  };
}

export function weatherApiAdapter(params: WeatherParams) {
  // weatherApi 预报系统的参数适配
  return {
    city: params.location,
    days: params.days || 3, // 默认天数为3
  };
}

export function openMeteoAdapter(params: WeatherParams) {
  // openMeteo 预报系统的参数适配
  return {
    area: params.location,
    period: params.days || 7, // 默认天数为7
  };
}
