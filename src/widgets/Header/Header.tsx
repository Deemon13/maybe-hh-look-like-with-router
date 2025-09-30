import { AppShell } from "@mantine/core";

import { Logo, NavHeader } from "../../shared";

import styles from "./Header.module.css";

export const Header = () => {
  return (
    <AppShell.Header withBorder={false} className={styles.header}>
      <Logo />

      <NavHeader />
    </AppShell.Header>
  );
};
