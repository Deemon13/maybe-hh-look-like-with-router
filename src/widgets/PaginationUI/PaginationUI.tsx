import { Group, Pagination, useMantineTheme } from "@mantine/core";

import {
  useTypedDispatch,
  useTypedSelector,
} from "../../app/redux/hooks/redux";

import { setCurrentPage } from "../../app/redux/reducers/vacanciesSlice";

export const PaginationUI = () => {
  const dispatch = useTypedDispatch();

  const currentPage = useTypedSelector(
    (state) => state.vacanciesReducer.currentPage
  );

  const pages = useTypedSelector((state) => state.vacanciesReducer.pages);

  const theme = useMantineTheme();

  return (
    <Pagination.Root
      total={pages}
      value={currentPage}
      onChange={(e) => dispatch(setCurrentPage(e))}
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
