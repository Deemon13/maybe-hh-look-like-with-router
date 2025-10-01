import { useParams } from "react-router-dom";

import styles from "./VacancyPage.module.css";

export const VacancyPage = () => {
  const { id } = useParams();

  return (
    <div className={styles["vacancy-page__container"]}>
      <div className={styles["vacancy-page__vacancy-card"]}>Vacancy Card</div>
      <div className={styles["vacancy-page__vacancy-snippet"]}>
        {id}
        <p>Компания</p>
        <p>О проекте:</p>
      </div>
    </div>
  );
};
