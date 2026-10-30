import Image from "next/image";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import logo from "@/public/images/brand/lango-logo.png";
import mark from "@/app/icon.png";

export type LogoProps = {
  variant?: "full" | "mark";
  preload?: boolean;
  sizes?: string;
  sx?: SxProps<Theme>;
};

export default function Logo({ variant = "full", preload = false, sizes, sx }: LogoProps) {
  const isMark = variant === "mark";

  return (
    <Box sx={[
      { display: "inline-flex", width: isMark ? 40 : { xs: 112, md: 152 }, flexShrink: 0, lineHeight: 0 },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}>
      <Image
        src={isMark ? mark : logo}
        alt="لنگو | Lango"
        preload={preload}
        sizes={sizes ?? (isMark ? "40px" : "(max-width: 899px) 112px, 152px")}
        style={{ display: "block", width: "100%", height: "auto" }}
      />
    </Box>
  );
}
