import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useWindowDimensions } from "react-native";

interface ScreenSizeContextType {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isLargeScreen: boolean;
}

const ResponsiveContext = createContext<ScreenSizeContextType | undefined>(
  undefined
);

export const ResponsiveProvider = ({ children }: { children: ReactNode }) => {
  const { width, height } = useWindowDimensions();
  const [screenInfo, setScreenInfo] = useState<ScreenSizeContextType>({
    width,
    height,
    isMobile: width < 600,
    isTablet: width >= 600 && width < 1024,
    isLargeScreen: width >= 1024,
  });

  useEffect(() => {
    setScreenInfo({
      width,
      height,
      isMobile: width < 600,
      isTablet: width >= 600 && width < 1024,
      isLargeScreen: width >= 1024,
    });
  }, [width, height]);

  return (
    <ResponsiveContext.Provider value={screenInfo}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export const useResponsive = (): ScreenSizeContextType => {
  const context = useContext(ResponsiveContext);
  if (!context) {
    throw new Error("useResponsive must be used within a ResponsiveProvider");
  }
  return context;
};
