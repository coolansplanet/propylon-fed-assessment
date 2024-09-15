import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import billMockResponse from "./src/__mocks__/bills.json";
import favouritesMockResponse from "./src/__mocks__/favourites.json";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  vi.clearAllMocks();
  cleanup();
});

vi.mock("./src/helpers/api", () => {
  return {
    legislation: { get: vi.fn().mockResolvedValue(billMockResponse) },
    favourites: {
      get: vi.fn().mockResolvedValue(favouritesMockResponse),
      post: vi.fn().mockResolvedValue("ok"),
      delete: vi.fn().mockResolvedValue("ok"),
    },
  };
});
