import { Box } from "@mui/material";
import EmojiEventsOutlined from "@mui/icons-material/EmojiEventsOutlined";
import LocalFireDepartmentOutlined from "@mui/icons-material/LocalFireDepartmentOutlined";
import AutoStoriesOutlined from "@mui/icons-material/AutoStoriesOutlined";
import LockRounded from "@mui/icons-material/LockRounded";
import type { Achievement } from "./data";

export default function AchievementBadge({ achievement }: { achievement: Achievement }) {
  const Icon = !achievement.unlocked ? LockRounded : achievement.icon === "flame" ? LocalFireDepartmentOutlined : achievement.icon === "lesson" ? AutoStoriesOutlined : EmojiEventsOutlined;
  const flame = achievement.icon === "flame";
  const seal = achievement.icon === "lesson" && achievement.unlocked;
  return <Box aria-hidden="true" sx={{ width: { xs: 70, sm: 92, md: 106 }, aspectRatio: "1", position: "relative", display: "grid", placeItems: "center", flexShrink: 0 }}>
    <Box component="svg" viewBox="0 0 100 100" sx={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      {!seal && <><path d="M50 4 79 17 94 44 86 76 59 94 27 87 7 62 10 29Z" fill={achievement.unlocked ? "#e6f3ff" : "#edf3fb"} /><path d="m29 61-8 27 17-4 11 12 5-28m17-7 8 27-17-4-11 12-5-28" fill={achievement.unlocked ? "#b9ddff" : "#dce6f2"} /></>}
      {seal ? <><path d="m50 3 11 9 14 1 4 14 11 9-5 14 5 14-11 9-4 14-14 1-11 9-11-9-14-1-4-14-11-9 5-14-5-14 11-9 4-14 14-1Z" fill="#ffb900" /><circle cx="50" cy="50" r="33" fill="#ffd56c" stroke="#fff4be" strokeWidth="2" /><path d="m27 69-6 18 16-4 5 12 8-16m23-10 6 18-16-4-5 12-8-16" fill="#ffc52d" /></> : <><path d="m50 13 28 13v23c0 17-15 28-28 36-13-8-28-19-28-36V26Z" fill={!achievement.unlocked ? "#ced9e7" : flame ? "#ff9e27" : "#ffbf13"} stroke={!achievement.unlocked ? "#e3eaf3" : "#fff1b9"} strokeWidth="3" /><path d="m50 18 23 11v21c0 12-11 22-23 29Z" fill={!achievement.unlocked ? "#c3cfdf" : flame ? "#ff731e" : "#ffae00"} /></>}
    </Box>
    <Icon sx={{ position: "relative", fontSize: { xs: 28, sm: 37, md: 43 }, color: achievement.unlocked ? "#fff9df" : "#7185a3", mt: seal ? 0 : -0.8 }} />
  </Box>;
}
