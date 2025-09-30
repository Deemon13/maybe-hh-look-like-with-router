import styles from "./NoResults.module.css";

export const NoResults = () => {
  return (
    <div className={styles["no-results__container"]}>
      По Вашему запросу ничего не найдено!
    </div>
  );
};
