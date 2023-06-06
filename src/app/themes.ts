import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    custom?: {
      neutral?: string;
    };
    customBackground?: {
      primary?: string;
      neutral?: string;
      success?: string;
    };
  }
}

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ee5b46",
    },
    secondary: {
      main: "#033631",
    },
    custom: {
      neutral: "black",
    },
    customBackground: {
      primary: "rgba(238, 91, 70, 0.1)",
      neutral: "#f5f5f5",
      success: "rgba(76, 175, 80, 0.2)",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          boxShadow: "0 0 20px rgba(0,0,0,0.1)",
          transition: "background-color 0.2s ease",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          transition: "color 0.2s ease",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ee5b46",
    },
    secondary: {
      main: "#39bd79",
    },
    custom: {
      neutral: "white",
    },
    customBackground: {
      primary: "rgba(238, 91, 70, 0.2)",
      neutral: "rgba(250,250,250,0.1)",
      success: "rgba(76, 175, 80, 0.2)",
    },
  },
  transitions: {},
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          backgroundColor: "#050505",
          boxShadow: "0 0 20px rgba(0,0,0,0.7)",
          transition: "background-color 0.2s ease",
          borderColor: "rgba(250,250,250,0.1)",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          transition: "color 0.2s ease",
        },
      },
    },
  },
});
