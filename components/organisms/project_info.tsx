// components/ProjectInfo.tsx
import React from "react";
import {
  View,
  StyleSheet,
  Linking,
  useWindowDimensions,
} from "react-native";
import { Text, Title } from "../atoms/typogrphy/text";
import { CustomButton } from "../button"; 
import { useTheme } from "@/context/theme";
import { COLORS } from "@/constants/colors";

interface ProjectInfoProps {
  title: string;
  description: string;
  tech: string[];
  liveLink: string;
}

export const ProjectInfo: React.FC<ProjectInfoProps> = ({
  title,
  description,
  tech,
  liveLink,
}) => {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  
  const isMdOrLarger = width > 768;

  const getContainerBackground = () => {
    if (theme === "dark") {
      return isMdOrLarger ? COLORS.backgroundDark1 : "rgba(59, 130, 246, 0.1)";
    }
    return isMdOrLarger ? COLORS.backgroundLight1 : "rgba(59, 130, 246, 0.1)";
  };

  const techBadgeColor = theme === "dark" 
    ? COLORS.backgroundDark2 
    : COLORS.backgroundLight2;
  
  const techTextColor = theme === "dark" 
    ? COLORS.textDark 
    : COLORS.textLight;

  const handleOpenLink = () => {
    Linking.openURL(liveLink).catch((err) => {
      console.error("Failed to open URL:", err);
      // You could show an alert here
    });
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: getContainerBackground(),
          padding: isMdOrLarger ? 0 : 8,
        },
      ]}
    >
      {/* Title */}
<Title text={title} style={{textAlign:"center"}}/>

      {/* Description */}
      <Text variant="md" style={styles.description}>
        {description}
      </Text>

      {/* Tech Stack */}
      <View style={styles.techContainer}>
        {tech.map((item, index) => (
          <View
            key={`${item}-${index}`}
            style={[
              styles.techBadge,
              { backgroundColor: techBadgeColor },
            ]}
          >
            <Text
              variant="sm"
              style={{ color: techTextColor }}
              numberOfLines={1}
            >
              {item}
            </Text>
          </View>
        ))}
      </View>

      {/* Live Project Button */}
      <CustomButton onPress={handleOpenLink} style={styles.button}>
        Live Project
      </CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 8,
  },
  title: {
    textAlign: "center",
    paddingVertical: 8,
    fontWeight: "600",
  },
  description: {
    textAlign: "left",
    paddingVertical: 8,
    lineHeight: 22,
  },
  techContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginVertical: 20,
  },
  techBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  button: {
    marginTop: 4,
  },
});