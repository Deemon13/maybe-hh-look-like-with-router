import { Loader } from "@mantine/core";

import styles from "./LoaderUI.module.css";

export const LoaderUI = () => {
  return (
    <div className={styles["loader-container"]}>
      <Loader color="indigo" size="xl" type="dots" />
    </div>
  );
};
