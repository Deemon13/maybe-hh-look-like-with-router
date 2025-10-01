import { Outlet } from "react-router-dom";
import { AppShell } from "@mantine/core";

import { Header } from "../../../widgets";

import styles from "./Layout.module.css";

export const Layout = () => {
  return (
    <AppShell padding="md" header={{ height: 60 }}>
      <Header />

      <AppShell.Main className={styles.main}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
