import * as React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ChakraProvider, theme, ColorModeScript } from "@chakra-ui/react";

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <>
    <ColorModeScript />
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
  </>
);

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

export { customRender as render };
