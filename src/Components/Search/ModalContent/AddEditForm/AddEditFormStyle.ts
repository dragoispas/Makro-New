import styled from "@emotion/styled";
import { Box, InputBase, Typography } from "@mui/material";

export const ModuleWrapper = styled.div<{ themeMode: string }>`
  background: ${(props) =>
    props.themeMode === "dark" ? "rgba(238, 91, 70, 0.7)" : "rgba(238, 91, 70, 0.0)"};
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  // border: 1px solid rgba(0, 0, 0, 0.2);
  margin: px;
`;

export const ScrollableBox = styled(Box)`
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ModulesContainer = styled(ScrollableBox)`
  height: 550px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px 10px;
  gap: 20px;
`;

export const Wrapper = styled.div`
  width: 100%;
`;

export const ModuleHeader = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModuleTitleStyle = {
  fontWeight: "bold",
  fontSize: "0.9rem",
};

export const FoodName = styled(InputBase)`
  font-weight: 400;
  font-size: 2.125rem;
  line-height: 1.235;
  text-align: center;
`;

export const SubTitle = styled(Typography)`
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5;
`;
