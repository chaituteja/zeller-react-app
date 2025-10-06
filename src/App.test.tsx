import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "./App";
import { generateClient } from "aws-amplify/api";

jest.mock("aws-amplify/api", () => ({
  generateClient: jest.fn(),
}));

jest.mock("./graphql/queries", () => ({
  ListZellerCustomers: "mock-query",
}));

describe("App Component", () => {
  let mockGraphql: jest.Mock;

  beforeEach(() => {
    mockGraphql = jest.fn();
    (generateClient as jest.Mock).mockReturnValue({
      graphql: mockGraphql,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockCustomers = {
    data: {
      listZellerCustomers: {
        items: [
          {
            email: "test1@email.com",
            id: "1",
            name: "Peter parker",
            role: "admin",
          },
          {
            email: "test2@email.com",
            id: "2",
            name: "Clark kent",
            role: "admin",
          },
          {
            email: "test3@email.com",
            id: "3",
            name: "Hal jordan",
            role: "manager",
          },
          {
            email: "test4@email.com",
            id: "4",
            name: "Bruce wayne",
            role: "manager",
          },
        ],
      },
    },
  };

  const mockInvalidManagerCustomers = {
    data: {
      listZellerCustomers: {
        items: [
          {
            email: "test1@email.com",
            id: "1",
            name: "Peter parker",
            role: "admin",
          },
          {
            email: "test2@email.com",
            id: "2",
            name: "Clark kent",
            role: "user",
          },
        ],
      },
    },
  };

  const mockEmptyData = {
    data: {
      listZellerCustomers: {},
    },
  };

  test("Show Admin customers by default", async () => {
    mockGraphql.mockResolvedValueOnce(mockCustomers);
    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    const cards = await screen.findAllByTestId("user-initial");

    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent("P");
    expect(cards[1]).toHaveTextContent("C");
    expect(screen.getByText("Peter parker")).toBeInTheDocument();
    expect(screen.getByText("Clark kent")).toBeInTheDocument();
    expect(screen.queryByText("Bruce wayne")).not.toBeInTheDocument();
    expect(screen.queryByText("Hal jordan")).not.toBeInTheDocument();
  });

  test("Update customers when switched to manager", async () => {
    mockGraphql.mockResolvedValue(mockCustomers);
    render(<App />);
    await screen.findByText("Peter parker");
    const radios = screen.getAllByTestId("radio-input");
    fireEvent.click(radios[1]); // manager radio button

    expect(screen.queryByText("Peter parker")).not.toBeInTheDocument();
    expect(screen.queryByText("Clark kent")).not.toBeInTheDocument();
    expect(screen.getByText("Bruce wayne")).toBeInTheDocument();
    expect(screen.getByText("Hal jordan")).toBeInTheDocument();
  });

  test("Show error message when API call fails", async () => {
    mockGraphql.mockRejectedValueOnce({
      errors: [{ message: "Network error" }],
    });
    render(<App />);
    // Wait for the error message
    await waitFor(() => {
      expect(screen.getByText(/error: network error/i)).toBeInTheDocument();
    });
  });

  test("Show 'no {role} found' message if filter result is empty", async () => {
    mockGraphql.mockResolvedValueOnce(mockInvalidManagerCustomers);
    render(<App />);
    await screen.findByText("Peter parker");
    const radios = screen.getAllByTestId("radio-input");
    fireEvent.click(radios[1]); // manager radio button
    await waitFor(() => {
      expect(screen.getByText(/no manager users found/i)).toBeInTheDocument();
    });
  });

  test("Show genereic error", async () => {
    mockGraphql.mockRejectedValueOnce(new Error("unknown error"));
    render(<App />);
    const genericError = await screen.findByText(/failed to fetch customers/i);
    expect(genericError).toBeInTheDocument();
  });

  test("Show error message when empty data is fetched", async () => {
    mockGraphql.mockResolvedValueOnce(mockEmptyData);
    render(<App />);
    const noUsers = await screen.findByText(/no admin users found/i);
    expect(noUsers).toBeInTheDocument();
    expect(mockGraphql).toHaveBeenCalledTimes(1);
  });
});
