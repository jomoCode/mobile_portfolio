import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
  TouchableOpacityProps,
} from "react-native";
import { useTheme } from "@/context/theme";
import { COLORS } from "@/constants/colors";

interface CustomButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  style,
  textStyle,
  ...rest
}) => {
  const { theme } = useTheme();
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const colors = COLORS[theme];

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        {...rest}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
        style={[
          styles.button,
          { backgroundColor: colors.background },
          style,
        ]}
      >
        {typeof children === "string" ? (
          <Text style={[styles.text, { color: colors.text }, textStyle]}>
            {children}
          </Text>
        ) : (
          children
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export { CustomButton };