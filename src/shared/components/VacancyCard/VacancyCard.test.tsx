import { screen } from "@testing-library/react";
import { expect, it, describe } from "vitest";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { setupStore } from "../../store/store";
import { render } from "../../../app/test-utils/render";
import type { VacanciesType } from "../../../app/redux/reducers/vacanciesSlice";

import { VacancyCard } from "./VacancyCard";

describe("VacancyCard component, variant - Remote", function () {
  const mockItem: VacanciesType = {
    id: "125512027",
    name: "Senior frontend developer",
    area: { id: "1", name: "Москва" },
    employer: {
      name: "Ozon",
      logo_urls: null,
    },
    experience: { id: "between3And6" },
    work_format: [{ id: " REMOTE" }],
    salary: {
      from: 4000,
      to: 4700,
      currency: "RUR",
    },
    snippet: {
      requirement: null,
      responsibility: null,
    },
    alternate_url: "",
  };

  it("should render component VacancyCard", () => {
    render(
      <MemoryRouter>
        <Provider store={setupStore}>
          <VacancyCard item={mockItem} isSingle={false} />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Senior frontend developer/i));
    expect(screen.getByText(/Ozon/i));
    expect(screen.getByText(/Опыт 3-6 лет/i));
    expect(screen.getByText(/4000 - 4700 RUR/i));
    expect(screen.findAllByRole("button"));
  });
});

describe("VacancyCard component, variant - field_work", function () {
  const mockItem: VacanciesType = {
    id: "125512028",
    name: "Middle frontend developer",
    area: { id: "2", name: "Санкт-Петербург" },
    employer: {
      name: "Ozon",
      logo_urls: null,
    },
    experience: { id: "moreThan6" },
    work_format: [{ id: "FIELD_WORK" }],
    salary: {
      from: 4000,
      to: 4000,
      currency: "RUR",
    },
    snippet: {
      requirement: null,
      responsibility: null,
    },
    alternate_url: "",
  };

  it("should render component VacancyCard", () => {
    render(
      <MemoryRouter>
        <Provider store={setupStore}>
          <VacancyCard item={mockItem} isSingle={false} />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Middle frontend developer/i));
    expect(screen.getByText(/Опыт более 6 лет/i));
    expect(screen.getByText(/Разъездной/i));
    expect(screen.getByText(/4000 RUR/i));
  });
});

describe("VacancyCard component, variant - without experience", function () {
  const mockItem: VacanciesType = {
    id: "125512028",
    name: "Middle frontend developer",
    area: { id: "3", name: "Астана" },
    employer: {
      name: "Ozon",
      logo_urls: null,
    },
    experience: { id: "noExperience" },
    work_format: [{ id: "FIELD_WORK" }],
    salary: {
      from: 4000,
      to: 4000,
      currency: "RUR",
    },
    snippet: {
      requirement: null,
      responsibility: null,
    },
    alternate_url: "",
  };

  it("should render component VacancyCard", () => {
    render(
      <MemoryRouter>
        <Provider store={setupStore}>
          <VacancyCard item={mockItem} isSingle={false} />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Без опыта/i));
  });
});
