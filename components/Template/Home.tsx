// screens/HomeScreen.tsx
import { COLORS } from "@/constants/colors";
import { useTheme } from "@/context/theme";
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { ProjectImage } from "../atoms/project-image";
import { Section } from "../atoms/section";
import { SideBySideSection } from "../atoms/side-by-side-section";
import { ThemeToggleButton } from "../atoms/ThoggleThemeButton";
import { Heading } from "../atoms/typogrphy/heading";
import { Text, TextContainer, Title } from "../atoms/typogrphy/text";
import { CodeSample } from "../organisms/code-sample";
import { ContactSection } from "../organisms/contact";
import { ProjectInfo } from "../organisms/project_info";

const profileIntroduction = "Hello, I&apos;m Jomo";
const profileSummary =
  "Full-stack mobile and web developer specializing in JavaScript, React, and Python. I build clean, responsive interfaces with a focus on performance, scalability, and exceptional user experiences";

const DescriptionDesktop = () => (
  <View>
    <Text style={styles.justifyText}>
      I&apos;m JomoCode — a full-stack web and mobile developer.
    </Text>

    <Text style={styles.justifyText}>
      I specialize in crafting responsive front-ends and robust back-end
      systems. I&apos;ve delivered ecommerce platforms, mobile applications,
      content-driven websites, and real-time notification systems — all with
      clean, maintainable code optimized for performance.
    </Text>

    <Text style={styles.justifyText}>
      From planning to deployment, I keep clients fully in the loop with
      organized workflows in Trello, Slack, GitHub, and Confluence, ensuring
      progress is transparent and collaboration is seamless.
    </Text>

    <View style={styles.spacing} />

    <TextContainer>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          • I offer, a tested, working project delivered within the agreed
          timeframe.
        </Text>
        <Text style={styles.listItem}>
          • Adaptable, well-documented code with testing flows for smooth
          handovers, refactors, and updates
        </Text>
        <Text style={styles.listItem}>
          • Clear communication and regular updates at every stage
        </Text>
      </View>
    </TextContainer>

    <View style={styles.spacing} />

    <Text style={styles.justifyText}>
      Simply put: I design, build, and deliver — taking your project from first
      brainstorm to final launch with precision and professionalism.
    </Text>
  </View>
);

const DescriptionMobile = () => (
  <View style={styles.aboutContainer}>
    <Text style={styles.leftText}>
      I&apos;m JomoCode — a full-stack web and mobile developer.
    </Text>
    <Text style={styles.leftText}>
      With 2+ years of experience, I specialize in building responsive,
      scalable, and modern applications that deliver seamless user experiences.
    </Text>
    <Text style={styles.leftText}>
      I&apos;m passionate about turning ideas into functional solutions that
      help businesses and individuals succeed.
    </Text>
  </View>
);

