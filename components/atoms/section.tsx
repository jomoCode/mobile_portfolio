import { COLORS } from "@/constants/colors";
import { useTheme } from "@/context/theme";
import React, { ReactNode } from "react";
import { StyleSheet, useWindowDimensions, View,} from "react-native";


interface SectionProps {
  children: ReactNode;
  name: string;
  bg_dark?: string;
  bg_light?: string;
  style?: any;
}

const Section: React.FC<SectionProps> = ({
  children,
  name,
  bg_dark,
  bg_light,
  style,
}) => {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();

  // Check if screen is md or larger (768px)
  const isMdOrLarger = width > 768;

  // Get background color based on theme
  const backgroundColor =
    theme === "dark"
      ? bg_dark ?? COLORS.backgroundDark1
      : bg_light ?? COLORS.backgroundLight1;



  // Calculate width (80% of screen)
  const sectionWidth = width * 0.8;

  return (
    <View
      accessibilityLabel={`${name} section`}
      style={[
        styles.base,
        styles.col,
        {
          backgroundColor,
          width: sectionWidth,
          paddingHorizontal: isMdOrLarger ? 40 : 0,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 20,
  },
  col: {
    flexDirection: "column",
    alignItems: "center",
  },
});

export { Section };
