import { sendUpdate, saveFormData, fetchData } from "../src/utils/api";

// Mock fetch globally
global.fetch = jest.fn();

// Mock localStorage for Jest environment
global.localStorage = {
  store: {},
  getItem: function (key) {
    return this.store[key] || null;
  },
  setItem: function (key, value) {
    this.store[key] = value.toString();
  },
  clear: function () {
    this.store = {};
  }
};

// Set token before tests run
beforeAll(() => {
  localStorage.setItem("authToken", "mocked-token");
});

beforeEach(() => {
  fetch.mockClear();
});

describe("API Utils", () => {

  describe("sendUpdate", () => {
    test("sends POST request and returns JSON response", async () => {
      const mockResponse = { success: true };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await sendUpdate("/api/test", { name: "John" });

      expect(fetch).toHaveBeenCalledWith("/api/test", expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({ name: "John" })
      }));

      expect(result).toEqual(mockResponse);
    });

    test("throws error if response is not ok", async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        text: async () => "Bad request"
      });

      await expect(sendUpdate("/api/test", {})).rejects.toThrow("Bad request");
    });
  });

  describe("saveFormData", () => {
    test("sends PUT request with Authorization header", async () => {
      const mockResponse = { status: "updated" };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await saveFormData("/api/save", { foo: "bar" });

      expect(fetch).toHaveBeenCalledWith("/api/save", expect.objectContaining({
        method: "PUT",
        headers: expect.objectContaining({
          Authorization: "Token mocked-token",
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ foo: "bar" }),
      }));

      expect(result).toEqual(mockResponse);
    });

    test("throws error on failed request", async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        text: async () => "Update failed",
      });

      await expect(saveFormData("/api/save", {})).rejects.toThrow("Update failed");
    });
  });

  describe("fetchData", () => {
    test("sends GET request with token and returns data", async () => {
      const mockData = { items: [1, 2, 3] };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchData("/api/data");

      expect(fetch).toHaveBeenCalledWith("/api/data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token mocked-token",
        },
      });

      expect(result).toEqual(mockData);
    });

    test("throws error on fetch fail", async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(fetchData("/api/data")).rejects.toThrow("GET failed with status 500");
    });
  });

});
