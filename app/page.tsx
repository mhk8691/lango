import { Box, Button, Stack } from "@mui/material";
import Link from "@/components/AppLink";
import Logo from "@/components/Logo";

export default function LandingPage() {
  return (
    <Box component="main" aria-label="صفحهٔ اصلی لنگو" sx={{ minHeight: "100svh", display: "grid", placeItems: "center", p: 3 }}>
      <Stack sx={{ alignItems: "center", gap: 3 }}>
        <Logo preload />
        <Button component={Link} href="/onboarding" variant="contained">شروع یادگیری</Button>
      </Stack>
    </Box>
  );
}
