"use client";

import React, { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";

export const AppProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
