import styled from "@emotion/styled";
import { Box, Stack } from "@mui/material";

type CenteredOptions = "xAxis" | "yAxis" | "allAxis";
type DirectionOptions = "row" | "column";

/**
 * A flexbox that can be aligned along one or both axes.
 * @typedef {'xAxis' | 'yAxis' | 'allAxis'} CenteredOptions
 * @param {CenteredOptions} centered - The axis or axes along which to center the flexbox.
 * Allowed values: 'xAxis', 'yAxis', 'allAxis'
 */

export const FlexBox = styled(Box)<{
  centered?: CenteredOptions;
  direction?: DirectionOptions;
}>`
  display: flex;

  ${(props) => (props.direction === "column" ? "flex-direction: column" : "")};

  ${(props) => {
    if (!props.centered) return "";
    if (props.centered === "xAxis") {
      if (props.direction === "column") {
        return "justify-content: center;";
      }
      return "align-items: center;";
    }
    if (props.centered === "yAxis") {
      if (props.direction === "column") {
        return "align-items: center;";
      }
      return "justify-content: center;";
    }
    if (props.centered === "allAxis") {
      return "justify-content: center; align-items: center;";
    }
    return "";
  }}
`;
