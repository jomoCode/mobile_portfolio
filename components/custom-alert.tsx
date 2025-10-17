import React, { useEffect, useRef } from "react";
import {
  Animated,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";

interface CustomAlertProps {
  message: string;
  type?: "success" | "error";
  show: boolean;
  onClose: () => void;
  duration?: number;
}

const { width } = Dimensions.get("window");

export function CustomAlert({
  message,
  type = "success",
  show,
  onClose,
  duration = 3000,
}: CustomAlertProps) {
  const translateY = useRef(new Animated.Value(100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (show) {
      // Slide in animation
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto close
      const timer = setTimeout(() => {
        hideAlert();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  const hideAlert = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  if (!show) return null;

  const backgroundColor = type === "success" ? "#22c55e" : "#ef4444";

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor,
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <TouchableOpacity
        onPress={hideAlert}
        activeOpacity={0.9}
        style={styles.touchable}
      >
        <Text style={styles.message}>{message}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 60 : 40,
    left: 20,
    right: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    maxWidth: width - 40,
    alignSelf: "center",
  },
  touchable: {
    width: "100%",
  },
  message: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});