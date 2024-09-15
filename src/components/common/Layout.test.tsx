import { render } from "@testing-library/react";

import Layout from "./Layout";
import { MemoryRouter } from "react-router-dom";

describe("Unit test for <Layout/> component", () => {
  test("Elements are shown properly", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Layout>Some text as children</Layout>
      </MemoryRouter>
    );
    expect(getByText("Home")).toBeInTheDocument();
    expect(getByText("Favourites")).toBeInTheDocument();
    expect(getByText("Some text as children")).toBeInTheDocument();
  });
});
