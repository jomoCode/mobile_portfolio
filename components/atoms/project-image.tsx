import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  ImageSourcePropType,
} from "react-native";

interface ProjectImageProps {
  src: string | ImageSourcePropType;
  alt: string;
  aspectRatio?: number;
  onPress?: () => void;
}

export const ProjectImage: React.FC<ProjectImageProps> = ({ 
  src, 
  alt,
  aspectRatio = 1,
  onPress,
}) => {
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 1.05,
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

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  const imageSource = typeof src === "string" ? { uri: src } : src;

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
      >
        <Animated.View
          style={[
            styles.imageWrapper,
            { aspectRatio },
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Image
            source={imageSource}
            accessibilityLabel={alt}
            style={styles.image}
            resizeMode="contain"
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
  },
  imageWrapper: {
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});