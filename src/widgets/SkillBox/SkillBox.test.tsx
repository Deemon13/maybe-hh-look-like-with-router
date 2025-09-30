import { fireEvent, screen, waitFor } from "@testing-library/react";
import { expect, it, describe, beforeAll, vi } from "vitest";
import { Provider } from "react-redux";
import { setupStore } from "../../shared/store/store";
import { render } from "../../app/test-utils/render";

import { SkillBox } from "./SkillBox";

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

describe("SkillBox component", function () {
  it("should render component SkillBox", () => {
    render(
      <Provider store={setupStore}>
        <SkillBox />
      </Provider>
    );
    expect(screen.getByText(/Ключевые навыки/i));
    expect(screen.getByText(/TypeScript/i));
    expect(screen.getByText(/React/i));
    expect(screen.getByText(/Redux/i));
    expect(screen.findAllByPlaceholderText("Навык"));
    expect(screen.findAllByRole("button"));
  });

  it("should call action addSkill", async () => {
    const mockedAddSkill = "Node";
    const dispatchSpy = vi.spyOn(setupStore, "dispatch");

    render(
      <Provider store={setupStore}>
        <SkillBox />
      </Provider>
    );

    const btnAddSkill = screen.getByRole("button");
    fireEvent.click(btnAddSkill);

    waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: "vacancies/addSkill",
        payload: mockedAddSkill,
      });
    });
  });

  it("should call action removeSkill", async () => {
    const dispatchSpy = vi.spyOn(setupStore, "dispatch");

    render(
      <Provider store={setupStore}>
        <SkillBox />
      </Provider>
    );

    const btnRemoveSkill = screen.getByText("React")
      .nextElementSibling as HTMLElement;
    fireEvent.click(btnRemoveSkill);

    waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: "vacancies/removeSkill",
        payload: screen.getByText("React").innerText,
      });
    });
  });
});
