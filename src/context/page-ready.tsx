"use client";

import { createContext, useContext } from "react";

export const PageReadyContext = createContext(false);

export const usePageReady = () => useContext(PageReadyContext);
