import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import {
  useTypedDispatch,
  useTypedSelector,
} from "../../app/redux/hooks/redux";

import { fetchVacancies } from "../../app/redux/reducers/VacanciesThunk";

import { VacanciesList, LoaderUI, NoResults } from "../../shared";

import { SearchBar, SkillBox, AreaSelect, PaginationUI } from "../../widgets";

import styles from "./Vacancies.module.css";

// interface ParamsType extends URLSearchParamsInit {
//   skills?: string;
//   city?: string;
//   keywords?: string;
// }

export const Vacancies = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useTypedDispatch();
  const vacancies = useTypedSelector(
    (state) => state.vacanciesReducer.vacancies
  );

  const status = useTypedSelector((state) => state.vacanciesReducer.status);

  const currentPage = useTypedSelector(
    (state) => state.vacanciesReducer.currentPage
  );
  const currentArea = useTypedSelector(
    (state) => state.vacanciesReducer.currentArea
  );
  const searchText = useTypedSelector(
    (state) => state.vacanciesReducer.searchText
  );
  const skills = useTypedSelector((state) => state.vacanciesReducer.skill_set);

  // const params = { skills: "", city: "", keywords: "" };
  const params: {
    skills?: string;
    city?: string;
    keywords?: string;
  } = {};

  if (skills.length > 0) {
    params.skills = skills.join(" AND ");
  } else {
    delete params.skills;
  }

  if (currentArea) {
    switch (currentArea) {
      case "1":
        params.city = "Москва";
        break;
      case "2":
        params.city = "Санкт-Петербург";
        break;
      default:
        params.city = "";
        break;
    }
  }

  if (searchText) {
    params.keywords = searchText;
  }

  useEffect(() => {
    const searchSkills = skills.join(" AND ");
    const searchParams = searchText
      ? `${searchText} AND ${searchSkills}`
      : `${searchSkills}`;

    setSearchParams(params);

    dispatch(
      fetchVacancies({
        page: currentPage,
        text: searchParams,
        area: currentArea,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentArea, currentPage, dispatch, searchText, skills]);

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
