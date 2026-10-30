import { Box, Button, Container, Paper, Typography } from "@mui/material";
import LocalLibraryOutlined from "@mui/icons-material/LocalLibraryOutlined";
import Link from "@/components/AppLink";

export default function Library() {
  return <Box component="main"><Container maxWidth="md"><Typography component="h1" sx={{ fontSize: { xs: 27, md: 34 }, fontWeight: 800, color: "#17365e", mb: 3 }}>کتابخانه</Typography><Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: "20px", border: "1px solid #e1ecfb", textAlign: "center" }}><LocalLibraryOutlined sx={{ fontSize: 58, color: "#7ca7df", mb: 2 }} /><Typography component="h2" sx={{ fontSize: 21, fontWeight: 700, color: "#3a5e89" }}>کتابخانه به‌زودی تکمیل می‌شود</Typography><Typography sx={{ color: "#8399b5", fontSize: 14, lineHeight: 2, mt: 1, mb: 3 }}>هنوز منبع مستقلی به کتابخانه اضافه نشده است. تا آن زمان می‌توانی دوره‌ها و محتوای ذخیره‌شده‌ات را ببینی.</Typography><Button component={Link} href="/course" variant="contained" sx={{ m: 0.5 }}>مشاهدهٔ دوره‌ها</Button><Button component={Link} href="/favorites" variant="outlined" sx={{ m: 0.5 }}>علاقه‌مندی‌ها</Button></Paper></Container></Box>;
}
