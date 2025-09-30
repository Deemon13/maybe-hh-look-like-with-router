import { fireEvent, screen } from "@testing-library/react";
import { expect, it, describe, beforeAll, vi } from "vitest";
import { Provider } from "react-redux";
import { setupStore } from "../../shared/store/store";
import { render } from "../../app/test-utils/render";

import { AreaSelect } from "./AreaSelect";

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

describe("AreaSelect component", function () {
  const mockedAreaValue = "Москва";

  it("change area from selected option", () => {
    const dispatchSpy = vi.spyOn(setupStore, "dispatch");

    render(
      <Provider store={setupStore}>
        <AreaSelect />
      </Provider>
    );

    const selectArea = screen.getByRole("textbox");
    fireEvent.click(selectArea);
    fireEvent.click(screen.getByText(mockedAreaValue));

    expect(dispatchSpy).toHaveBeenCalledWith({
      type: "vacancies/selectArea",
      payload: mockedAreaValue,
    });
  });
});
