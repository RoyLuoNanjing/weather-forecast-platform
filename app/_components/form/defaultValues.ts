export const useWeatherParamsDefaultValues = () => {
  const designLoadEssentialDefaultValues: DesignEssentialFormFields = {
    connection: loadConnectionOptionsArr[0]!,
    residentialUnits: 0,
    annualConsumption: 0,
    heating: 0,
    cooling: 0,
    evs: 0,
    totalEnergyLoads: 0,
    isExistingAssets: false,
  };
  const designLoadExtraDefaultValues: DesignExtraFormFields = {
    dieselGenerator: 0,
    solarPanels: 0,
    wind: 0,
    wood: {
      value: 1,
      label: "Sticks",
    },
    nuclear: 0,
    hydro: 0,
    batteries: 0,
  };

  return {
    designLoadEssentialDefaultValues: designLoadEssentialDefaultValues,
    designLoadExtraDefaultValues: designLoadExtraDefaultValues,
  };
};
