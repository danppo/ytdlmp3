import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../test-utils";
import ColorModeSwitcher from "./ColorModeSwitcher";

describe("renders components:", () => {
  test("self", () => {
    render(<ColorModeSwitcher />);
    const currentElement = screen.getByTestId("colorSwitcher");
    expect(currentElement).toBeInTheDocument();
  });
  test("button switch color mode", () => {
    const textInDarkMode = "Switch to light mode";
    const textInLightMode = "Switch to dark mode";
    render(<ColorModeSwitcher />);
    const button = screen.getByTestId("switcherButton");
    expect(button).toHaveAttribute("aria-label", textInLightMode);
    fireEvent.click(button);

    expect(button).toHaveAttribute("aria-label", textInDarkMode);
  });
});
