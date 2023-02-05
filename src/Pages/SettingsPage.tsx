import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

export function SettingsPage() {
  const [email] = useState<string>("");
  return (
    <Box
      sx={{
        marginTop: "30px",
        display: "flex",
        justifyContent: "center",
        gap: "40px",
      }}
    >
      <Paper sx={{ width: "600px", height: "800px" }}>
        <Stack sx={{ height: "100%" }}>
          <Stack p={4}>
            <Typography variant="h6" sx={{ borderBottom: 1, borderColor: "divider" }}>
              Preferences
            </Typography>
          </Stack>
          <Stack p={4}>
            <Typography variant="h6" sx={{ borderBottom: 1, borderColor: "divider" }}>
              Support
            </Typography>
          </Stack>
          <Stack gap={2} p={4}>
            <Typography variant="h6" sx={{ borderBottom: 1, borderColor: "divider" }}>
              Account
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ opacity: 0.5 }}>{"Email: "}</Typography>
              <Typography sx={{ fontWeight: "bold" }}>{email}</Typography>
            </Box>
            <Button color="inherit">Update Email</Button>
            <Button color="inherit">Change password</Button>
            <Button color="error" sx={{ justifySelf: "flex-end" }}>
              Log out
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
