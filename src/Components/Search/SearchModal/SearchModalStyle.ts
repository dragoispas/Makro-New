import styled from "@emotion/styled";
import { Paper, Box } from "@mui/material";

export const InputContainer = styled(Paper)<{ isActive: boolean }>`
  position: absolute;
  width: 600px;
  height: 700px;
  border-radius: 10px;
  padding-top: 5px;
  transition: 0.25s;

  ${(props) =>
    props.isActive ? "box-shadow: 0 0 50px rgba(0,0,0,0.3); z-index: 1000;" : "box-shadow: none;"}

  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Overlay = styled(Box)<{ isActive: boolean }>`
  transition: 0.25s;
  background: ${(props) => (props.isActive ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0)")};
  pointer-events: ${(props) => (props.isActive ? "" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
`;
