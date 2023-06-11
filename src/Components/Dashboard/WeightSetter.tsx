import {
  Menu,
  InputBase,
  InputAdornment,
  Typography,
  ButtonBase,
  Tooltip,
  Zoom,
} from "@mui/material";
import { FlexBox } from "../UI/GeneralStyledComponents";
import { useEffect, useState } from "react";
import { useCurrentDayEntry } from "../../Hooks/useCurrentDayEntry";
import { useUpdateDayEntryMutation } from "../../app/api/api";
import { UnitType, convertUnit, getDayEntryWeight } from "../../app/units";

export function WeightSetter() {
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [inputWidth, setInputWidth] = useState<number>(60);

  const [weight, setWeight] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<UnitType>(UnitType.Kilogram);
  const dayEntry = useCurrentDayEntry();
  const [updateDayEntry, { isSuccess }] = useUpdateDayEntryMutation();

  useEffect(() => {
    if (dayEntry) {
      setWeight(getDayEntryWeight(dayEntry)?.toString() ?? "");
      setWeightUnit(dayEntry.weightUnit ?? UnitType.Kilogram);
    }
  }, [dayEntry]);

  const updateWeight = () => {
    if (dayEntry) {
      let newWeight: number | null = null;
      if (weight && weightUnit) {
        newWeight = convertUnit(parseInt(weight), weightUnit, UnitType.Kilogram);
      } else if (weight) {
        newWeight = parseInt(weight);
      }
      console.log("updating weight");
      updateDayEntry({
        id: dayEntry.id,
        data: {
          weight: newWeight,
          weightUnit: weightUnit || null,
        },
      });
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
    updateWeight();
    adjustWidth();
    // SAVE THE WEIGHT
  };

  const adjustWidth = () => {
    const minWidth = 50;
    const maxWidth = 150;
    const growthFactor = 8.5;
    const newWidth = Math.min(
      maxWidth,
      Math.max(minWidth, minWidth + weight.length * growthFactor)
    );
    setInputWidth(newWidth);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const minWidth = 50;
    const maxWidth = 150;
    const growthFactor = 8.5;
    const newWidth = Math.min(maxWidth, Math.max(minWidth, minWidth + value.length * growthFactor));
    setInputWidth(newWidth);
    setWeight(value);
  };

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    adjustWidth();
    setOpen(true);
  };

  return (
    <>
      <Tooltip
        title={dayEntry && dayEntry.weight ? "Click to edit weight" : "Click to set weight"}
        placement="left-end"
        TransitionComponent={Zoom}
        enterDelay={200}
      >
        <ButtonBase disableRipple onClick={handleOpen}>
          <Typography
            sx={{
              fontWeight: 400,
              opacity: 0.6,
              marginTop: "10px",
              fontSize: "0.75rem",
            }}
            color={dayEntry && dayEntry.weight ? "custom.neutral" : "primary"}
            fontWeight="bold"
          >
            {dayEntry && dayEntry.weight
              ? `${dayEntry.weight} ${dayEntry.weightUnit?.toUpperCase()}`
              : "WEIGHT"}
          </Typography>
        </ButtonBase>
      </Tooltip>
      <Menu
        onClose={handleClose}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{ transform: "translate(30px, -35px)" }}
      >
        <FlexBox centered="allAxis">
          <InputBase
            sx={{
              textAlign: "right",
              "& input": {
                textAlign: "right",
              },
              width: `${inputWidth}px`,
              minWidth: "60px",
              maxWidth: "150px",
              paddingRight: "12px",
            }}
            value={weight}
            placeholder="0"
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            onChange={handleInputChange}
          />
        </FlexBox>
      </Menu>
    </>
  );
}
