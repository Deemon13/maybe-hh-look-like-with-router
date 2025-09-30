import { screen, waitFor } from "@testing-library/react";
import { expect, it, describe } from "vitest";
import { Provider } from "react-redux";
import { setupStore } from "../../shared/store/store";
import { render } from "../test-utils/render";

import { App } from "./App";

describe("App component", function () {
  it("should render component App", async () => {
    render(
      <Provider store={setupStore}>
        <App />
      </Provider>
    );
    expect(screen.getByText(/Список вакансий/i));
    await waitFor(() => {
      expect(screen.getAllByText("Смотреть вакансию"));
    });
  });
});
