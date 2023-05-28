import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    custom?: {
      neutral?: string;
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
