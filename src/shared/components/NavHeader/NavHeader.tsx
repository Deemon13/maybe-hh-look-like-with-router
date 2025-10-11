import { Link } from "react-router-dom";

import styles from "./NavHeader.module.css";

export const NavHeader = () => {
  return (
    <nav className={styles["nav-menu"]}>
      <ul className={styles["nav-menu__list"]}>
        <li className={styles["nav-menu__item"]}>
          <Link
            to="/vacancies"
            className={`${styles["nav-menu__link"]} ${styles["nav-menu__link--active"]}`}
          >
            Вакансии FE
          </Link>
        </li>
        <li className={styles["nav-menu__item"]}>
          <a
            href="#"
            className={`${styles["nav-menu__link"]} ${styles["nav-menu__link--about-me"]}`}
          >
            Обо мне
          </a>
        </li>
      </ul>
    </nav>
  );
};
