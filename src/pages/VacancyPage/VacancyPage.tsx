import styles from "./VacancyPage.module.css";

export const VacancyPage = () => {
  return (
    <div className={styles["vacancy-page__container"]}>
      <div className={styles["vacancy-page__vacancy-card"]}>Vacancy Card</div>
      <div className={styles["vacancy-page__vacancy-snippet"]}>
        <p>Компания</p>
        <p>О проекте:</p>
      </div>
    </div>
  );
};
