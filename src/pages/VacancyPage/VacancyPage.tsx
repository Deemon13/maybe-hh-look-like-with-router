import { useParams } from "react-router-dom";

import { useTypedSelector } from "../../app/redux/hooks/redux";

import { VacancyCard } from "../../shared";

import NoLogo from "../../app/assets/no-logo-company/no-logo.jpg";

import styles from "./VacancyPage.module.css";

const getStrongText = (str: string | null | undefined) => {
  if (!str) {
    return;
  }

  const arrFromStr = str.split(" ");
  const newArr = [];

  for (const word of arrFromStr) {
    if (word.includes("highlighttext")) {
      newArr.push(word.replaceAll("highlighttext", "strong"));
    } else {
      newArr.push(word);
    }
  }

  return newArr.join(" ");
};

export const VacancyPage = () => {
  const { id } = useParams();

  const vacancies = useTypedSelector(
    (state) => state.vacanciesReducer.vacancies
  );

  const errorVacancy = "Отсутствуют данные";

  const vacancy = vacancies.find((item) => item.id === id);

  const markupReq = (
    <div
      dangerouslySetInnerHTML={{
        __html: getStrongText(vacancy?.snippet?.requirement) || "",
      }}
    ></div>
  );

  const markupResp = (
    <div
      dangerouslySetInnerHTML={{
        __html: getStrongText(vacancy?.snippet?.responsibility) || "",
      }}
    ></div>
  );

  const logoUrl = vacancy?.employer?.logo_urls?.original;

  return (
    <div className={styles["vacancy-page__container"]}>
      {vacancy ? <VacancyCard item={vacancy} isSingle={true} /> : errorVacancy}
      <div className={styles["vacancy-page__vacancy-snippet"]}>
        <div>
          <img
            src={logoUrl ? logoUrl : NoLogo}
            alt="company-logo"
            width={90}
            height={90}
          />
        </div>
        <div>Компания: {vacancy ? vacancy?.employer?.name : errorVacancy} </div>
        <div>Требования: {vacancy ? markupReq : errorVacancy}</div>
        <div>
          Чем предстоит заниматься: {vacancy ? markupResp : errorVacancy}
        </div>
      </div>
    </div>
  );
};
