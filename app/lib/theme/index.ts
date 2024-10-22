import { extendTheme } from "@mui/joy";

declare module "@mui/joy/Button" {
  interface ButtonPropsVariantOverrides {
    tile: true;
  }
}

export const joyTheme = extendTheme({
  fontFamily: {
    display: "inherit", // applies to `h1`–`h4`
    body: "inherit", // applies to `title-*` and `body-*`
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1200,
      xl: 1450,
    },
  },
  components: {
    JoyOption: {
      styleOverrides: {
        root: {
          fontFamily: "'Montserrat', sans-serif",
        },
      },
    },
    JoyModal: {
      styleOverrides: {
        root: {
          fontFamily: "'Montserrat', sans-serif",
        },
      },
    },
    JoyTooltip: {
      styleOverrides: {
        root: {
          fontFamily: "'Montserrat', sans-serif",
        },
      },
    },
    JoyAutocomplete: {
      styleOverrides: {
        option: {
          fontFamily: "'Montserrat', sans-serif",
        },
        listbox: {
          fontFamily: "'Montserrat', sans-serif",
        },
      },
    },
    JoyAutocompleteOption: {
      styleOverrides: {
        root: {
          fontFamily: "'Montserrat', sans-serif",
        },
      },
    },
    JoySelect: {
      styleOverrides: {
        listbox: {
          fontFamily: "'Montserrat', sans-serif",
        },
        indicator: {
          fontFamily: "'Montserrat', sans-serif",
        },
      },
    },
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.variant === "tile" && {
            "&[aria-pressed=true]": {
              backgroundColor: theme.vars.palette.primary[100],
              outline:
                "var(--joy-focus-thickness, 2px) solid var(--joy-palette-focusVisible, #0B6BCB)",
              outlineOffset:
                "var(--focus-outline-offset, var(--joy-focus-thickness, 2px))",
            },
            "--variant-borderWidth": "1px",
            color: "var(--joy-palette-primary-outlinedColor)",
            border: "var(--variant-borderWidth) solid",
            borderColor: "var(--joy-palette-primary-outlinedColor)",
            borderRadius: "var(--Button-radius, var(--joy-radius-sm))",
            backgroundColor: "transparent",
          }),
        }),
      },
    },
  },
});
