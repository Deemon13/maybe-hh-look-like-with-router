import LogoIcon from "../../../app/assets/logo/logo.png";

import styles from "./Logo.module.css";

export const Logo = () => {
  return (
    <div className={styles["logo__container"]}>
      <img
        className={styles["logo__icon"]}
        src={LogoIcon}
        alt="logo-icon"
        width={30}
        height={30}
      />
      <h1 className={styles["logo__title"]}>.FrontEnd</h1>
    </div>
  );
};
