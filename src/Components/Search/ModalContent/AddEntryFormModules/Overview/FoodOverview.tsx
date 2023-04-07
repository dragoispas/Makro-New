import { TextField, Typography } from "@mui/material";
import { useCurrent } from "../../../../../Hooks/useCurrent";
import { NumberFormatCustom } from "../../../../Helpers/Formatter";
import { ModuleHeader, ModuleTitleStyle, ModuleWrapper } from "../../AddEditForm/AddEditFormStyle";

export const FoodOverview = () => {
  const [current, setCurrent] = useCurrent();
  return (
    <ModuleWrapper themeMode={""}>
      <ModuleHeader>
        <Typography sx={ModuleTitleStyle} color={"primary"}>
          Overview
        </Typography>
      </ModuleHeader>
      <div style={{ padding: "10px", display: "flex", justifyContent: "space-between" }}>
        <Typography>Name</Typography>
        <div>
          <TextField
            sx={{ width: "300px" }}
            placeholder="Food name"
            id="standard-basic"
            variant="standard"
            size="small"
            value={current.name}
            onChange={(e) => setCurrent("name", e.target.value)}
          />
        </div>
      </div>
    </ModuleWrapper>
  );
};
