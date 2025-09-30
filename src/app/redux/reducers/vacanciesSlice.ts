import { createSlice } from "@reduxjs/toolkit";

import { fetchVacancies } from "./VacanciesThunk";

export interface VacanciesType {
  id: string;
  name: string;
  area: {
    id: string;
    name: string;
  };
  salary: {
    from: number;
    to: number;
    currency: string;
  };
  experience: {
    id: string;
  };
  employer: {
    name: string;
  };
  work_format: [{ id: string }];
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
  skill_set: ["TypeScript", "React", "Redux"],
  currentArea: null,

  searchText: "",
  pages: 0,
};

export const vacanciesSlice = createSlice({
  name: "vacancies",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
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
      console.log(action.payload);

      state.skill_set = state.skill_set.filter(
        (skill) => skill !== action.payload
      );
    },
    selectArea: (state, action) => {
      switch (action.payload) {
        case "Все города":
          state.currentArea = null;
          break;
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
      state.currentPage = 1;
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
