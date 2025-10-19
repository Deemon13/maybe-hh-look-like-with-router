import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Title, Button, Group, TextInput } from "@mantine/core";

import {
  useTypedDispatch,
  useTypedSelector,
} from "../../app/redux/hooks/redux";
import {
  setCurrentPage,
  inputSearchText,
} from "../../app/redux/reducers/vacanciesSlice";
import SearchIcon from "../../app/assets/search-bar/search.svg";

import styles from "./SearchBar.module.css";

export const SearchBar = () => {
  const [, setSearchParams] = useSearchParams();

  const dispatch = useTypedDispatch();

  const inputSearchValue = useTypedSelector(
    (state) => state.vacanciesReducer.searchText
  );

  const [searchInput, setSearchInput] = useState(inputSearchValue);

  useEffect(() => {
    setSearchInput(inputSearchValue);
  }, [inputSearchValue]);

  const handleClickOnSearch = () => {
    dispatch(inputSearchText(searchInput));
    setSearchParams((searchParams) => {
      if (!searchInput) {
        searchParams.delete("keyword");
      } else {
        searchParams.set("keyword", searchInput);
      }

      searchParams.set("page", String(1));
      return searchParams;
    });
    dispatch(setCurrentPage(1));
  };

  const searchIcon = <img src={SearchIcon} alt="search-icon" />;

  return (
    <div className={styles["searchbar__container"]}>
      <div className={styles["searchbar__wrapper"]}>
        <Title className={styles["searchbar__title"]}>
          <span className={styles["searchbar__title--main"]}>
            Список вакансий
          </span>
          <span className={styles["searchbar__title--secondary"]}>
            по профессии Frontend-разработчик
          </span>
        </Title>
        <Group>
          <TextInput
            className={styles["searchbar__input"]}
            leftSectionPointerEvents="none"
            leftSection={searchIcon}
            placeholder="Должность или название компании"
            value={searchInput}
            onChange={(evt) => setSearchInput(evt.currentTarget.value)}
          />
          <Button
            className={styles["searchbar__btn"]}
            onClick={handleClickOnSearch}
          >
            Найти
          </Button>
        </Group>
      </div>
    </div>
  );
};
