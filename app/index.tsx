import HomeScreen from "@/components/Template/Home";
import { ResponsiveProvider } from "@/context/screenContext";
import { ThemeProvider } from "@/context/theme";

export default function Index() {
  return (
    <ThemeProvider>
      <ResponsiveProvider>
      <HomeScreen />
      </ResponsiveProvider>
    </ThemeProvider>
  );
}
