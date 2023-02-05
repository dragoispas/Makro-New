import * as React from "react";
import { useCallback } from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { Button, Paper, Stack } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import LightModeIcon from "@mui/icons-material/LightMode";
import { AppDispatch, RootState } from "../app/store";
import { setThemeMode } from "../modules/general/generalSlice";
import { logout } from "../modules/auth/authSlice";

const ThemeSwitch = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "themeMode",
})<{
  themeMode: string;
}>`
  height: 40px;
  width: 40px;
  border-radius: 50px;
  cursor: pointer;
  transition: 0.3s;
  background-color: inherit;
  ${(props) =>
    props.themeMode === "dark"
      ? "box-shadow: 0px 0px 10px rgba(0,0,0,0.5)"
      : "box-shadow: 0px 0px 10px rgba(255,255,255,0.5)"};
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    width: "100%",
    backgroundColor: "#ee5b46",
  },
});

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: "18px",
    marginRight: theme.spacing(1),
    color: "text.primary",
    "&.Mui-selected": {
      color: "primary",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

export function CustomizedTabs() {
  const [value, setValue] = React.useState(0);
  const themeMode = useSelector(({ general }: RootState) => general.themeMode);
  const user = useSelector(({ auth }: RootState) => auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);

      switch (newValue) {
        case 0:
          navigate("/", { replace: true });
          break;
        case 1:
          navigate("/trends", { replace: true });
          break;
        case 2:
          navigate("/settings", { replace: true });
          break;
        default:
          break;
      }
    },
    [navigate]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction="row"
        justifyContent={user ? "space-between" : "flex-end"}
        alignItems="center"
        spacing={2}
        sx={{ margin: "0 50px", height: "70px" }}
      >
        {user ? (
          <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
            <StyledTab label="Diary" />
            <StyledTab label="Trends" />
            <StyledTab label="Settings" />
          </StyledTabs>
        ) : null}
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
          <Button color="inherit" onClick={() => (dispatch as AppDispatch)(logout())}>
            Logout
          </Button>
          <ThemeSwitch
            themeMode={themeMode === "light" ? "dark" : "light"}
            onClick={() => dispatch(setThemeMode(themeMode === "light" ? "dark" : "light"))}
          >
            <DarkModeIcon
              sx={{
                position: "absolute",
                transition: "0.1s",
                opacity: themeMode === "light" ? 1 : 0,
              }}
            />
            <LightModeIcon
              sx={{
                position: "absolute",
                transition: "0.1s",
                opacity: themeMode === "light" ? 0 : 1,
              }}
            />
          </ThemeSwitch>
        </Stack>
      </Stack>
    </Box>
  );
}
