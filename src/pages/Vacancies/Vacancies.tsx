import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import {
  useTypedDispatch,
  useTypedSelector,
} from "../../app/redux/hooks/redux";
import { fetchVacancies } from "../../app/redux/reducers/VacanciesThunk";
import {
  addSkill,
  inputSearchText,
  selectArea,
  setCurrentPage,
} from "../../app/redux/reducers/vacanciesSlice";
import { VacanciesList, LoaderUI, NoResults } from "../../shared";
import { SearchBar, SkillBox, AreaSelect, PaginationUI } from "../../widgets";

import styles from "./Vacancies.module.css";

export const Vacancies = () => {
  const [searchParams] = useSearchParams();

  const dispatch = useTypedDispatch();

  const vacancies = useTypedSelector(
    (state) => state.vacanciesReducer.vacancies
  );

  const status = useTypedSelector((state) => state.vacanciesReducer.status);

  function getArea(cityUrl: string | null) {
    switch (cityUrl) {
      case "Москва":
        return "1";
      case "Санкт-Петербург":
        return "2";
      default:
        return null;
    }
  }

  useEffect(() => {
    const city = searchParams.get("area");
    const areaFromCity = city ? getArea(city) : null;
    const searchSkills = searchParams.get("skills") || "";
    const skillSet = searchSkills?.split(" AND ") || [];
    const pageParam = searchParams.get("page");
    const searchTextKeyword = searchParams.get("keyword") || "";

    dispatch(selectArea(city));
    if (searchSkills) {
      skillSet.forEach((skill) => dispatch(addSkill(skill)));
    }
    dispatch(setCurrentPage(Number(pageParam)));
    dispatch(inputSearchText(searchTextKeyword));

    const searchQuery = searchTextKeyword
      ? `${searchTextKeyword} AND ${searchSkills}`
      : `${searchSkills}`;

    dispatch(
      fetchVacancies({
        page: Number(pageParam),
        text: searchQuery,
        area: areaFromCity,
      })
    );
  }, [dispatch, searchParams]);

  return (
    <>
      <SearchBar />
      <div className={styles.vacancies}>
        <div className={styles["search-params"]}>
          <SkillBox />

          <AreaSelect />
        </div>

        {status ? (
          <LoaderUI />
        ) : vacancies.length === 0 ? (
          <NoResults />
        ) : (
          <div className={styles["vacancies-field"]}>
            <VacanciesList items={vacancies} />

            <PaginationUI />
          </div>
        )}
      </div>
    </>
  );
};
