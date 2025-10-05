import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import {
  useTypedDispatch,
  useTypedSelector,
} from "../../app/redux/hooks/redux";

import { fetchVacancies } from "../../app/redux/reducers/VacanciesThunk";

import { selectArea } from "../../app/redux/reducers/vacanciesSlice";

import { VacanciesList, LoaderUI, NoResults } from "../../shared";

import { SearchBar, SkillBox, AreaSelect, PaginationUI } from "../../widgets";

import styles from "./Vacancies.module.css";

export const Vacancies = () => {
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

  const params: {
    skills?: string;
    city?: string;
    keywords?: string;
  } = {};

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
        params.city = "Все города";
        break;
    }
  }

  if (searchText) {
    params.keywords = searchText;
  }

  useEffect(() => {
    const city = searchParams.get("city");
    dispatch(selectArea(city));

    // skills=TypeScript+AND+React+AND+Redux
  }, [dispatch, searchParams]);

  useEffect(() => {
    setSearchParams(params);
    const searchSkills = skills.join(" AND ");
    const searchQuery = searchText
      ? `${searchText} AND ${searchSkills}`
      : `${searchSkills}`;
    dispatch(
      fetchVacancies({
        page: currentPage,
        text: searchQuery,
        area: params.city ? getArea(params.city) : currentArea,
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