const HomeScreen = () => {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const isMdOrLarger = width > 768;

  const backgroundColor =
    theme === "dark" ? COLORS.backgroundDark1 : COLORS.backgroundLight1;

  const profileImage =
    theme === "dark"
      ? require("@/assets/images/dark_mode_profile_image.png")
      : require("@/assets/images/bright_mode_profile_image.png");

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Theme Toggle Button */}
      <View style={styles.themeToggle}>
        <ThemeToggleButton />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* SUMMARY SECTION */}
        <Section name="summary" style={styles.summarySection}>
          <View style={{ width: "100%" }}>
            <Heading text="Mogbolu John" style={styles.textLeftAlign} />
            <Title
              text="Mobile and web developer"
              style={styles.textLeftAlign}
            />
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={profileImage}
              alt="Profile image of JomoCode"
              style={styles.profileImage}
              resizeMode="contain"
              height={250}
              width={350}
            />
          </View>
        </Section>

        {/* ABOUT SECTION */}
        <View style={styles.aboutWrapper}>
          <Section
            name="about"
            bg_dark={COLORS.backgroundDark2}
            bg_light={COLORS.backgroundLight2}
            style={[
              styles.aboutSection,
              isMdOrLarger
                ? styles.aboutPaddingDesktop
                : styles.aboutPaddingMobile,
            ]}
          >
            <Heading text="About me" style={styles.aboutHeading} />
            {isMdOrLarger ? <DescriptionDesktop /> : <DescriptionMobile />}
          </Section>
        </View>

        {/* SKILLS AND EXPERIENCE SECTION */}
        <Section
          name="Skill"
          style={[
            styles.skillsSection,
            isMdOrLarger && styles.skillsSectionDesktop,
          ]}
        >
          <Title text="Code Samples" style={styles.sectionTitle} />

          <CodeSample
            title="Task Tracker"
            description="Tracks Adherance to tasks. includes local file storage, local notifications, and calendar integration"
            tech={["React Native", "TypeScript", "Bugsnag", "Expo"]}
            githubUrl="https://github.com/jomoCode/Task_Tracker"
          />

          <View style={styles.codeSampleSpacing} />

          <CodeSample
            title="Portfolio Website"
            description="web portfolio"
            tech={["React", "TypeScript", "Tailwind"]}
            githubUrl="https://github.com/jomoCode/Web-portfolio"
          />

          <View style={styles.codeSampleSpacing} />

          <CodeSample
            title="Ecommerce Website"
            description="A mobile ecommerce app for selling used items. Includes authentication, image uploads, notifications, and error tracking."
            tech={["Javascript", "Html", "css"]}
            githubUrl="https://github.com/jomoCode/FashionShop"
          />

          <Heading text="Projects" style={styles.projectsHeading} />

          {/* PROJECT 1 */}
          <SideBySideSection
          sideBySideContainerHeight={500}
            left={
              <ProjectInfo
                title="Fashion shop"
                description="A fully responsive online store with product listings, cart functionality, checkout, and an admin dashboard."
                tech={["Html", "CSS", "javascript"]}
                liveLink="https://jomocode.github.io/FashionShop/"
              />
            }
            right={
              <ProjectImage
                src={require("@/assets/images/fashionshop.png")}
                alt="Ecommerce Website"
                aspectRatio={16 / 9}
              />
            }
            style={styles.projectSpacing}
          />

          {/* PROJECT 2 */}
          <SideBySideSection
            sideBySideContainerHeight={600}
            left={
              <ProjectInfo
                title="Ecommerce Website"
                description="A fully responsive online store with product listings, cart functionality, checkout, and an admin dashboard."
                tech={["Next.js", "Tailwind CSS", "Node.js", "MongoDB"]}
                liveLink="https://myprojectlive.com"
              />
            }
            right={
              <ProjectImage
                src={require("@/assets/images/ecommerce.webp")}
                alt="Ecommerce Website"
                aspectRatio={16 / 9}
              />
            }
            style={styles.projectSpacing}
          />
        </Section>

        {/* CONTACT SECTION */}
        <Section name="contact" style={{paddingTop:5}}>
          <ContactSection
            email="johnjohananmogbolu@gmail.com"
            github="https://github.com/Jomocode"
            linkedin="https://www.linkedin.com/in/mogbolu-johnjohanan/"
            twitter="https://twitter.com/yourhandle"
            medium="https://medium.com/@johnjohananmogbolu"
          />
        </Section>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 80 : 60,
    paddingBottom: 40,
  },
  themeToggle: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    right: 20,
    zIndex: 1000,
  },
  summarySection: {
    paddingBottom: 0,
  },
  leftContent: {
    height: "100%",
  },
  desktopIntro: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 450,
    maxWidth: 512,
  },
  textLeft: {
    alignSelf: "flex-start",
    width: "100%",
  },
  textLeftAlign: {
    textAlign: "left",
  },
  introTitle: {
    fontSize: 14,
    paddingVertical: 8,
  },
  summaryText: {
    marginBottom: 40,
  },
  imageContainer: {
    alignItems: "center",
    width: "100%",
  },
  profileImage: {},
  aboutWrapper: {
    width: "100%",
    marginBottom: 40,
  },
  aboutSection: {
    paddingTop: 30,
    width: "100%",
    paddingBottom:50
  },
  aboutPaddingDesktop: {
    paddingHorizontal: 160,
  },
  aboutContainer: {
    width: "100%",
    gap: 5,
  },
  aboutPaddingMobile: {
    paddingHorizontal: 20,
  },
  aboutHeading: {
    textAlign: "center",
    paddingVertical: 20,
    paddingHorizontal: 8,
  },
  justifyText: {
    textAlign: "justify",
    marginBottom: 12,
  },
  leftText: {
    textAlign: "left",
  },
  spacing: {
    marginVertical: 20,
  },
  list: {
    paddingLeft: 20,
  },
  listItem: {
    textAlign: "justify",
    marginBottom: 8,
  },
  skillsSection: {
    flexDirection: "column",
    gap: 8,
    width: "100%",
    paddingHorizontal: 20,
  },
  skillsSectionDesktop: {
    marginBottom: 80,
  },
  sectionTitle: {
    textAlign: "center",
    marginBottom: 16,
  },
  codeSampleSpacing: {
    height: 16,
  },
  projectsHeading: {
    marginTop: 80,
    marginBottom: 20,
  },
  projectSpacing: {
    marginBottom: 20,
  },
});

export default HomeScreen;
