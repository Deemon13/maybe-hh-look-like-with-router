import { Link } from "react-router-dom";
import { Badge } from "@mantine/core";

import { useTypedSelector } from "../../../app/redux/hooks/redux";
import type { VacanciesType } from "../../../app/redux/reducers/vacanciesSlice";

import styles from "./VacancyCard.module.css";

interface VacancyCardProps {
  item: VacanciesType;
  isSingle: boolean;
}

const getSalary = (
  data: {
    from: number | null;
    to: number | null;
    currency: string | null;
  } | null
) => {
  if (!data) {
    return null;
  }

  let salary = "";

  if (data.from === data.to || !data.from) {
    salary = `${data.to} ${data.currency}`;
  } else if (!data.to) {
    salary = `От ${data.from} ${data.currency}`;
  } else {
    salary = `${data.from} - ${data.to} ${data.currency}`;
  }

  return (
    <div className={styles["vacancy-card__salary-container"]}>{salary}</div>
  );
};

const getExperience = (data: { id: string | null } | null) => {
  if (!data) {
    return null;
  }

  let experience = "";

  switch (data.id) {
    case "noExperience":
      experience = "Без опыта";
      break;
    case "between1And3":
      experience = "Опыт 1-3 года";
      break;
    case "between3And6":
      experience = "Опыт 3-6 лет";
      break;
    case "moreThan6":
      experience = "Опыт более 6 лет";
      break;

    default:
      break;
  }

  return <p className={styles["vacancy-card__experience"]}>{experience}</p>;
};

const getWorkFormat = (data: [{ id: string | null }] | [] | null) => {
  if (data?.length === 0 || !data) {
    return null;
  }

  let workFormat = "";
  let color = "";

  return data.map((item) => {
    switch (item.id) {
      case "ON_SITE":
        workFormat = "Офис";
        color = "rgba(15, 15, 16, 0.5)";
        break;
      case "REMOTE":
        workFormat = "Можно удалённо";
        color = "#4263eb";
        break;
      case "FIELD_WORK":
        workFormat = "Разъездной";
        color = "rgba(15, 15, 16, 0.2)";
        break;
      case "HYBRID":
        workFormat = "Гибрид";
        color = "#0f0f10";
        break;

      default:
        break;
    }

    return (
      <Badge radius={2} color={color} key={item.id}>
        {workFormat}
      </Badge>
    );
  });
};

const getArea = (
  data: string | null,
  currentArea: string | null,
  singlePage: boolean
) => {
  if (!data) {
    return null;
  }

  if (
    ((data === "Москва" && currentArea === "1") ||
      (data === "Санкт-Петербург" && currentArea === "2")) &&
    !singlePage
  ) {
    return null;
  }

  return <p className={styles["vacancy-card__area"]}>{data}</p>;
};

const openVacancyInNewTab = (id: string) => {
  window.open(`https://hh.ru/vacancy/${id}`, "_blanc", "noopener, noreferrer");
};

export const VacancyCard = ({ item, isSingle = false }: VacancyCardProps) => {
  const currentArea = useTypedSelector(
    (state) => state.vacanciesReducer.currentArea
  );

  return (
    <li className={styles["vacancy-card__item"]}>
      {item.name && (
        <h2 className={styles["vacancy-card__title"]}>{item.name}</h2>
      )}

      {(item.salary || item.experience) && (
        <div className={styles["vacancy-card__salary-currency-experience"]}>
          {getSalary(item.salary)}
          {getExperience(item.experience)}
        </div>
      )}

      {item.employer?.name && (
        <p className={styles["vacancy-card__employer"]}>{item.employer.name}</p>
      )}

      {item.work_format && (
        <div className={styles["vacancy-card__work-format"]}>
          {getWorkFormat(item.work_format)}
        </div>
      )}

      {item.area && getArea(item.area.name, currentArea, isSingle)}

      <div className={styles["vacancy-card__actions"]}>
        {!isSingle && (
          <Link
            to={item.id}
            type="button"
            className={styles["vacancy-card__action--showme"]}
            state={item}
          >
            Смотреть вакансию
          </Link>
        )}

        {isSingle ? (
          <a
            href={item.alternate_url}
            className={styles["vacancy-card__action--showme"]}
            target="_blanc"
            rel="noopener noreferrer"
          >
            Откликнуться на hh.ru
          </a>
        ) : (
          <button
            type="button"
            className={styles["vacancy-card__action--respond"]}
            onClick={() => openVacancyInNewTab(item.id)}
          >
            Откликнуться
          </button>
        )}
      </div>
    </li>
  );
};
