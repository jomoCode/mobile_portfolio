import { useResponsive } from "@/context/screenContext";

/**
 * A hook to get a responsive value based on screen size.
 *
 * @param base - either a single number (base value) or an object specifying
 *               values for each screen size.
 * @param options - optional scaling multipliers for tablet and large screens.
 *
 * @example
 * responsiveValue(10)
 * responsiveValue({ mobile: 10, tablet: 14, large: 18 })
 */
export const useResponsiveValue = (
  base:
    | number
    | {
        mobile?: number;
        tablet?: number;
        large?: number;
      },
  options?: {
    tabletScale?: number;
    largeScale?: number;
  }
): number => {
  const { isMobile, isTablet, isLargeScreen } = useResponsive();

  const { tabletScale = 1.2, largeScale = 1.4 } = options || {};

  if (typeof base === "object") {
    if (isLargeScreen && base.large !== undefined) return base.large;
    if (isTablet && base.tablet !== undefined) return base.tablet;
    return base.mobile ??  base.tablet ?? base.large ?? 0;
  }

  if (typeof base === "number") {
    if (isLargeScreen) return base * largeScale;
    if (isTablet) return base * tabletScale;
    return base;
  }

  return 0;
};
