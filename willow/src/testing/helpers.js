import React from "react";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { SnackbarProvider } from "notistack";
import { BrowserRouter as Router } from "react-router-dom";

export const wrapInTheme = (component) => {
  return (
    <ChakraProvider>
      <ColorModeProvider>{component}</ColorModeProvider>
    </ChakraProvider>
  );
};
export const wrapInRouter = (component) => <Router>{component}</Router>;

export const wrapInSnackbar = (component) => (
  <SnackbarProvider>{component}</SnackbarProvider>
);

export const wrapInAll = (component) => {
  return wrapInTheme(wrapInSnackbar(wrapInRouter(component)));
};
