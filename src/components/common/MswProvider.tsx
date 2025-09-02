// MswProvider.tsx
"use client";
import { useEffect } from "react";
import { initMsw } from "@/mocks/initMsw";

export default function MswProvider() {
  useEffect(() => {
    initMsw();
  }, []);
  return null;
}
