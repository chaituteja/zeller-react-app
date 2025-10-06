import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Card component", () => {
  test("Card component should receive and display correct info", () => {
    render(<Card name="Teja jajam" role="admin" />);
    const name = screen.getByText("Teja jajam");
    const role = screen.getByText("admin");
    const initial = screen.getByTestId("user-initial");
    expect(initial.textContent).toBe("T");
    expect(name).toBeInTheDocument();
    expect(role).toBeInTheDocument();
  });
});
