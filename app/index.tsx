import HomeScreen from "@/components/Template/Home";
import { ThemeProvider } from "@/context/theme";

export default function Index() {
  return (
    <ThemeProvider>
      <HomeScreen />
    </ThemeProvider>
  );
}
