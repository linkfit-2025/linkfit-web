// MswProvider.tsx
"use client";
import { useEffect, useState } from "react";
import { initMsw } from "@/mocks/initMsw";

export default function MswProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    initMsw().then(() => setReady(true));
  }, []);
  if (!ready) return null;
  return <>{children}</>;
}
