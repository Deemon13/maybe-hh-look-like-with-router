import { useSearchParams } from "react-router-dom";
import { Select } from "@mantine/core";

import {
  useTypedDispatch,
  useTypedSelector,
} from "../../app/redux/hooks/redux";
import {
  selectArea,
  setCurrentPage,
} from "../../app/redux/reducers/vacanciesSlice";
import MapPin from "../../app/assets/main/map-pin.svg";

import styles from "./AreaSelect.module.css";

const getCity = (area: string | null) => {
  switch (area) {
    case "1":
      return "Москва";
    case "2":
      return "Санкт-Петербург";
    default:
      return null;
  }
};

export const AreaSelect = () => {
  const [, setSearchParams] = useSearchParams();

  const dispatch = useTypedDispatch();

  const city = getCity(
    useTypedSelector((state) => state.vacanciesReducer.currentArea)
  );

  const handleSelectArea = (evt: string | null) => {
    dispatch(selectArea(evt));
    const newArea = evt;
    setSearchParams((searchParams) => {
      if (!newArea || evt === "Все города") {
        searchParams.delete("area");
      } else {
        searchParams.set("area", newArea);
      }

      searchParams.set("page", String(1));
      return searchParams;
    });

    dispatch(setCurrentPage(1));
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
