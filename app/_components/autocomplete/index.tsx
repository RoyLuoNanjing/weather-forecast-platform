import { googleMapApiKey, libraries } from "@/app/lib/constants";
import { joyTheme } from "@/app/lib/theme";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormControl, FormLabel, IconButton, Input } from "@mui/joy";
import {
  Autocomplete,
  useLoadScript,
  GoogleMap,
  Marker,
} from "@react-google-maps/api";
import { useState } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};
const center = {
  lat: 37.4221,
  lng: -122.0841,
};

export const MapWithAutocomplete = () => {
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapApiKey,
    libraries,
  });

  const [searchResult, setSearchResult] =
    useState<google.maps.places.Autocomplete | null>();

  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [mapCenter, setMapCenter] = useState(center);

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        console.log(place);
        setSelectedPlace(place);
        setMapCenter({
          lat: place.geometry.location?.lat() || 0,
          lng: place.geometry.location?.lng() || 0,
        });
      }
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div>
      <Autocomplete
        onPlaceChanged={onPlaceChanged}
        onLoad={onLoad}
        options={{ componentRestrictions: { country: "uk" } }}
      >
        <FormControl>
          <FormLabel>Search address</FormLabel>
          <Input
            type="text"
            placeholder="e.g. 141 mountain view..."
            size="md"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              //setIsFormSaved(false);
            }}
            endDecorator={
              <IconButton
                onClick={() => {
                  clearSuggestions();
                  setValue("");
                }}
                disabled={!value}
                sx={{ opacity: value ? 1 : 0.5 }}
              >
                <FontAwesomeIcon
                  icon={faXmarkCircle}
                  fontSize={joyTheme.fontSize.sm}
                  color={joyTheme.palette.neutral[400]}
                />
              </IconButton>
            }
            sx={[{ minWidth: 400 }]}
          />
        </FormControl>
      </Autocomplete>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={mapCenter}
      >
        {selectedPlace &&
          selectedPlace.geometry &&
          selectedPlace.geometry.location && (
            <Marker
              position={{
                lat: selectedPlace.geometry.location.lat(),
                lng: selectedPlace.geometry.location.lng(),
              }}
            />
          )}
      </GoogleMap>
    </div>
  );
};
