import { createSlice } from "@reduxjs/toolkit";

import { fetchVacancies } from "./VacanciesThunk";

export interface VacanciesType {
  id: string;
  name: string;
  area: {
    id: string | null;
    name: string | null;
  } | null;
  salary: {
    from: number | null;
    to: number | null;
    currency: string | null;
  } | null;
  experience: {
    id: string | null;
  } | null;
  employer: {
    name: string | null;
    logo_urls: {
      original: string | null;
    } | null;
  } | null;
  work_format: [{ id: string | null }] | null;
  snippet: { requirement: string | null; responsibility: string | null } | null;
  alternate_url: string;
}

export interface VacanciesState {
  vacancies: VacanciesType[];
  status: null | boolean;
  currentPage: number;
  currentArea: null | string;
  skill_set: string[];
  searchText: string;
  pages: number;
}

const initialState: VacanciesState = {
  vacancies: [],
  status: null,
  currentPage: 1,
  // skill_set: ["TypeScript", "React", "Redux"],
  skill_set: [],
  currentArea: null,

  searchText: "",
  pages: 0,
};

export const vacanciesSlice = createSlice({
  name: "vacancies",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      if (action.payload === 0) {
        state.currentPage = 1;
      } else {
        state.currentPage = action.payload;
      }
    },
    inputSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    addSkill: (state, action) => {
      const newSkillSet = state.skill_set.map((skill) => skill.toLowerCase());
      if (newSkillSet.includes(action.payload.toLowerCase())) {
        state.skill_set = [...state.skill_set];
      } else {
        state.skill_set = [...state.skill_set, action.payload];
      }
    },
    removeSkill: (state, action) => {
      state.skill_set = state.skill_set.filter(
        (skill) => skill !== action.payload
      );
    },
    selectArea: (state, action) => {
      switch (action.payload) {
        case "Москва":
          state.currentArea = "1";
          break;
        case "Санкт-Петербург":
          state.currentArea = "2";
          break;
        default:
          state.currentArea = null;
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancies.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchVacancies.fulfilled, (state, action) => {
        state.status = false;
        const { items, pages }: { items: VacanciesType[]; pages: number } =
          action.payload;
        state.vacancies = items;
        state.pages = pages - 1;
      })
      .addCase(fetchVacancies.rejected, (state) => {
        state.status = false;
      });
  },
});

export const {
  setCurrentPage,
  inputSearchText,
  addSkill,
  removeSkill,
  selectArea,
} = vacanciesSlice.actions;

export default vacanciesSlice.reducer;
