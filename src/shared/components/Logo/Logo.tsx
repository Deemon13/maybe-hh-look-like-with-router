import { Link } from "react-router-dom";

import LogoIcon from "../../../app/assets/logo/logo.png";

import styles from "./Logo.module.css";

export const Logo = () => {
  return (
    <Link to="/vacancies" className={styles["logo__link"]}>
      <img
        className={styles["logo__icon"]}
        src={LogoIcon}
        alt="logo-icon"
        width={30}
        height={30}
      />
      <h1 className={styles["logo__title"]}>.FrontEnd</h1>
    </Link>
  );
};
