import React, { createContext, useContext, useState } from "react";

interface RsvpButtonContextType {
  isSticky: boolean;
  setIsSticky: (val: boolean) => void;
}

const RsvpButtonContext = createContext<RsvpButtonContextType>({
  isSticky: false,
  setIsSticky: () => {},
});

export function RsvpButtonProvider({ children }: { children: React.ReactNode }) {
  const [isSticky, setIsSticky] = useState(false);

  return (
    <RsvpButtonContext.Provider value={{ isSticky, setIsSticky }}>
      {children}
    </RsvpButtonContext.Provider>
  );
}

export function useRsvpButton() {
  return useContext(RsvpButtonContext);
}
