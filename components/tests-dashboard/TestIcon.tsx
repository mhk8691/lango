import { Box } from "@mui/material";
import AssessmentRounded from "@mui/icons-material/AssessmentRounded";
import HeadphonesRounded from "@mui/icons-material/HeadphonesRounded";
import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded";
import AbcRounded from "@mui/icons-material/AbcRounded";
import ForumRounded from "@mui/icons-material/ForumRounded";
import EditRounded from "@mui/icons-material/EditRounded";
import FactCheckRounded from "@mui/icons-material/FactCheckRounded";
import SchoolRounded from "@mui/icons-material/SchoolRounded";
import WorkspacePremiumRounded from "@mui/icons-material/WorkspacePremiumRounded";
import type { TestIcon as IconId } from "./data";

const icons = {
  placement: { Icon: AssessmentRounded, bg: "#e8efff", color: "#657fee" },
  listening: { Icon: HeadphonesRounded, bg: "#e7f3ff", color: "#197bff" },
  reading: { Icon: AutoStoriesRounded, bg: "#f0e8ff", color: "#9671e9" },
  vocabulary: { Icon: AbcRounded, bg: "#e8f4ff", color: "#ff9048" },
  speaking: { Icon: ForumRounded, bg: "#e4f0ff", color: "#3a8aff" },
  writing: { Icon: EditRounded, bg: "#fff2df", color: "#e9a43b" },
  grammar: { Icon: FactCheckRounded, bg: "#e9f0ff", color: "#538cfc" },
  mock: { Icon: SchoolRounded, bg: "#f1edfa", color: "#915abf" },
  certificate: { Icon: WorkspacePremiumRounded, bg: "#fff2de", color: "#d89c3e" },
};
export default function TestIcon({ id, small = false }: { id: IconId; small?: boolean }) {
  const { Icon, bg, color } = icons[id];
  return <Box aria-hidden="true" sx={{ width: small ? 42 : { xs: 66, sm: 74 }, height: small ? 48 : { xs: 78, sm: 90 }, bgcolor: bg, borderRadius: small ? "11px" : "17px", display: "grid", placeItems: "center", flexShrink: 0, color, backgroundImage: "linear-gradient(135deg,#ffffff4d,transparent)", "& svg": { filter: "drop-shadow(0 4px 2px #203a6820)" } }}><Icon sx={{ fontSize: small ? 28 : 48, transform: small ? undefined : "rotate(-8deg)" }} /></Box>;
}
