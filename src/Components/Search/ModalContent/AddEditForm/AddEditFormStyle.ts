import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const AddEntryFormBox = styled.div<{ themeMode: string }>`
  display: flex;
  gap: 20px;
  alignitems: center;
  justify-content: center;
  background: ${(props) =>
    props.themeMode === "dark" ? "rgba(238, 91, 70, 0.7)" : "rgba(238, 91, 70, 0.0)"};
  width: 100%;
  padding: 10px 0px;
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
  margin: px;
`;

export const Scrollable = styled(Box)`
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ScrollableStyled = styled(Scrollable)`
  height: 520px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0px 10px;
`;

export const Content = styled(Box)`
  width: 600px;
  height: 520px;
`;
