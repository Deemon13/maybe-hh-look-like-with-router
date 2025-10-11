import { createAsyncThunk } from "@reduxjs/toolkit";
import ky from "ky";

import { type VacanciesType } from "./vacanciesSlice";

const url = "https://api.hh.ru/vacancies";

interface fetchVacanciesStateResponce {
  items: VacanciesType[];
  pages: number;
}

interface getVacanciesProps {
  page: number;
  text: string | null;
  area: null | string;
}

export const fetchVacancies = createAsyncThunk<
  fetchVacanciesStateResponce,
  getVacanciesProps
>(
  "vacancies/fetchVacancies",
  async function ({ page = 0, text = null, area = null }: getVacanciesProps) {
    const response = await ky.get(url, {
      searchParams: {
        industry: 7,
        professional_role: 96,
        page,
        per_page: 10,
        ...(text && { text }),
        ...(area && { area }),
      },
    });

    if (!response.ok) {
      throw new Error("Server Error!");
    }

    const data = await response.json<fetchVacanciesStateResponce>();

    return data;
  }
);
