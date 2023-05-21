import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  List,
  ListSubheader,
  Stack,
  Typography,
  makeStyles,
  styled,
} from "@mui/material";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { FoodEntryItem } from "./FoodEntryItem";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { before, remove } from "lodash";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FoodEntry } from "../../../../app/api/types";
import { FlexBox } from "../../../UI/GeneralStyledComponents";
import { useCurrentDayEntry } from "../../../../Hooks/useCurrentDayEntry";
import { useRemoveFoodEntryMutation } from "../../../../app/api/api";

// const Accordion = styled((props: AccordionProps) => (
//   <Accordion disableGutters elevation={0} square {...props} />
// ))(({ theme }) => ({
//   border: `1px solid ${theme.palette.divider}`,
//   "&:not(:last-child)": {
//     borderBottom: 0,
//   },
//   "&:before": {
//     display: "none",
//   },
// }));

export function FoodEntryList() {
  const dayEntry = useCurrentDayEntry();
  const [expanded, setExpanded] = React.useState<number | false>(false);
  const [removeFoodEntry] = useRemoveFoodEntryMutation();

  const handleChange = (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <FlexBox direction="column" gap={1}>
      {dayEntry?.foodEntries.map((foodEntry) => (
        <Accordion
          sx={{ borderTop: "none" }}
          elevation={0}
          key={foodEntry.id}
          disableGutters
          square
          expanded={expanded === foodEntry.id}
          onChange={handleChange(foodEntry.id)}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                sx={{ margin: "0px 5px", opacity: 0.5, height: "20px", width: "20px" }}
              />
            }
          >
            <FlexBox centered="xAxis" justifyContent={"space-between"} width={"100%"} gap={1}>
              <FlexBox centered="xAxis" gap={1}>
                <Avatar sx={{ height: "30px", width: "30px" }}>
                  <RestaurantIcon />
                </Avatar>
                <Typography sx={{ color: "text.secondary" }}>
                  {foodEntry.quantity} {foodEntry.quantityUnit}
                </Typography>
                <Typography sx={{ flexShrink: 0 }}>{foodEntry.name}</Typography>
              </FlexBox>
              <FlexBox centered="xAxis">
                <WhatshotIcon sx={{ height: "17px", width: "17px", margin: "3px" }} />
                <Typography>{foodEntry.macroNutrients.calories}</Typography>
              </FlexBox>
            </FlexBox>
          </AccordionSummary>
          <AccordionDetails>
            <Stack>
              <FlexBox centered="xAxis" justifyContent={"space-between"}>
                <FlexBox>asasdddddddd</FlexBox>
              </FlexBox>
              <FlexBox centered="xAxis" justifyContent={"space-between"}>
                <FlexBox>asd</FlexBox>
                <FlexBox centered="xAxis">
                  <Button>EDIT</Button>
                  <Button onClick={() => removeFoodEntry(foodEntry)}>DELETE</Button>
                </FlexBox>
              </FlexBox>
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </FlexBox>
  );
}
