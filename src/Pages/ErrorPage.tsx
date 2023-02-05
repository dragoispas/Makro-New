import { Stack, Typography } from "@mui/material";

export function ErrorPage() {
  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Typography color="text.primary" variant="h1" sx={{ fontWeight: "bold" }}>
        404
      </Typography>
      <Typography color="text.primary" variant="h2">
        Oops, Something went wrong!
      </Typography>
    </Stack>
  );
}
