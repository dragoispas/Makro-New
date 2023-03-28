import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const ModuleWrapper = styled.div<{ themeMode: string }>`
  background: ${(props) =>
    props.themeMode === "dark" ? "rgba(238, 91, 70, 0.7)" : "rgba(238, 91, 70, 0.0)"};
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
  margin: px;
`;

export const ScrollableBox = styled(Box)`
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ModulesContainer = styled(ScrollableBox)`
  height: 500px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px 10px;
  gap: 20px;
`;

export const Content = styled(Box)`
  width: 600px;
  height: 520px;
`;

export const Wrapper = styled.div`
  width: 80%;
`;
