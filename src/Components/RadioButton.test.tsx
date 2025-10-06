import { render, screen } from "@testing-library/react";
import RadioButton from "./RadioButton";
import "jest-styled-components";

describe("Radio Button", () => {
  test("Radio button component should have correct label", () => {
    render(
      <RadioButton
        onClick={() => {}}
        id="testId"
        name="testName"
        label="test label"
        checked={false}
      />
    );
    const text = screen.getByLabelText("test label");
    expect(text).toBeInTheDocument();
    expect(screen.getByTestId("radio-input")).toBeInTheDocument();
  });

  test("Radio button component should have radio input element", () => {
    render(
      <RadioButton
        onClick={() => {}}
        id="testId"
        name="testName"
        label="test label"
        checked={false}
      />
    );
    expect(screen.getByTestId("radio-input")).toBeInTheDocument();
  });

  test("Radio button component should have active state when checked", async () => {
    render(
      <RadioButton
        onClick={() => {}}
        id="testId"
        name="testName"
        label="test label"
        checked={true}
      />
    );
    const label = screen.getByRole("label");
    expect(label).toHaveStyle("background-color:#d1ddf3");
  });
});
