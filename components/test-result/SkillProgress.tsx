import { Box, Typography } from "@mui/material";
import HeadphonesRounded from "@mui/icons-material/HeadphonesRounded";
import SpellcheckRounded from "@mui/icons-material/SpellcheckRounded";
import TranslateRounded from "@mui/icons-material/TranslateRounded";
import MenuBookRounded from "@mui/icons-material/MenuBookRounded";
import EditRounded from "@mui/icons-material/EditRounded";
import MicRounded from "@mui/icons-material/MicRounded";
import type { SkillResult } from "./types";

const skillDetails = {
  listening: { label: "Listening", color: "#168fff", Icon: HeadphonesRounded },
  grammar: { label: "Grammar", color: "#0fc88d", Icon: SpellcheckRounded },
  vocabulary: { label: "Vocabulary", color: "#ffba28", Icon: TranslateRounded },
  reading: { label: "Reading", color: "#ff914a", Icon: MenuBookRounded },
  writing: { label: "Writing", color: "#ff627b", Icon: EditRounded },
  speaking: { label: "Speaking", color: "#8b75e9", Icon: MicRounded },
};

export default function SkillProgress({ skill, index, ready }: { skill: SkillResult; index: number; ready: boolean }) {
  const { label, color, Icon } = skillDetails[skill.id];
  const score = Number.isFinite(skill.score) ? Math.max(0, Math.min(100, skill.score)) : 0;
  return (
    <Box dir="ltr" sx={{
      display: "grid", gridTemplateColumns: { xs: "22px 72px minmax(0, 1fr) 36px", sm: "26px 98px minmax(0, 1fr) 42px" }, gap: { xs: 1, sm: 1.5 }, alignItems: "center", minHeight: { xs: 28, sm: 32 },
    }}>
      <Box aria-hidden="true" sx={{ width: { xs: 20, sm: 24 }, height: { xs: 20, sm: 24 }, borderRadius: "50%", bgcolor: color, display: "grid", placeItems: "center" }}><Icon sx={{ color: "white", fontSize: { xs: 12, sm: 14 } }} /></Box>
      <Typography component="span" lang="en" sx={{ color: "#172550", fontSize: { xs: 12.5, sm: 14 }, fontWeight: 500 }}>{label}</Typography>
      <Box role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={score} sx={{ height: { xs: 8, sm: 9 }, borderRadius: 10, bgcolor: "#edf4f8", overflow: "hidden" }}>
        <Box data-skill-fill={skill.id} sx={{
          width: `${score}%`, height: "100%", borderRadius: 10, background: "linear-gradient(90deg,#10c88a,#05b98c)", transformOrigin: "left center", transform: ready ? "scaleX(1)" : "scaleX(0)",
          animation: ready ? "result-skill-fill 650ms cubic-bezier(0.22, 0.61, 0.36, 1) both" : "none", animationDelay: `${100 + index * 70}ms`,
          "@keyframes result-skill-fill": { from: { transform: "scaleX(0)" }, to: { transform: "scaleX(1)" } },
          "@media (prefers-reduced-motion: reduce)": { animation: "none", transform: "scaleX(1)" },
        }} />
      </Box>
      <Typography component="span" aria-hidden="true" sx={{ textAlign: "right", color: "#142253", fontSize: { xs: 12, sm: 13 }, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{Math.round(score)}%</Typography>
    </Box>
  );
}
