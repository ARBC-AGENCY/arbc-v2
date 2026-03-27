"use client";

import { useState } from "react";
import Loader from "./Loader";
import { PageReadyContext } from "@/context/page-ready";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <PageReadyContext.Provider value={loaded}>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        {children}
      </div>
    </PageReadyContext.Provider>
  );
}
