# Mobile Portfolio (JomoCode)

A cross-platform (iOS / Android / Web) portfolio app built with Expo, React Native, and TypeScript. Demonstrates a component-driven UI, theming, responsive layout, and a simple contact form integration.

## Features
- Light / dark theme via `ThemeProvider` (`app/context/theme.tsx`) and `ThemeToggleButton` (`app/components/atoms/ThemeToggleButton.tsx`)
- Responsive layout for desktop / tablet / mobile (`app/components/Template/Home.tsx`)
- Reusable UI atoms, molecules, and organisms (buttons, alerts, project cards, images)
- Contact form sending email via EmailJS REST API (`app/components/organisms/ContactSection.tsx`)
- Code sample and project detail UIs (`CodeSample`, `ProjectInfo`)

## Quick start

1. Install dependencies
```bash
npm install
```

2. Start the dev server (Expo)
```bash
npm run start
# or
npx expo start
```

3. Run on a device / emulator
```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

See available scripts in `package.json`.

## Important files & components
- App entry: `app/index.tsx` — wraps the app with `ThemeProvider`
- Router / layout: `app/_layout.tsx`
- Main screen: `app/components/Template/Home.tsx`
- Theming: `app/context/theme.tsx`
- Colors & helpers: `COLORS` / `getThemeColors` (files)
- UI primitives: `CustomButton`, `CustomAlert`, `ProjectImage`, `TinyTextCard`, `Title`, `Text`, `ThemedLink`, `Heading`
- Organisms: `ContactSection`, `CodeSample`, `ProjectInfo`
- Layout helpers: `Section`, `SideBySideSection`

## Environment / configuration
- TypeScript: `tsconfig.json` (project uses strict mode)
- Expo config: `app.json`
- Contact form uses EmailJS public REST API. Provide these in your Expo environment (`.env` or Expo secrets):

```text
EXPO_PUBLIC_EMAILJS_SERVICE_ID
EXPO_PUBLIC_EMAILJS_TEMPLATE_ID
EXPO_PUBLIC_EMAILJS_PUBLIC_KEY
```

(See `app/components/organisms/ContactSection.tsx` for implementation details.)

## Notes & tips
- Assets referenced via `require(...)` live in `assets/images`.
- The theme hook throws if used outside the provider — ensure `ThemeProvider` wraps the root (see `app/index.tsx`).
- The project targets the Expo SDK version listed in `package.json`.

## Contributing
- Follow the component pattern: atoms → molecules → organisms → templates.
- Keep components small and stateless where possible; use context/hooks for shared state (e.g., theme).

## License
This repository is public. Do inform when utilizing.
