"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { subscriptionPlans as plans } from "@/lib/subscription-plans";
import Link from "@/components/AppLink";
import { Box, Button, Container, FormControl, FormControlLabel, IconButton, Paper, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import CheckRounded from "@mui/icons-material/CheckRounded";
import Modal from "@/components/Modal";

const benefits = ["دسترسی به تمام سطوح", "دسترسی به تمام درس‌ها", "بخش‌های ویژه", "آزمون‌های ویژه", "پشتیبانی آنلاین", "گزارش‌های تحلیلی", "تمرین نامحدود", "مربی‌یار شخصی"];
const price = (value: number) => value.toLocaleString("fa-IR");

export default function Subscription() {
  return <Suspense fallback={<Typography sx={{ p: 3 }}>در حال آماده‌سازی اشتراک…</Typography>}><SubscriptionContent /></Suspense>;
}
function SubscriptionContent() {
  const search = useSearchParams();
  const [planId, setPlanId] = useState<string>(() => plans.find(plan => plan.id === search.get("plan"))?.id ?? "quarterly");
  const [showCheckout, setShowCheckout] = useState(false);
  const selected = plans.find(plan => plan.id === planId)!;
  return (
    <Box component="main" data-dashboard-fill sx={{ minHeight: "100svh", display: "flex", alignItems: "center", py: { xs: 2, sm: 4, lg: 6 }, background: "radial-gradient(ellipse at 15% 15%, #c7e5ff 0%, transparent 48%), radial-gradient(ellipse at 90% 85%, #c8e8ff 0%, transparent 45%), #9dcdff" }}>
      <Container maxWidth={false} sx={{ maxWidth: { xs: 490, sm: 760, md: 1040 }, px: { xs: 1.5, sm: 3 } }}>
        <Paper elevation={0} sx={{ border: "5px solid #e7f3ff", borderRadius: { xs: "24px", md: "32px" }, px: { xs: 1.5, sm: 3, md: 5 }, pt: 1.5, pb: { xs: 2.5, md: 4 }, boxShadow: "0 24px 80px #1a6cba20", background: "linear-gradient(180deg,#fff,#fbfdff)" }}>
          <Stack component="header" direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: { xs: 3, md: 4 } }}>
            <Typography component="h1" sx={{ color: "#13204f", fontWeight: 800, fontSize: { xs: 21, sm: 26, md: 30 } }}>اشتراک و پرداخت</Typography>
            <IconButton component={Link} href="/home" aria-label="بازگشت به خانه" sx={{ width: 44, height: 44, color: "#19315d" }}><ArrowBackRounded sx={{ fontSize: 20 }} /></IconButton>
          </Stack>
          <FormControl fullWidth>
            <RadioGroup aria-label="انتخاب پلن اشتراک" value={planId} onChange={(_, value) => setPlanId(value)} sx={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: { xs: 0.75, sm: 2 }, pt: 1 }}>
              {plans.map(plan => {
                const active = planId === plan.id;
                return <Box key={plan.id} sx={{ position: "relative", minWidth: 0 }}>
                  {("recommended" in plan && plan.recommended) && <Typography component="span" sx={{ position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)", zIndex: 1, px: { xs: 1, sm: 2 }, py: 0.25, whiteSpace: "nowrap", borderRadius: 5, color: "white", background: "linear-gradient(120deg,#eac484,#c9954e)", fontSize: { xs: 10, sm: 12 }, pointerEvents: "none" }}>پیشنهاد لنگو</Typography>}
                  <FormControlLabel value={plan.id} sx={{ m: 0, width: "100%", height: "100%", position: "relative", alignItems: "stretch", borderRadius: "13px", border: active ? "1.5px solid #d2a15e" : "1.5px solid #e8f0fa", bgcolor: active ? "#fffdfa" : "#f7faff", boxShadow: active ? "0 5px 20px #d2a15e18" : "none", transition: "border-color 150ms, background-color 150ms", "&:has(.Mui-focusVisible)": { outline: "3px solid #79adff", outlineOffset: 3 }, "& .MuiFormControlLabel-label": { width: "100%", minWidth: 0 } }} control={<Radio sx={{ position: "absolute", inset: 0, opacity: 0, m: 0, p: 0 }} />} label={<Stack sx={{ textAlign: "center", alignItems: "center", py: { xs: 2.5, sm: 3.5, md: 4 }, px: 0.5, gap: 0.7 }}>
                    <Typography sx={{ fontWeight: 700, color: "#324777", fontSize: { xs: 12, sm: 16 } }}>{plan.label}</Typography>
                    <Typography sx={{ fontWeight: 800, color: "#102359", fontSize: { xs: 21, sm: 30, md: 36 }, lineHeight: 1.5, whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>{price(plan.price)}</Typography>
                    <Typography sx={{ color: active ? "#b97a29" : "#7b8eb2", fontSize: { xs: 10, sm: 13 } }}>{plan.duration} / تومان</Typography>
                  </Stack>} />
                </Box>;
              })}
            </RadioGroup>
          </FormControl>
          <Box component="ul" aria-label="امکانات اشتراک" sx={{ listStyle: "none", p: 0, my: { xs: 2.5, sm: 3.5 }, display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", columnGap: { xs: 1, sm: 3 }, rowGap: { xs: 1.5, sm: 2 } }}>
            {benefits.map((benefit, index) => <Box component="li" key={index} sx={{ display: "flex", alignItems: "flex-start", gap: { xs: 0.6, sm: 1 }, minWidth: 0 }}><CheckRounded aria-hidden="true" sx={{ color: "#00c779", fontSize: { xs: 18, sm: 23 }, flexShrink: 0 }} /><Typography sx={{ color: "#6378a2", fontWeight: 500, fontSize: { xs: 11, sm: 14, md: 16 }, lineHeight: 1.8 }}>{benefit}</Typography></Box>)}
          </Box>
          <Button fullWidth onClick={() => setShowCheckout(true)} sx={{ minHeight: { xs: 48, sm: 54 }, color: "white", fontWeight: 700, fontSize: { xs: 14, sm: 17 }, borderRadius: "11px", background: "linear-gradient(110deg,#e6c18a,#c99751)", boxShadow: "0 6px 18px #c9975126", "&:hover": { background: "linear-gradient(110deg,#dfb578,#bb873e)" } }}>خرید اشتراک</Button>
        </Paper>
      </Container>
      <Modal open={showCheckout} onClose={() => setShowCheckout(false)} title="خلاصهٔ اشتراک" maxWidth="xs" actions={<Button onClick={() => setShowCheckout(false)}>بازگشت به پلن‌ها</Button>}>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ justifyContent: "space-between", gap: 2 }}><Typography>پلن انتخابی</Typography><Typography sx={{ fontWeight: 700 }}>{selected.label}</Typography></Stack>
          <Stack direction="row" sx={{ justifyContent: "space-between", gap: 2 }}><Typography>مبلغ</Typography><Typography sx={{ fontWeight: 700 }}>{price(selected.price)} تومان</Typography></Stack>
          <Typography sx={{ color: "text.secondary", fontSize: 13, lineHeight: 2 }}>قیمت‌ها نمایشی‌اند. پرداخت آنلاین پس از اتصال درگاه فعال می‌شود؛ در حال حاضر خرید یا فعال‌سازی اشتراک انجام نمی‌شود.</Typography>
        </Stack>
      </Modal>
    </Box>
  );
}
