import { COLORS } from "@/constants/colors";
import { useTheme } from "@/context/theme";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Text } from "./typogrphy/text";

interface TinyTextCardProps {
  text: string;
  style?: ViewStyle;
}

const TinyTextCard: React.FC<TinyTextCardProps> = ({ text, style }) => {
  const { theme } = useTheme();

  const backgroundColor =
    theme === "dark" ? COLORS.backgroundDark1 : COLORS.backgroundLight1;

  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <Text variant="sm" style={styles.text}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    alignSelf: "flex-start",
  },
  text: {
    color: "#1f2937",
  },
});

export { TinyTextCard };
