import React, { useEffect, useState, createContext } from "react";

export const MobileContext = createContext<boolean>(false);

type MobileProviderProps = {
  children: React.ReactNode;
};

const MobileProvider = ({ children }: MobileProviderProps) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <MobileContext.Provider value={isMobile}>{children}</MobileContext.Provider>
  );
};
export default MobileProvider;
