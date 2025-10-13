import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import {
  useTypedDispatch,
  useTypedSelector,
} from "../../app/redux/hooks/redux";

import { fetchVacancies } from "../../app/redux/reducers/VacanciesThunk";

import {
  addSkill,
  // inputSearchText,
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

  // const currentPage = useTypedSelector(
  //   (state) => state.vacanciesReducer.currentPage
  // );
  // const currentArea = useTypedSelector(
  //   (state) => state.vacanciesReducer.currentArea
  // );

  const searchText = useTypedSelector(
    (state) => state.vacanciesReducer.searchText
  );
  // const skills = useTypedSelector((state) => state.vacanciesReducer.skill_set);

  // const params: {
  //   skills?: string;
  //   city?: string;
  //   keywords?: string;
  // } = {};

  // useEffect(() => {
  // const cityParam = searchParams.get("city") || "Все города";
  // const skillsParam = searchParams.get("skills")?.split(" AND ") || [];
  // const searchKeywordParam = searchParams.get("keywords") || "";
  // }, [searchParams]);

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

  // if (skills.length > 0) {
  //   params.skills = skills.join(" AND ");
  // } else {
  //   delete params.skills;
  // }

  // switch (currentArea) {
  //   case "1":
  //     params.city = "Москва";
  //     break;
  //   case "2":
  //     params.city = "Санкт-Петербург";
  //     break;
  //   default:
  //     break;
  // }

  // if (searchText) {
  //   params.keywords = searchText;
  // }

  // useEffect(() => {
  //   dispatch(selectArea(cityParam));
  //   skillsParam.forEach((skill) => dispatch(addSkill(skill)));
  //   dispatch(inputSearchText(searchKeywordParam));

  // }, [cityParam, searchKeywordParam, dispatch]);

  // const searchSkills = skills.join(" AND ");
  // const searchQuery = searchText
  //   ? `${searchText} AND ${searchSkills}`
  //   : `${searchSkills}`;

  useEffect(() => {
    const city = searchParams.get("area");
    const areaFromCity = city ? getArea(city) : null;
    const searchSkills = searchParams.get("skills") || "";
    const skillSet = searchSkills?.split(" AND ") || [];
    const pageParam = searchParams.get("page");

    dispatch(selectArea(city));
    if (searchSkills) {
      skillSet.forEach((skill) => dispatch(addSkill(skill)));
    }
    dispatch(setCurrentPage(Number(pageParam)));

    const searchQuery = searchText
      ? `${searchText} AND ${searchSkills}`
      : `${searchSkills}`; // ''

    // console.log("searchText", searchText);
    // console.log("searchSkills", searchSkills);
    // console.log("skillSet", skillSet);
    // console.log("searchQuery", searchQuery);

    dispatch(
      fetchVacancies({
        page: Number(pageParam),
        text: searchQuery,
        area: areaFromCity,
      })
    );
  }, [dispatch, searchParams, searchText]);

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
