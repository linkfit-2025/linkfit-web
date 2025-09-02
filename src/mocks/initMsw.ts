// src/mocks/initMsw.ts
export const initMsw = async () => {
  if (typeof window === "undefined") return;

  const { worker } = await import("./browser");
  worker.start();
};
