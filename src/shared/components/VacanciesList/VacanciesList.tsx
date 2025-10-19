import type { VacanciesType } from "../../../app/redux/reducers/vacanciesSlice";
import { VacancyCard } from "../../../shared";

import styles from "./VacanciesList.module.css";
interface ItemsProps {
  items: VacanciesType[];
}

export const VacanciesList = ({ items }: ItemsProps) => {
  return (
    <ul className={styles["vacancies-list"]}>
      {items.map((item) => {
        return <VacancyCard key={item.id} item={item} isSingle={false} />;
      })}
    </ul>
  );
};
