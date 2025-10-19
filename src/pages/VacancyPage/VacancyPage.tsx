import { useLocation } from "react-router-dom";

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
  const location = useLocation();

  const errorVacancy = "Отсутствуют данные";

  const vacancy = location.state;

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
        <div className={styles["vacancy-page__logo-container"]}>
          <img
            src={logoUrl ? logoUrl : NoLogo}
            alt="company-logo"
            className={styles["vacancy-page__logo-img"]}
            width={90}
            height={90}
          />
        </div>
        <div className={styles["vacancy-page__snippet-container"]}>
          <span
            className={`${styles["vacancy-page__snippet-title"]} ${styles["vacancy-page__snippet-title--company"]}`}
          >
            Компания:
          </span>{" "}
          {vacancy ? vacancy?.employer?.name : errorVacancy}{" "}
        </div>
        <div className={styles["vacancy-page__snippet-container"]}>
          <span className={styles["vacancy-page__snippet-title"]}>
            Требования:
          </span>{" "}
          {vacancy ? markupReq : errorVacancy}
        </div>
        <div className={styles["vacancy-page__snippet-container"]}>
          <span className={styles["vacancy-page__snippet-title"]}>
            Чем предстоит заниматься:
          </span>{" "}
          {vacancy ? markupResp : errorVacancy}
        </div>
      </div>
    </div>
  );
};
