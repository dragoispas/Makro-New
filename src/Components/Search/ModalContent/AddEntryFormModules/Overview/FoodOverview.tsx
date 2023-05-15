import { TextField, Typography } from "@mui/material";
import { ModuleHeader, ModuleTitleStyle, ModuleWrapper } from "../../AddEditForm/AddEditFormStyle";
import { RootState } from "../../../../../app/store/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../../Hooks/useAppDispatch";
import { setDiaryFormName } from "../../../../../app/store/slices/searchSlice";

export const FoodOverview = () => {
  const diaryFormName = useSelector((state: RootState) => state.search.diaryForm.name);
  const dispatch = useAppDispatch();

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
            value={diaryFormName}
            onChange={(e) => dispatch(setDiaryFormName(e.target.value))}
          />
        </div>
      </div>
    </ModuleWrapper>
  );
};
