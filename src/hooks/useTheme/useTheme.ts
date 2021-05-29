import { useContext } from 'react';
import { ThemeContext } from 'react-native-elements';
import { Theme } from './Theme';

const useTheme = (): Theme => {
  const { theme } = useContext(ThemeContext);
  return theme as Theme;
};
export default useTheme;
