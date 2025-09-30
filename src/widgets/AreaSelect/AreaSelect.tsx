import { useState } from "react";
import { Select } from "@mantine/core";

import {
  useTypedDispatch,
  useTypedSelector,
} from "../../app/redux/hooks/redux";

import { selectArea } from "../../app/redux/reducers/vacanciesSlice";

import MapPin from "../../app/assets/main/map-pin.svg";

import styles from "./AreaSelect.module.css";

export const AreaSelect = () => {
  const dispatch = useTypedDispatch();

  const currentArea = useTypedSelector(
    (state) => state.vacanciesReducer.currentArea
  );

  const [areaInput, setAreaInput] = useState(currentArea);

  const handleSelectArea = (evt: string | null) => {
    dispatch(selectArea(evt));
    setAreaInput(evt);
  };

  const mapPin = <img src={MapPin} alt="map-pin-icon" />;

  return (
    <div className={styles["area-select__container"]}>
      <Select
        data={["Все города", "Москва", "Санкт-Петербург"]}
        leftSectionPointerEvents="none"
        leftSection={mapPin}
        value={areaInput}
        onOptionSubmit={handleSelectArea}
        onClear={() => handleSelectArea(null)}
        placeholder="Все города"
        clearable
      />
    </div>
  );
};
