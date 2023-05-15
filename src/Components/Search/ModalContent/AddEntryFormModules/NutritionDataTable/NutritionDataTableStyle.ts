import styled from "@emotion/styled";
import { TableCell, tableCellClasses, TableContainer } from "@mui/material";

export const ScrollableBox = styled(TableContainer)`
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  height: 300px;
`;

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "none",
    // backgroundColor: theme.palette.primary.main,
    // color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
