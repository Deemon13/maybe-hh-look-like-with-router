import { useEffect } from "react";

import {
  useTypedDispatch,
  useTypedSelector,
} from "../../app/redux/hooks/redux";

import { fetchVacancies } from "../../app/redux/reducers/VacanciesThunk";

import { VacanciesList, LoaderUI, NoResults } from "../../shared";

import { SearchBar, SkillBox, AreaSelect, PaginationUI } from "../../widgets";

import styles from "./Vacancies.module.css";

export const Vacancies = () => {
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

  useEffect(() => {
    const searchSkills = skills.join(" AND ");
    const searchParams = searchText
      ? `${searchText} AND ${searchSkills}`
      : `${searchSkills}`;

    dispatch(
      fetchVacancies({
        page: currentPage,
        text: searchParams,
        area: currentArea,
      })
    );
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
