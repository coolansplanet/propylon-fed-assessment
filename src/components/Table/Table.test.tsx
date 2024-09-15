import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as api from "@/helpers/api";
import Bills from "@/__mocks__/bills.json";
import Table from "./Table";
import { MemoryRouter } from "react-router-dom";

let mockSearchParam = "";

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useSearchParams: () => {
    const [params, setParams] = React.useState(
      new URLSearchParams(mockSearchParam)
    );
    return [
      params,
      (newParams: string) => {
        mockSearchParam = newParams;
        setParams(new URLSearchParams(newParams));
      },
    ];
  },
}));

const Context: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MemoryRouter>
  );
};

describe("Unit test for <Table/> component", () => {
  test("Data is shown properly", () => {
    const { getByText, getAllByText } = render(
      <Context>
        <Table
          head={Bills.head}
          rows={Bills.results as []}
          isFetched={true}
          isFetching={false}
          isError={false}
          error={null}
        />
      </Context>
    );
    expect(getByText("61")).toBeInTheDocument();
    expect(getAllByText("Current")).toHaveLength(4);
    expect(getAllByText("Enacted")).toHaveLength(4);
    expect(getAllByText("Minister for Health")).toHaveLength(3);
    expect(getByText("1–8 of 5799")).toBeInTheDocument();
    expect(getByText(/rows per page/i)).toBeInTheDocument();
  });
  test("Loading table shows skeleton", () => {
    const { container, queryByText } = render(
      <Context>
        <Table
          head={Bills.head}
          rows={[]}
          isFetched={false}
          isFetching={true}
          isError={false}
          error={null}
        />
      </Context>
    );
    expect(queryByText(/rows per page/i)).toBeNull();
    expect(queryByText("No records to show")).toBeNull();
    expect(container.querySelectorAll(".MuiSkeleton-wave")).toHaveLength(55);
  });

  test("Empty table shows message", () => {
    const { getByText, queryByText } = render(
      <Context>
        <Table
          head={Bills.head}
          rows={[]}
          isFetched={true}
          isFetching={false}
          isError={false}
          error={null}
        />
      </Context>
    );
    expect(queryByText(/rows per page/i)).toBeNull();
    expect(getByText("No records to show")).toBeInTheDocument();
  });

  test("When query result is uncertain, shows message", () => {
    const { getByText, queryByText } = render(
      <Context>
        <Table
          head={Bills.head}
          rows={[]}
          isFetched={false}
          isFetching={false}
          isError={false}
          error={null}
        />
      </Context>
    );
    expect(queryByText(/rows per page/i)).toBeNull();
    expect(
      getByText("There was a problem with the request")
    ).toBeInTheDocument();
  });

  test("Title buttons work as expected", async () => {
    const { getByTitle, getByTestId, getByText, queryByText } = render(
      <Context>
        <Table
          head={Bills.head}
          rows={Bills.results as []}
          isFetched={true}
          isFetching={false}
          isError={false}
          error={null}
        />
      </Context>
    );

    expect(getByTitle("Go to first page")).toBeDisabled();
    expect(getByTitle("Go to previous page")).toBeDisabled();
    const titleButton = getByTestId("title-button-0");
    fireEvent.click(titleButton);
    await waitFor(() =>
      expect(
        getByText(
          /Bill entitled an Act to provide for a duty for health services/i
        )
      ).toBeInTheDocument()
    );
    fireEvent.click(getByText(/gaeilge/i));

    await waitFor(() =>
      expect(
        getByText(
          /Bille dá ngairtear Acht do dhéanamh socrú maidir le dualgas/i
        )
      ).toBeInTheDocument()
    );

    fireEvent.click(getByText(/ok/i));
    await waitFor(() => expect(queryByText(/gaeilge/i)).toBeNull());

    const titleButton2 = getByTestId("title-button-1");

    fireEvent.click(titleButton2);

    await waitFor(() => expect(getByText(/gaeilge/i)).toBeInTheDocument());
    await waitFor(() =>
      expect(
        getByText(/Acht do leasú an Achta Cosanta, 1954/i)
      ).toBeInTheDocument()
    );
    fireEvent.click(getByText(/english/i));
    await waitFor(() =>
      expect(
        getByText(/Act to amend the Defence Act 1954/i)
      ).toBeInTheDocument()
    );

    fireEvent.click(getByText(/ok/i));

    await waitFor(() =>
      expect(queryByText(/Act to amend the Defence Act 1954/i)).toBeNull()
    );
  });
  test("Star buttons work as expected", async () => {
    const { getByTestId } = render(
      <Context>
        <Table
          head={Bills.head}
          rows={Bills.results as []}
          isFetched={true}
          isFetching={false}
          isError={false}
          error={null}
        />
      </Context>
    );
    const starButton = getByTestId("star-button-0");
    expect(starButton.querySelector("svg")).toHaveClass(
      "MuiSvgIcon-colorDisabled"
    );

    fireEvent.click(starButton);
    await waitFor(() => {
      expect(api.favourites.post).toHaveBeenCalledTimes(1);
    });
    expect(api.favourites.post).toHaveBeenCalledWith(Bills.results[0]);
  });

  test("Pagination works properly", async () => {
    const { getByTitle, getByText, getAllByRole, getByRole } = render(
      <Context>
        <Table
          head={Bills.head}
          rows={Bills.results as []}
          isFetched={true}
          isFetching={false}
          isError={false}
          error={null}
        />
      </Context>
    );

    const goToFirstPageButton = getByTitle(/Go to first page/i);
    const goToPreviousPageButton = getByTitle(/Go to previous page/i);
    const goToNextPageButton = getByTitle(/Go to next page/i);
    const goToLastPageButton = getByTitle(/Go to last page/i);
    const [, rowsPerPageCombo] = getAllByRole("combobox");

    expect(goToFirstPageButton).toBeDisabled();
    expect(goToPreviousPageButton).toBeDisabled();
    expect(goToNextPageButton).toBeEnabled();
    expect(goToLastPageButton).toBeEnabled();
    expect(getByText("1–8 of 5799")).toBeInTheDocument();
    expect(mockSearchParam).toEqual({
      page: 0,
      rowsPerPage: 8,
      bill_status: "none",
    });

    fireEvent.click(goToNextPageButton);

    expect(goToFirstPageButton).toBeEnabled();
    expect(goToPreviousPageButton).toBeEnabled();
    expect(goToNextPageButton).toBeEnabled();
    expect(goToLastPageButton).toBeEnabled();
    expect(getByText("9–16 of 5799")).toBeInTheDocument();
    expect(mockSearchParam).toEqual({
      page: 1,
      rowsPerPage: 8,
      bill_status: "none",
    });

    fireEvent.click(goToNextPageButton);

    expect(goToFirstPageButton).toBeEnabled();
    expect(goToPreviousPageButton).toBeEnabled();
    expect(goToNextPageButton).toBeEnabled();
    expect(goToLastPageButton).toBeEnabled();
    expect(getByText("17–24 of 5799")).toBeInTheDocument();
    expect(mockSearchParam).toEqual({
      page: 2,
      rowsPerPage: 8,
      bill_status: "none",
    });

    fireEvent.click(goToLastPageButton);

    expect(goToFirstPageButton).toBeEnabled();
    expect(goToPreviousPageButton).toBeEnabled();
    expect(goToNextPageButton).toBeDisabled();
    expect(goToLastPageButton).toBeDisabled();
    expect(getByText("5793–5799 of 5799")).toBeInTheDocument();
    expect(mockSearchParam).toEqual({
      page: 724,
      rowsPerPage: 8,
      bill_status: "none",
    });

    fireEvent.click(goToPreviousPageButton);

    expect(goToFirstPageButton).toBeEnabled();
    expect(goToPreviousPageButton).toBeEnabled();
    expect(goToNextPageButton).toBeEnabled();
    expect(goToLastPageButton).toBeEnabled();
    expect(getByText("5785–5792 of 5799")).toBeInTheDocument();
    expect(mockSearchParam).toEqual({
      page: 723,
      rowsPerPage: 8,
      bill_status: "none",
    });

    fireEvent.click(goToFirstPageButton);

    expect(goToFirstPageButton).toBeDisabled();
    expect(goToPreviousPageButton).toBeDisabled();
    expect(goToNextPageButton).toBeEnabled();
    expect(goToLastPageButton).toBeEnabled();
    expect(getByText("1–8 of 5799")).toBeInTheDocument();
    expect(mockSearchParam).toEqual({
      page: 0,
      rowsPerPage: 8,
      bill_status: "none",
    });

    fireEvent.click(goToNextPageButton);

    fireEvent.mouseDown(rowsPerPageCombo);
    fireEvent.click(
      getByRole("option", {
        name: /12/i,
      })
    );

    expect(goToFirstPageButton).toBeDisabled();
    expect(goToPreviousPageButton).toBeDisabled();
    expect(goToNextPageButton).toBeEnabled();
    expect(goToLastPageButton).toBeEnabled();
    expect(getByText("1–12 of 5799")).toBeInTheDocument();
    expect(mockSearchParam).toEqual({
      page: 0,
      rowsPerPage: 12,
      bill_status: "none",
    });
  });
});
