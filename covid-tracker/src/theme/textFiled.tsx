import { ThemeOptions } from '@mui/material/styles/createTheme';

const typography: ThemeOptions['typography'] = (palette) => ({
  large: {
    letterSpacing: '-0.6px'
  },
  h1: {
    letterSpacing: '-0.6px'
  },
  h2: {
    letterSpacing: '-0.6px'
  },
  h3: {
    letterSpacing: '-0.2px'
  },
  h4: {
    letterSpacing: 0
  },
  h5: {
    letterSpacing: 0
  },
  h6: {
    letterSpacing: '-0.05px'
  },
  subtitle1: {
    letterSpacing: '-0.05px'
  },
  subtitle2: {
    letterSpacing: '-0.05px'
  },
  body1: {
    letterSpacing: '-0.04px'
  },
  body2: {
    letterSpacing: '-0.04px'
  },
  bodySmall: {
    fontSize: '0.75rem',
    letterSpacing: '-0.04px'
  },
  button: {},
  caption: {
    letterSpacing: '0.33px'
  },
  overline: {
    letterSpacing: '-0.04px'
  },
  label: {
    letterSpacing: '-0.04px'
  },
  navLink: {
    fontSize: '14px'
  }
});

export default typography;
