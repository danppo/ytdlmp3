import React from "react"
import { screen } from "@testing-library/react"
import { render } from "./test-utils"
import { App } from "./App"

test("renders QuestionPage component", () => {
  render(<App />)
  const childElement = screen.getByTestId('QuestionPage')
  expect(childElement).toBeInTheDocument()
})
