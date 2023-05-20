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
import { RootState } from "../../../../app/store";
import { remove } from "../../../../Api/food-entries/api";
import { FoodEntry } from "../../../../Api/food-entries/types";
import { bananaProduct } from "../../../../Api/products/types";
import { FlexBox } from "../../../UI/GeneralStyledComponents";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { before } from "lodash";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const foodEntry1: FoodEntry = {
  id: 1234,
  dayEntryId: 124124,
  name: "Banana",

  quantity: 323,

  calories: 758,
  fat: 23,
  carbs: 113,
  protein: 235,

  fiber: 123,
  satFat: 123,
  sugar: 123,
  sodium: 123,
  potassium: 123,

  servingSize: "g",

  product: bananaProduct,
};

const foodEntry2: FoodEntry = {
  id: 1234,
  dayEntryId: 124124,
  name: "Shawarma d-aia buna",

  quantity: 200,

  calories: 918,
  fat: 33,
  carbs: 221,
  protein: 15,

  fiber: 123,
  satFat: 123,
  sugar: 123,
  sodium: 123,
  potassium: 123,

  servingSize: "g",

  product: bananaProduct,
};

const foodEntry3: FoodEntry = {
  id: 1234,
  dayEntryId: 124124,
  name: "Pizza",

  quantity: 350,

  calories: 400,
  fat: 2,
  carbs: 214,
  protein: 99,

  fiber: 324,
  satFat: 123,
  sugar: 123,
  sodium: 123,
  potassium: 123,

  servingSize: "g",

  product: bananaProduct,
};

const foodEntriesTest = [foodEntry1, foodEntry2, foodEntry3];

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
  const dayEntry = useSelector((state: RootState) => state.diary.dayEntry);
  console.log(dayEntry);

  const onDelete = async (id: number | string) => {
    await remove(id);
  };
  const getFoodEntries = useMemo(
    () =>
      dayEntry?.foodEntries.map((entry) => (
        <React.Fragment key={entry.id}>
          <FoodEntryItem onDelete={onDelete} foodEntry={entry} />
        </React.Fragment>
      )),
    [dayEntry]
  );

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <FlexBox direction="column" gap={1}>
      {foodEntriesTest.map((foodEntry) => (
        <Accordion
          sx={{ borderTop: "none" }}
          elevation={0}
          key={foodEntry.id}
          disableGutters
          square
          expanded={expanded === foodEntry.name}
          onChange={handleChange(foodEntry.name)}
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
                  {foodEntry.quantity} {foodEntry.servingSize}
                </Typography>
                <Typography sx={{ flexShrink: 0 }}>{foodEntry.name}</Typography>
              </FlexBox>
              <FlexBox centered="xAxis">
                <WhatshotIcon sx={{ height: "17px", width: "17px", margin: "3px" }} />
                <Typography>{foodEntry.calories}</Typography>
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
                  <Button>DELETE</Button>
                </FlexBox>
              </FlexBox>
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </FlexBox>
  );
}
