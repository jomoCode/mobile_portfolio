import React from "react";
import { View, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Text, Title } from "../atoms/typogrphy/text";
import { TinyTextCard } from "../atoms/TinyTextCard"; 
import { useTheme } from "@/context/theme"; 
import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";

interface CodeSampleProps {
  title: string;
  description: string;
  tech: string[];
  githubUrl?: string;
}

const CodeSample: React.FC<CodeSampleProps> = ({
  title,
  description,
  tech,
  githubUrl,
}) => {
  const { theme } = useTheme();

  const themeColors = theme === "dark"
    ? {
        bg: COLORS.backgroundDark2,
        border: `${COLORS.backgroundLight1}4D`, // 30% opacity
        iconColor: "#d1d5db", // gray-300
        iconHoverColor: "#ffffff",
      }
    : {
        bg: COLORS.backgroundLight2,
        border: `${COLORS.backgroundLight1}4D`, // 30% opacity
        iconColor: "#4b5563", // gray-600
        iconHoverColor: "#000000",
      };

  const handleGithubPress = () => {
    if (githubUrl) {
      Linking.openURL(githubUrl).catch((err) =>
        console.error("Failed to open GitHub URL:", err)
      );
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColors.bg,
          borderColor: themeColors.border,
        },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Title text={title} style={styles.title} />
        {githubUrl && (
          <TouchableOpacity
            onPress={handleGithubPress}
            activeOpacity={0.7}
            accessibilityLabel="Open GitHub repository"
            accessibilityRole="button"
          >
            <Ionicons
              name="logo-github"
              size={24}
              color={themeColors.iconColor}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Description */}
      <Text style={styles.description}>{description}</Text>

      {/* Tech Stack */}
      <View style={styles.techContainer}>
        {tech.map((techItem, index) => (
          <TinyTextCard
            key={`${techItem}-${index}`}
            text={techItem}
            style={styles.techCard}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 2,
    width: "100%",
    minWidth: 280,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontWeight: "bold",
  },
  description: {
    textAlign: "left",
    marginBottom: 12,
  },
  techContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    gap: 8,
  },
  techCard: {
    margin: 4,
  },
});

export {CodeSample};