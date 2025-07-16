import { describe, test, expect, vi, beforeEach } from "vitest";
import * as api from "@/services/api";
import axios from "axios";

const mockGet = vi.fn();
vi.spyOn(axios, "create").mockReturnValue({ get: mockGet });

describe("searchMeals", () => {
  beforeEach(() => {
    mockGet.mockReset();
  });

  test("returns meal data when query is valid", async () => {
    mockGet.mockResolvedValueOnce({
      data: {
        meals: [{ idMeal: "1234", strMeal: "Arrabiata" }],
      },
    });

    const result = await api.searchMeals("Arrabiata");
    expect(mockGet).toHaveBeenCalledWith("/search.php", {
      params: { s: "Arrabiata" },
    });
    expect(result).toEqual([{ idMeal: "1234", strMeal: "Arrabiata" }]);
  });

  test("returns empty array for empty query", async () => {
    const result = await api.searchMeals(" ");
    expect(result).toEqual([]);
    expect(mockGet).not.toHaveBeenCalled();
  });
});
