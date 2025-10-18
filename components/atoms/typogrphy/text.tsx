import React, { ReactNode } from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useTheme } from "@/context/theme";
import { COLORS } from "@/constants/colors";

// Title Component
interface TitleProps extends RNTextProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text, style, ...rest }) => {
  const { theme } = useTheme();
  const textColor = theme === "dark" ? COLORS.textDark : COLORS.textLight;

  return (
    <RNText style={[styles.title, { color: textColor }, style]} {...rest}>
      {text}
    </RNText>
  );
};

// Text Component
type TextVariant = "sm" | "md" | "lg" | "xl" | "2xl";

interface TextComponentProps extends RNTextProps {
  children: ReactNode;
  variant?: TextVariant;
}

const Text: React.FC<TextComponentProps> = ({
  children,
  variant = "md",
  style,
  ...rest
}) => {
  const { theme } = useTheme();
  const textColor = theme === "dark" ? COLORS.textDark : COLORS.textLight;

  const variantStyles = {
    sm: styles.textSm,
    md: styles.textMd,
    lg: styles.textLg,
    xl: styles.textXl,
    "2xl": styles.text2Xl,
  };

  return (
    <RNText
      style={[
        styles.textBase,
        variantStyles[variant],
        { color: textColor },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
};

// ThemedLink Component
interface ThemedLinkProps extends RNTextProps {
  href: string;
  children: ReactNode;
  onPress?: () => void;
}

const ThemedLink: React.FC<ThemedLinkProps> = ({
  href,
  children,
  style,
  onPress,
  ...rest
}) => {
  const { theme } = useTheme();
  const textColor = theme === "dark" ? COLORS.textDark : COLORS.textLight;

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      Linking.openURL(href).catch((err) =>
        console.error("Failed to open URL:", err)
      );
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <RNText
        style={[styles.link, { color: textColor }, style]}
        {...rest}
      >
        {children}
      </RNText>
    </TouchableOpacity>
  );
};

// TextContainer Component
interface TextContainerProps extends RNTextProps {
  children: ReactNode;
}

const TextContainer: React.FC<TextContainerProps> = ({
  children,
  style,
  ...rest
}) => {
  const { theme } = useTheme();
  const textColor = theme === "dark" ? COLORS.textDark : COLORS.textLight;

  return (
    <RNText
      style={[styles.textContainer, { color: textColor }, style]}
      {...rest}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20, // text-xl
    fontWeight: "600",
  },
  textBase: {
    width: "100%",
  },
  textSm: {
    fontSize: 14,
  },
  textMd: {
    fontSize: 16,
  },
  textLg: {
    fontSize: 18,
  },
  textXl: {
    fontSize: 20,
    fontWeight: "600",
  },
  text2Xl: {
    fontSize: 24,
    fontWeight: "bold",
  },
  link: {
    fontSize: 20,
    textDecorationLine: "underline",
  },
  textContainer: {
    fontSize: 20,
    width: "100%",
  },
});

export { Text, Title, ThemedLink, TextContainer };