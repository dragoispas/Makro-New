import {
  Box,
  Button,
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  PaletteMode,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useLogoutMutation, useUserQuery } from "../app/api/api";
import ChangePasswordModal from "../Components/Settings/ChangePasswordModal";
import ContactSupportModal from "../Components/Settings/ContactSupportModal";
import { setMeasuringSystem, setThemeMode } from "../app/store/slices/generalSlice";
import { useAppDispatch } from "../Hooks/useAppDispatch";
import { RootState } from "../app/store/store";
import { useSelector } from "react-redux";

export function SettingsPage() {
  const user = useUserQuery();
  const [logout] = useLogoutMutation();
  const [changePasswordModalVisible, setChangePasswordModalVisible] = useState<boolean>(false);
  const [contactSupportModalVisible, setContactSupportdModalVisible] = useState<boolean>(false);
  const { themeMode, measuringSystem } = useSelector((state: RootState) => state.general);
  const dispatch = useAppDispatch();
  const [email] = useState<string>("");
  return (
    <Box
      sx={{
        marginTop: "15px",
        display: "flex",
        justifyContent: "center",
        gap: "40px",
      }}
    >
      <Paper sx={{ width: "600px", height: "800px" }}>
        <Stack sx={{ height: "100%" }}>
          <Stack p={4} gap={2}>
            <Typography variant="h6" sx={{ borderBottom: 1, borderColor: "divider" }}>
              Preferences
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ opacity: 0.5 }}>{"Measuring System: "}</Typography>

              <Select
                onChange={(e) => {
                  dispatch(setMeasuringSystem(e.target.value as PaletteMode));
                  console.log(e.target.value);
                }}
                value={measuringSystem}
                input={<InputBase inputProps={{ style: { textAlign: "center" } }}></InputBase>}
              >
                <MenuItem key={"metric"} value={"metric"}>
                  metric
                </MenuItem>
                <MenuItem key={"imperial"} value={"imperial"}>
                  imperial
                </MenuItem>
              </Select>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ opacity: 0.5 }}>{"Theme: "}</Typography>

              <Select
                onChange={(e) => {
                  dispatch(setThemeMode(e.target.value as PaletteMode));
                  console.log(e.target.value);
                }}
                value={themeMode}
                input={<InputBase inputProps={{ style: { textAlign: "center" } }}></InputBase>}
              >
                <MenuItem key={"light"} value={"light"}>
                  light
                </MenuItem>
                <MenuItem key={"dark"} value={"dark"}>
                  dark
                </MenuItem>
              </Select>
            </Box>
          </Stack>
          <Stack p={4} gap={2}>
            <Typography variant="h6" sx={{ borderBottom: 1, borderColor: "divider" }}>
              Support
            </Typography>
            <Typography sx={{ opacity: 0.5 }} align="center">
              {
                "Need help or have a question? We're here for you! Send us a message, your feedback is valuable to us!"
              }
            </Typography>
            <Button onClick={() => setContactSupportdModalVisible(true)} color="inherit">
              Contact Support
            </Button>
          </Stack>
          <Stack gap={2} p={4}>
            <Typography variant="h6" sx={{ borderBottom: 1, borderColor: "divider" }}>
              Account
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ opacity: 0.5 }}>{"Email: "}</Typography>
              <Typography sx={{ fontWeight: "bold" }}>{user.data?.email}</Typography>
            </Box>
            <Button onClick={() => setChangePasswordModalVisible(true)} color="inherit">
              Change password
            </Button>
            <Button onClick={() => logout()} color="error" sx={{ justifySelf: "flex-end" }}>
              Log out
            </Button>
          </Stack>
        </Stack>
      </Paper>
      <ChangePasswordModal
        open={changePasswordModalVisible}
        onClose={() => setChangePasswordModalVisible(false)}
      ></ChangePasswordModal>
      <ContactSupportModal
        open={contactSupportModalVisible}
        onClose={() => setContactSupportdModalVisible(false)}
      ></ContactSupportModal>
    </Box>
  );
}
