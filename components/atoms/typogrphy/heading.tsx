import React from "react";
import { Text, TextStyle, StyleSheet, TextProps } from "react-native";
import { useTheme } from "@/context/theme";
import { COLORS } from "@/constants/colors";

type HeadingProps = TextProps & {
  text: string;
  style?: TextStyle;
};

const Heading: React.FC<HeadingProps> = ({ text, style, ...rest }) => {
  const { theme } = useTheme();
  const themeColor = theme === "dark" ? COLORS.textDark : COLORS.textLight;

  return (
    <Text
      style={[
        styles.heading,
        { color: themeColor },
        style,
      ]}
      {...rest}
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export {Heading};