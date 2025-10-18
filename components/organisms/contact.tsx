import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "@/context/theme";
import { COLORS } from "@/constants/colors";
import { Heading } from "../atoms/typogrphy/heading";
import { CustomButton } from "../button";
import { CustomAlert } from "../custom-alert";
import { FontAwesome } from '@react-native-vector-icons/fontawesome';

interface ContactSectionProps {
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  medium: string;
}

export const ContactSection = ({
  email,
  github,
  linkedin,
  medium,
}: ContactSectionProps) => {
  const [form, setForm] = useState({ name: "", email: "", project: "" });
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);

  // Alert state
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error",
  });

  const themeColors = theme === "dark" 
    ? { bg: COLORS.backgroundDark2, text: COLORS.textDark }
    : { bg: COLORS.backgroundLight2, text: COLORS.textLight };

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.project) {
      setAlert({
        show: true,
        message: "Please fill in all fields",
        type: "error",
      });
      return;
    }

    setLoading(true);

    try {
      // Note: EmailJS doesn't have official React Native support
      // You'll need to use fetch API to send emails
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: process.env.EXPO_PUBLIC_EMAILJS_SERVICE_ID,
          template_id: process.env.EXPO_PUBLIC_EMAILJS_TEMPLATE_ID,
          user_id: process.env.EXPO_PUBLIC_EMAILJS_PUBLIC_KEY,
          template_params: {
            from_name: form.name,
            from_email: form.email,
            message: form.project,
          },
        }),
      });

      if (response.ok) {
        setAlert({
          show: true,
          message: `Thanks ${form.name}, your message has been sent!`,
          type: "success",
        });
        setForm({ name: "", email: "", project: "" });
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Email Error:", error);
      setAlert({
        show: true,
        message: "Oops! Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailPress = () => {
    const mailtoLink = `mailto:${email}?subject=I need your service&body=Hello, I need your service for...`;
    Linking.openURL(mailtoLink).catch(() => {
      setAlert({
        show: true,
        message: "Could not open email client",
        type: "error",
      });
    });
  };

  const handleSocialPress = (url: string) => {
    Linking.openURL(url).catch(() => {
      setAlert({
        show: true,
        message: "Could not open link",
        type: "error",
      });
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Heading text="Contact Me" style={styles.heading} />

        {/* Contact Form */}
        <View style={[styles.form, { backgroundColor: themeColors.bg }]}>
          <TextInput
            style={[styles.input, { color: themeColors.text }]}
            placeholder="Your Name"
            placeholderTextColor="#6b7280"
            value={form.name}
            onChangeText={(value) => handleChange("name", value)}
            autoCapitalize="words"
          />
          <TextInput
            style={[styles.input, { color: themeColors.text }]}
            placeholder="Your Email"
            placeholderTextColor="#6b7280"
            value={form.email}
            onChangeText={(value) => handleChange("email", value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={[styles.textarea, { color: themeColors.text }]}
            placeholder="Tell me about your project..."
            placeholderTextColor="#6b7280"
            value={form.project}
            onChangeText={(value) => handleChange("project", value)}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />

          <View style={styles.buttonContainer}>
            <CustomButton
              onPress={handleSubmit}
              disabled={loading}

            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                "Send Message"
              )}
            </CustomButton>
            
            <CustomButton
              onPress={handleEmailPress}>
              Email Me
            </CustomButton>
          </View>
        </View>

        {/* Socials */}
        <View style={styles.socialsContainer}>
          <TouchableOpacity
            onPress={() => handleSocialPress(github)}
            style={styles.socialIcon}
          >
            <FontAwesome name="github" size={32} color={themeColors.text} />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => handleSocialPress(linkedin)}
            style={styles.socialIcon}
          >
            <FontAwesome name="linkedin" size={32} color="#0077b5" />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => handleSocialPress(medium)}
            style={styles.socialIcon}
          >
            <FontAwesome name="medium" size={32} color={themeColors.text} />
          </TouchableOpacity>
        </View>

        {/* Custom Alert */}
        <CustomAlert
          show={alert.show}
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  heading: {
    marginBottom: 20,
  },
  form: {
    width: "100%",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    width: "100%",
    fontSize: 18,
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#ffffff",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  textarea: {
    width: "100%",
    fontSize: 18,
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#ffffff",
    marginBottom: 16,
    minHeight: 120,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  buttonContainer: {
    width: "100%",
    gap: 12,
  },
  button: {
    borderRadius: 9999,
    marginBottom: 8,
  },
  socialsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    paddingVertical: 40,
  },
  socialIcon: {
    padding: 8,
  },
});