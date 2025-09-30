import { Routes, Route } from "react-router-dom";
import { AppShell } from "@mantine/core";

import { Vacancies, VacancyPage, NotFound } from "../../pages";

import { Header } from "../../widgets";

import styles from "./App.module.css";

export const App = () => {
  return (
    <AppShell padding="md" header={{ height: 60 }}>
      <Header />

      <AppShell.Main className={styles.main}>
        <Routes>
          <Route
            path="/maybe-hh-look-like-with-router/"
            element={<Vacancies />}
          />
          <Route path="/vacancies/:id" element={<VacancyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <Vacancies /> */}
        {/* <VacancyPage /> */}
      </AppShell.Main>
    </AppShell>
  );
};
