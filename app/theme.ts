'use client';

import { createTheme } from '@mui/material/styles';
import { faIR } from '@mui/material/locale';

const langoColors = {
  primary: {
    main: '#168BFF',
    light: '#E8F3FF',
    dark: '#0870D1',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#FF4D57',
    light: '#FFF0F1',
    dark: '#D93642',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#18A957',
    light: '#E9F8EF',
    dark: '#117A3E',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#F2BD32',
    light: '#FFF8E5',
    dark: '#B9850C',
    contrastText: '#292929',
  },
  info: {
    main: '#16A6C9',
    light: '#E8F8FC',
    dark: '#087D9B',
    contrastText: '#FFFFFF',
  },
  text: {
    primary: '#172B4D',
    secondary: '#66758A',
    disabled: '#A0AABA',
  },
  background: {
    default: '#F6F9FD',
    paper: '#FFFFFF',
  },
  divider: '#E7EDF5',
};

const theme = createTheme(
  {
    direction: 'rtl',

    palette: {
      mode: 'light',
      ...langoColors,
      common: {
        black: '#101828',
        white: '#FFFFFF',
      },
      grey: {
        50: '#F8FAFC',
        100: '#F1F5F9',
        200: '#E7EDF5',
        300: '#D5DDE8',
        400: '#A0AABA',
        500: '#7C899B',
        600: '#66758A',
        700: '#475569',
        800: '#29384D',
        900: '#172B4D',
      },
      action: {
        active: '#475569',
        hover: 'rgba(22, 139, 255, 0.055)',
        selected: 'rgba(22, 139, 255, 0.10)',
        disabled: '#A0AABA',
        disabledBackground: '#EEF2F6',
        focus: 'rgba(22, 139, 255, 0.16)',
      },
    },

    typography: {
      // Roboto's Latin subset leaves Persian glyphs to the local Mikhak font.
      fontFamily: 'Roboto, var(--font-mikhak), sans-serif',
      fontSize: 14,
      htmlFontSize: 16,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,

      h1: {
        fontSize: '2.25rem',
        lineHeight: 1.5,
        fontWeight: 800,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontSize: '1.875rem',
        lineHeight: 1.55,
        fontWeight: 800,
      },
      h3: {
        fontSize: '1.5rem',
        lineHeight: 1.6,
        fontWeight: 700,
      },
      h4: {
        fontSize: '1.25rem',
        lineHeight: 1.7,
        fontWeight: 700,
      },
      h5: {
        fontSize: '1.125rem',
        lineHeight: 1.7,
        fontWeight: 700,
      },
      h6: {
        fontSize: '1rem',
        lineHeight: 1.7,
        fontWeight: 700,
      },
      subtitle1: {
        fontSize: '0.9375rem',
        lineHeight: 1.9,
        fontWeight: 600,
      },
      subtitle2: {
        fontSize: '0.8125rem',
        lineHeight: 1.8,
        fontWeight: 600,
      },
      body1: {
        fontSize: '0.9375rem',
        lineHeight: 2,
      },
      body2: {
        fontSize: '0.8125rem',
        lineHeight: 1.9,
      },
      button: {
        fontSize: '0.875rem',
        lineHeight: 1.7,
        fontWeight: 700,
        textTransform: 'none',
      },
      caption: {
        fontSize: '0.75rem',
        lineHeight: 1.8,
      },
      overline: {
        fontSize: '0.6875rem',
        lineHeight: 1.8,
        fontWeight: 700,
        letterSpacing: 0,
      },
    },

    shape: {
      borderRadius: 14,
    },

    spacing: 8,

    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: (theme) => ({
          '*': {
            boxSizing: 'border-box',
          },
          html: {
            direction: theme.direction,
            scrollBehavior: 'smooth',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          },
          body: {
            direction: 'inherit',
            textAlign: theme.direction === 'rtl' ? 'right' : 'left',
            margin: 0,
            backgroundColor: langoColors.background.default,
            color: langoColors.text.primary,
            fontFamily: 'Roboto, var(--font-mikhak), sans-serif',
          },
          'button, input, textarea, select': {
            font: 'inherit',
          },
          '::selection': {
            backgroundColor: 'rgba(22, 139, 255, 0.18)',
            color: langoColors.text.primary,
          },
          'a': {
            color: langoColors.primary.main,
            textDecoration: 'none',
          },
          '[dir="ltr"]': {
            direction: 'ltr',
            textAlign: 'left',
            unicodeBidi: 'isolate',
          },
          '[dir="rtl"]': {
            direction: 'rtl',
            textAlign: 'right',
            unicodeBidi: 'isolate',
          },
          '.lango-scrollbar': {
            scrollbarWidth: 'thin',
            scrollbarColor: '#CBD5E1 transparent',
          },
          '.lango-scrollbar::-webkit-scrollbar': {
            width: 6,
            height: 6,
          },
          '.lango-scrollbar::-webkit-scrollbar-thumb': {
            background: '#CBD5E1',
            borderRadius: 999,
          },
        }),
      },

      MuiStack: {
        defaultProps: {
          // Native gaps work in both directions without mirrored margins.
          useFlexGap: true,
        },
      },

      MuiTypography: {
        defaultProps: {
          align: 'inherit',
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            minHeight: 42,
            borderRadius: 11,
            padding: '9px 18px',
            boxShadow: 'none',
            transition: 'all 160ms ease',
            '&:hover': {
              boxShadow: 'none',
              transform: 'translateY(-1px)',
            },
            '&.Mui-disabled': {
              backgroundColor: '#EEF2F6',
              color: '#A0AABA',
            },
            '&.MuiButton-contained.MuiButton-colorPrimary:hover': {
              backgroundColor: langoColors.primary.dark,
            },
          },
          outlined: {
            borderColor: '#DCE5F0',
            '&:hover': {
              borderColor: langoColors.primary.main,
              backgroundColor: 'rgba(22, 139, 255, 0.04)',
            },
          },
          sizeSmall: {
            minHeight: 34,
            padding: '5px 12px',
            borderRadius: 9,
          },
          sizeLarge: {
            minHeight: 48,
            padding: '11px 22px',
            borderRadius: 13,
          },
        },
      },

      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            '&:hover': {
              backgroundColor: 'rgba(22, 139, 255, 0.08)',
            },
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            border: '1px solid #EAF0F6',
            borderRadius: 18,
            boxShadow: '0 3px 16px rgba(23, 43, 77, 0.035)',
            backgroundImage: 'none',
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          rounded: {
            borderRadius: 16,
          },
          elevation1: {
            boxShadow: '0 3px 16px rgba(23, 43, 77, 0.045)',
          },
          elevation2: {
            boxShadow: '0 8px 28px rgba(23, 43, 77, 0.08)',
          },
        },
      },

      MuiTextField: {
        defaultProps: {
          fullWidth: true,
          variant: 'outlined',
          size: 'medium',
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 11,
            backgroundColor: '#FFFFFF',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#DCE5F0',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#A9CFF5',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: langoColors.primary.main,
              borderWidth: 1.5,
            },
          },
          input: {
            padding: '13px 14px',
            '&::placeholder': {
              color: '#A0AABA',
              opacity: 1,
            },
          },
        },
      },

      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontWeight: 500,
          },
        },
      },

      MuiFormHelperText: {
        styleOverrides: {
          root: {
            textAlign: 'inherit',
            marginRight: 2,
            marginLeft: 2,
            fontSize: '0.72rem',
          },
        },
      },

      MuiCheckbox: {
        styleOverrides: {
          root: {
            borderRadius: 7,
            color: '#AAB6C5',
            '&.Mui-checked': {
              color: langoColors.primary.main,
            },
          },
        },
      },

      MuiRadio: {
        styleOverrides: {
          root: {
            color: '#AAB6C5',
            '&.Mui-checked': {
              color: langoColors.primary.main,
            },
          },
        },
      },

      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            '&.Mui-checked': {
              color: langoColors.primary.main,
              '& + .MuiSwitch-track': {
                backgroundColor: langoColors.primary.main,
                opacity: 0.45,
              },
            },
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 9,
            fontWeight: 600,
          },
          colorPrimary: {
            backgroundColor: langoColors.primary.light,
            color: langoColors.primary.dark,
          },
          colorSuccess: {
            backgroundColor: langoColors.success.light,
            color: langoColors.success.dark,
          },
          colorWarning: {
            backgroundColor: langoColors.warning.light,
            color: '#8A650B',
          },
          colorError: {
            backgroundColor: langoColors.secondary.light,
            color: langoColors.secondary.dark,
          },
        },
      },

      MuiTabs: {
        styleOverrides: {
          root: {
            minHeight: 44,
          },
          indicator: {
            height: 3,
            borderRadius: 3,
          },
        },
      },

      MuiTab: {
        styleOverrides: {
          root: {
            minHeight: 44,
            fontWeight: 600,
            textTransform: 'none',
          },
        },
      },

      MuiLinearProgress: {
        styleOverrides: {
          root: {
            height: 8,
            borderRadius: 99,
            backgroundColor: '#EAF1F8',
          },
          bar: {
            borderRadius: 99,
          },
        },
      },

      MuiCircularProgress: {
        styleOverrides: {
          circle: {
            strokeLinecap: 'round',
          },
        },
      },

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: 8,
            padding: '7px 11px',
            fontSize: '0.75rem',
            fontWeight: 500,
            backgroundColor: '#172B4D',
          },
          arrow: {
            color: '#172B4D',
          },
        },
      },

      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            alignItems: 'center',
          },
          message: {
            padding: '4px 0',
          },
        },
      },

      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 20,
            backgroundImage: 'none',
          },
        },
      },

      MuiMenu: {
        styleOverrides: {
          paper: {
            marginTop: 6,
            border: '1px solid #EAF0F6',
            borderRadius: 12,
            boxShadow: '0 10px 32px rgba(23, 43, 77, 0.10)',
          },
        },
      },

      MuiMenuItem: {
        styleOverrides: {
          root: {
            minHeight: 42,
            borderRadius: 8,
            margin: '2px 6px',
          },
        },
      },

      MuiTableCell: {
        styleOverrides: {
          head: {
            color: '#66758A',
            backgroundColor: '#F8FAFC',
            fontWeight: 700,
            whiteSpace: 'nowrap',
          },
          root: {
            borderColor: '#EAF0F6',
            padding: '13px 16px',
          },
        },
      },

      MuiAccordion: {
        styleOverrides: {
          root: {
            border: '1px solid #EAF0F6',
            borderRadius: '12px !important',
            boxShadow: 'none',
            '&:before': {
              display: 'none',
            },
            '& + &': {
              marginTop: 10,
            },
          },
        },
      },

      MuiPaginationItem: {
        styleOverrides: {
          root: {
            borderRadius: 9,
            fontWeight: 600,
          },
          page: {
            borderColor: '#E7EDF5',
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#FFFFFF',
            color: langoColors.text.primary,
            backgroundImage: 'none',
            boxShadow: '0 1px 0 #EAF0F6',
          },
        },
      },

      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: '#FFFFFF',
            backgroundImage: 'none',
            borderColor: '#EAF0F6',
          },
        },
      },
    },
  },
  faIR,
);

export default theme;
export { langoColors };

