//default react admin theme, edit it if you want custom styles

export const lightTheme = {
  palette: {
    primary: {
      main: '#353e47',
    },
    secondary: {
      light: '#5f5fc4',
      main: '#283593',
      dark: '#001064',
      contrastText: '#fff',
    },
    background: {
      default: '#fcfcfe',
    },
    type: 'light',
  },
  shape: {
    borderRadius: 10,
  },
  overrides: {
    RaMenuItemLink: {
      root: {
        borderLeft: '3px solid #fff',
      },
      active: {
        borderLeft: '3px solid #353e47',
      },
    },
    MuiPaper: {
      elevation1: {
        boxShadow: 'none',
      },
      root: {
        border: '1px solid #e0e0e3',
        backgroundClip: 'padding-box',
      },
    },
    MuiButton: {
      contained: {
        backgroundColor: '#fff',
        color: '#353e47',
        boxShadow: 'none',
      },
    },
    MuiTableCell: {
      root: {
        display: 'table-cell',
        padding: '12px',
        fontSize: '0.875rem',
        textAlign: 'left',
        fontWeight: 400,
        lineHeight: 1.43,
        borderBottom: '1px solid rgba(224, 224, 224, 1)',
        letterSpacing: '0.01071em',
        verticalAlign: 'inherit',
      },
      sizeSmall: {
        padding: '12px',
      },
    },
    MuiButtonBase: {
      root: {
        '&:hover:active::after': {
          // recreate a static ripple color
          // use the currentColor to make it work both for outlined and contained buttons
          // but to dim the background without dimming the text,
          // put another element on top with a limited opacity
          content: '""',
          display: 'block',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          right: 0,
          backgroundColor: 'currentColor',
          opacity: 0.3,
          borderRadius: 'inherit',
        },
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#353e47',
      },
      colorSecondary: {
        color: '#fff',
        backgroundColor: '#353e47',
      },
    },
    MuiLinearProgress: {
      colorPrimary: {
        backgroundColor: '#f5f5f5',
      },
      barColorPrimary: {
        backgroundColor: '#d7d7d7',
      },
    },
    MuiFilledInput: {
      root: {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        '&$disabled': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
      },
    },
    MuiSnackbarContent: {
      root: {
        border: 'none',
      },
    },
  },
  props: {
    MuiButtonBase: {
      // disable ripple for perf reasons
      disableRipple: true,
    },
  },
}
