import * as React from "react";
import { useCallback } from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store/store";
import { useAppDispatch } from "../Hooks/useAppDispatch";
import { useLogoutMutation, useUserQuery } from "../app/api/api";
import { useCurrentUser } from "../Hooks/useCurrentUser";
import { FlexBox } from "./UI/GeneralStyledComponents";

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} />
))({
  marginTop: 10,
  "& .MuiTabs-indicator": {
    display: "none", // Remove the underline indicator
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
    fontSize: "1.25rem",
    marginRight: theme.spacing(1),
    color: "text.primary",
    "&.Mui-selected": {
      color: "primary",
    },
  })
);

export function CustomizedTabs() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const user = useCurrentUser();

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
    <>
      {user ? (
        <FlexBox sx={{ width: "100%" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <Box></Box>
            <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
              <StyledTab label="Dashboard" />
              <StyledTab label="Trends" />
              <StyledTab label="Settings" />
            </StyledTabs>
            <Box></Box>
          </Box>
        </FlexBox>
      ) : null}
    </>
  );
}
