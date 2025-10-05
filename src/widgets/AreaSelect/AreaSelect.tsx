import { useSearchParams } from "react-router-dom";
import { Select } from "@mantine/core";

import { useTypedDispatch } from "../../app/redux/hooks/redux";

import { selectArea } from "../../app/redux/reducers/vacanciesSlice";

import MapPin from "../../app/assets/main/map-pin.svg";

import styles from "./AreaSelect.module.css";

export const AreaSelect = () => {
  const [searchParams] = useSearchParams();

  const dispatch = useTypedDispatch();

  const city = searchParams.get("city") || null;

  const handleSelectArea = (evt: string | null) => {
    dispatch(selectArea(evt));
  };

  const mapPin = <img src={MapPin} alt="map-pin-icon" />;

  return (
    <div className={styles["area-select__container"]}>
      <Select
        data={["Все города", "Москва", "Санкт-Петербург"]}
        leftSectionPointerEvents="none"
        leftSection={mapPin}
        value={city}
        onOptionSubmit={handleSelectArea}
        onClear={() => handleSelectArea(null)}
        placeholder="Все города"
        clearable
      />
    </div>
  );
};
