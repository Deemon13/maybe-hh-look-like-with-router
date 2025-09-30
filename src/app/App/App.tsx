import { AppShell } from "@mantine/core";

import { Vacancies } from "../../pages";

import { Header } from "../../widgets";

import styles from "./App.module.css";

export const App = () => {
  return (
    <AppShell padding="md" header={{ height: 60 }}>
      <Header />

      <AppShell.Main className={styles.main}>
        <Vacancies />
      </AppShell.Main>
    </AppShell>
  );
};
