// components/ThemeToggleButton.tsx
import { COLORS } from "@/constants/colors";
import { useTheme } from "@/context/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface ThemeToggleButtonProps {
  style?: ViewStyle;
  size?: number;
  showBackground?: boolean;
}

export const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
  style,
  size = 24,
  showBackground = true,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [rotateAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    // Rotate when theme changes
    Animated.timing(rotateAnim, {
      toValue: theme === "dark" ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [theme]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.85,
      tension: 100,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 100,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const themeColors =
    theme === "dark"
      ? {
          bg: COLORS.backgroundDark2,
          text: COLORS.textDark,
        }
      : {
          bg: COLORS.backgroundLight2,
          text: COLORS.textLight,
        };

  const iconName = theme === "dark" ? "sunny" : "moon";

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.button,
        showBackground && { backgroundColor: themeColors.bg },
        style,
      ]}
      activeOpacity={0.7}
      accessibilityLabel={`Switch to ${
        theme === "dark" ? "light" : "dark"
      } mode`}
      accessibilityRole="button"
    >
      <Animated.View
        style={{
          transform: [{ rotate: rotation }, { scale: scaleAnim }],
        }}
      >
        <Ionicons name={iconName} size={size} color={themeColors.text} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
  },
});
