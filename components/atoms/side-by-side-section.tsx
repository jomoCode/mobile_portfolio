import React, { ReactNode } from "react";
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";

interface SideBySideSectionProps {
  left?: ReactNode;
  right?: ReactNode;
  style?: StyleProp<ViewStyle>;
  leftStyle?: StyleProp<ViewStyle>;
  rightStyle?: StyleProp<ViewStyle>;
  scrollable?: boolean;
  gap?: number;
  sideBySideContainerHeight?: number;
}

const SideBySideSection: React.FC<SideBySideSectionProps> = ({
  left,
  right,
  style,
  leftStyle,
  rightStyle,
  scrollable = false,
  gap = 20,
  sideBySideContainerHeight,
}) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  // Define dynamic breakpoints (like in CSS)
  const isTablet = screenWidth >= 768;
  const isLargeScreen = screenWidth >= 1024;

  // Dynamically adjust container dimensions
  const containerWidth = isLargeScreen
    ? screenWidth * 0.8
    : isTablet
    ? screenWidth * 0.9
    : screenWidth * 0.95;

  const containerHeight = isLargeScreen
    ? sideBySideContainerHeight || screenHeight * 0.8
    : isTablet
    ? sideBySideContainerHeight || screenHeight * 0.7
    : sideBySideContainerHeight || screenHeight * 0.6;

  const Wrapper = scrollable ? ScrollView : View;

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: isTablet ? "row" : "column",
          gap,
          width: containerWidth,
          height: containerHeight,
        },
        style,
      ]}
    >
      <Wrapper
        style={[
          styles.side,
          isTablet && styles.halfWidth,
          { paddingVertical: 10 },
          leftStyle,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {left}
      </Wrapper>

      <Wrapper
        style={[styles.side, isTablet && styles.halfWidth, rightStyle]}
        showsVerticalScrollIndicator={false}
      >
        {right}
      </Wrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "stretch",
  },
  side: {
    flex: 1,
  },
  halfWidth: {
    width: "50%",
  },
});

export { SideBySideSection };
