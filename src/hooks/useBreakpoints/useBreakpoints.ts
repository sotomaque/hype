import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';
// import useTheme from '../useTheme';

const useBreakpoints = (): {
  isHandset?: boolean;
  isHandsetOrTablet?: boolean;
  isTablet?: boolean;
  isTabletOrDesktop?: boolean;
  isDesktop?: boolean;
  isLargeDesktop?: boolean;
} => {
  const xSmall = { max: 719 };
  const small = { min: 720, max: 1023 };
  const medium = { min: 1024, max: 1439 };
  const large = { min: 1440, max: 1919 };
  const xLarge = { min: 1920 };
  // const theme = useTheme();
  // const { xSmall, small, medium, large, xLarge } = theme.breakpoints;

  const isHandset = useMediaQuery({ maxWidth: xSmall.max });
  const isHandsetOrTablet = useMediaQuery({
    minWidth: small.min,
    maxWidth: small.max,
  });
  const isTabletOrDesktop = useMediaQuery({
    minWidth: medium.min,
    maxWidth: medium.max,
  });
  const isDesktop = useMediaQuery({ minWidth: large.min, maxWidth: large.max });
  const isLargeDesktop = useMediaQuery({ minWidth: xLarge.min });

  return {
    isHandset,
    isHandsetOrTablet,
    isTablet: isHandsetOrTablet || isTabletOrDesktop,
    isTabletOrDesktop,
    isDesktop: isDesktop || isLargeDesktop,
    isLargeDesktop,
  };
};

export default useBreakpoints;
