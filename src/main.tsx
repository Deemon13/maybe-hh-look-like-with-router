import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { HashRouter } from "react-router";
import {
  createTheme,
  MantineProvider,
  type MantineColorsTuple,
} from "@mantine/core";

import { setupStore } from "./shared/store/store";
import { App } from "./app";

import "@mantine/core/styles.css";
import "./index.css";

const myColor: MantineColorsTuple = [
  "#edf2ff",
  "#dbe4ff",
  "#bac8ff",
  "#91a7ff",
  "#748ffc",
  "#5c7cfa",
  "#4c6ef5",
  "#4263eb",
  "#3b5bdb",
  "#364fc7",
];

const theme = createTheme({
  colors: { myColor },
  primaryColor: "indigo",
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Provider store={setupStore}>
        <MantineProvider theme={theme}>
          <App />
        </MantineProvider>
      </Provider>
    </HashRouter>
  </StrictMode>
);
