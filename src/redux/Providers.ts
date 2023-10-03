"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "./store";

type ReduxProviderType = {
  children: ReactNode;
};

function ReduxProvider({ children }: ReduxProviderType) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
