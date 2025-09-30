import { fireEvent, screen, waitFor } from "@testing-library/react";
import { expect, it, describe, beforeAll, vi } from "vitest";
import { Provider } from "react-redux";
import { setupStore } from "../../shared/store/store";
import { render } from "../../app/test-utils/render";

import { SearchBar } from "./SearchBar";

beforeAll(() => {
  vi.stubGlobal(
    "ResizeObserver",
    class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  );
});

describe("SearchBar component", function () {
  const mockedSearchText = "junior";

  it("should render component SearchBar", () => {
    render(
      <Provider store={setupStore}>
        <SearchBar />
      </Provider>
    );
    expect(screen.getByText(/Список вакансий/i));
    expect(screen.getByText(/по профессии Frontend-разработчик/i));
    expect(screen.findAllByPlaceholderText("Должность или название компании"));
  });

  it("should search vacancies of text junior", async () => {
    const dispatchSpy = vi.spyOn(setupStore, "dispatch");

    render(
      <Provider store={setupStore}>
        <SearchBar />
      </Provider>
    );

    const btnSearch = screen.getByRole("button");

    fireEvent.click(btnSearch);

    waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: "vacancies/inputSearchText",
        payload: mockedSearchText,
      });
    });
  });
});
