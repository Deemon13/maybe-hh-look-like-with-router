import { useSearchParams } from "react-router-dom";
import { Group, Pagination, useMantineTheme } from "@mantine/core";

import {
  useTypedDispatch,
  useTypedSelector,
} from "../../app/redux/hooks/redux";
import { setCurrentPage } from "../../app/redux/reducers/vacanciesSlice";

export const PaginationUI = () => {
  const [, setSearchParams] = useSearchParams();

  const dispatch = useTypedDispatch();

  const currentPage = useTypedSelector(
    (state) => state.vacanciesReducer.currentPage
  );

  const pages = useTypedSelector((state) => state.vacanciesReducer.pages);

  const theme = useMantineTheme();

  const handleSetCurrentPage = (evt: number) => {
    dispatch(setCurrentPage(evt));
    const newCurrentPage = evt;

    setSearchParams((searchParams) => {
      searchParams.set("page", String(newCurrentPage));
      return searchParams;
    });
  };

  return (
    <Pagination.Root
      total={pages}
      value={currentPage}
      onChange={handleSetCurrentPage}
      color={theme.primaryColor}
    >
      <Group gap={5} justify="center">
        <Pagination.First />
        <Pagination.Previous />
        <Pagination.Items />
        <Pagination.Next />
        <Pagination.Last />
      </Group>
    </Pagination.Root>
  );
};
