import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import Link from "@/components/AppLink";
import TestIcon from "@/components/tests-dashboard/TestIcon";

const items = [
  { id: "interactive", title: "تمرین تعاملی", description: "گزینهٔ درست را انتخاب کن و پاسخ‌هایت را بررسی کن.", icon: "reading" },
  { id: "listening", title: "تمرین شنیداری", description: "به فایل صوتی گوش بده و به سؤال پاسخ بده.", icon: "listening" },
  { id: "speaking", title: "تمرین مکالمه", description: "با میکروفون صحبت کن و صدایت را بازپخش کن.", icon: "speaking" },
  { id: "writing", title: "تمرین نوشتاری", description: "دربارهٔ موضوع پیشنهادی به انگلیسی بنویس.", icon: "writing" },
  { id: "sentence-completion", title: "تمرین تکمیل جمله", description: "با توجه به تصویر، جمله را کامل کن.", icon: "vocabulary" },
  { id: "drag-and-drop", title: "تمرین کشیدن و چیدن", description: "کلمه‌ها را جابه‌جا کن و جمله بساز.", icon: "grammar" },
] as const;
export default function ExercisesHub() {
  return <Box component="main"><Container maxWidth="lg"><Typography component="h1" sx={{ fontSize: { xs: 27, md: 34 }, fontWeight: 800, color: "#17365e", mb: 1 }}>تمرین‌ها</Typography><Typography sx={{ color: "#8096b4", fontSize: 14, mb: 3, lineHeight: 2 }}>یک نوع تمرین انتخاب کن و مهارت زبانت را تقویت کن.</Typography><Box component="ul" sx={{ p: 0, m: 0, listStyle: "none", display: "grid", gridTemplateColumns: { xs: "minmax(0,1fr)", sm: "repeat(2,minmax(0,1fr))", md: "repeat(3,minmax(0,1fr))" }, gap: 2 }}>{items.map(item => <Box component="li" key={item.id} sx={{ minWidth: 0 }}><Paper elevation={0} sx={{ p: 2.5, border: "1px solid #e0ebfb", borderRadius: "18px", height: "100%", display: "flex", flexDirection: "column" }}><Stack direction="row" sx={{ alignItems: "center", gap: 2, mb: 2 }}><TestIcon id={item.icon} small /><Typography component="h2" sx={{ fontSize: 17, fontWeight: 700, color: "#31527d" }}>{item.title}</Typography></Stack><Typography sx={{ fontSize: 13, color: "#8598b4", lineHeight: 2, mb: 2, flex: 1 }}>{item.description}</Typography><Button component={Link} href={`/exercises/${item.id}`} variant="outlined" aria-label={`شروع ${item.title}`} sx={{ minHeight: 44 }}>شروع تمرین</Button></Paper></Box>)}</Box></Container></Box>;
}
