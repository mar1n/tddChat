import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

import { Store } from "../../store/store";

export function renderWithProviders(ui: React.ReactElement) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={Store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { Store, ...render(ui, { wrapper: Wrapper }) };
}
