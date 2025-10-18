import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { useTheme } from "@/context/theme";
import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";


interface DropDownItem {
  label: string;
  onPress: () => void;
  type?: "default" | "danger";
}

interface DropDownPickerProps {
  title: string;
  items: DropDownItem[];
}

const DropDownPicker: React.FC<DropDownPickerProps> = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonLayout, setButtonLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const { theme } = useTheme();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const themeColors = theme === "dark"
    ? { text: COLORS.textDark, bg: COLORS.backgroundDark2 }
    : { text: COLORS.textLight, bg: COLORS.backgroundLight2 };

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen]);

  const handleItemPress = (onPress: () => void) => {
    onPress();
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        style={styles.button}
        onLayout={(event) => {
          const layout = event.nativeEvent.layout;
          event.currentTarget.measure((x, y, width, height, pageX, pageY) => {
            setButtonLayout({ x: pageX, y: pageY, width, height });
          });
        }}
      >
        <Text style={[styles.title, { color: themeColors.text }]}>{title}</Text>
        <Animated.View
          style={{
            transform: [
              {
                rotate: scaleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "180deg"],
                }),
              },
            ],
          }}
        >
          <Ionicons name="chevron-down" size={20} color={themeColors.text} />
        </Animated.View>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  styles.dropdown,
                  {
                    backgroundColor: "#ffffff",
                    top: buttonLayout.y + buttonLayout.height + 8,
                    right: Dimensions.get("window").width - buttonLayout.x - buttonLayout.width,
                    opacity: opacityAnim,
                    transform: [
                      {
                        scale: scaleAnim,
                      },
                    ],
                  },
                ]}
              >
                <ScrollView style={styles.dropdownContent}>
                  {items.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleItemPress(item.onPress)}
                      style={[
                        styles.dropdownItem,
                        index === items.length - 1 && styles.lastItem,
                      ]}
                    >
                      <Text
                        style={[
                          styles.dropdownItemText,
                          item.type === "danger" && styles.dangerText,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  dropdown: {
    position: "absolute",
    minWidth: 224,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    maxHeight: 300,
  },
  dropdownContent: {
    paddingVertical: 4,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#374151",
  },
  dangerText: {
    color: "#ef4444",
  },
});

export { DropDownPicker };