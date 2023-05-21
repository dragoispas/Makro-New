import styled from "@emotion/styled";
import { Input, InputBase, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export const CustomInput = styled(Input)`
  width: 550px;
  height: 60px;
  border: none;
  background: rgba(0, 0, 0, 0);
  font-size: 20px;
  padding-left: 50px;
`;

export const CustomInputBase = styled(InputBase)`
  width: 550px;
  height: 60px;
  border: none;
  background: rgba(0, 0, 0, 0);
  font-size: 20px;
  padding-left: 50px;
`;

export const ClearButton = styled(ClearIcon, {
  shouldForwardProp: (props) => props !== "visible",
})<{ visible: boolean }>`
  border: none;
  outline: none;
  font-weight: bold;
  padding: 4px 3px;
  flex-shrink: 0;
  text-decoration: underline;
  transition: 0.25s;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  &:hover {
    background: rgba(150, 150, 150, 0.15);
  }

  ${(props) =>
    props.visible
      ? "opacity:100%; cursor:pointer; z-index: 2000;"
      : "opacity:0%; pointer-events:none;"}
`;

export const BackButton = styled(ChevronLeftIcon)`
  border: none;
  outline: none;
  font-weight: bold;
  padding: 4px 3px;
  flex-shrink: 0;
  text-decoration: underline;
  transition: 0.25s;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  &:hover {
    background: rgba(150, 150, 150, 0.15);
  }
`;
