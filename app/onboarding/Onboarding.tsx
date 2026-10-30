"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useAppRouter as useRouter } from "@/components/AppLink";
import Logo from "@/components/Logo";
import {
  Box,
  Button,
  ButtonBase,
  Container,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";

const slides = [
  {
    image: "/images/onboarding/listener.png",
    alt: "دختری با هدفون و قلم، آمادهٔ یادگیری زبان",
    title: "در سطح خودت یاد بگیر",
    description: "واقعی نسبت به زبان انگلیسی‌ات!",
    detail:
      "از همون‌جایی شروع کن که هستی؛ قدم‌به‌قدم، با درس‌هایی که برای سطح تو طراحی شدن.",
  },
  {
    image: "/images/onboarding/learning.png",
    alt: "ذره‌بین و هدف برای نمایش مسیر یادگیری شخصی",
    title: "مسیر هوشمند یادگیری",
    description: "هوشمندانه‌تر، نه فقط بیشتر!",
    detail:
      "هوش مصنوعی با توجه به نیازها و هدفت، مسیر یادگیری مخصوص خودت رو بهت پیشنهاد می‌ده.",
  },
  {
    image: "/images/onboarding/progress.png",
    alt: "لپ‌تاپ با نمودار صعودی پیشرفت یادگیری",
    title: "تمرین، مرور، پیشرفت",
    description: "هر روز، یه قدم جلوتر از دیروز.",
    detail:
      "تمرین‌های کوتاه و مرورهای به‌موقع کمکت می‌کنن چیزی که یاد گرفتی، واقعاً یادت بمونه.",
  },
];

type OnboardingProps = {
  onComplete?: () => void;
  onLogin?: () => void;
};

export default function Onboarding({ onComplete, onLogin }: OnboardingProps) {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();
  const touchStart = useRef<number | null>(null);
  const slide = slides[activeStep];
  const isLast = activeStep === slides.length - 1;

  function finish(mode: "start" | "login") {
    const action = mode === "login" ? onLogin : onComplete;
    if (action) return action();
    router.push("/login");
  }

  function next() {
    if (isLast) finish("start");
    else setActiveStep((step) => step + 1);
  }

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        py: { xs: 2, sm: 4, lg: 6 },
        background:
          "radial-gradient(ellipse at 15% 15%, #c7e5ff 0%, transparent 48%), radial-gradient(ellipse at 90% 85%, #c8e8ff 0%, transparent 45%), #9dcdff",
        overflow: "hidden",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: { xs: 460, md: 960, lg: 1160 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: { xs: "28px", md: "36px" },
            border: "5px solid #e4f2ff",
            bgcolor: "#fff",
            boxShadow: "0 24px 80px #1a6cba20",
          }}
        >
          <Stack
            component="header"
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              px: { xs: 2, sm: 3, md: 5 },
              pt: { xs: 2.5, md: 3.5 },
            }}
          >
            <Box sx={{ width: 64 }} />
            <Logo preload />
            <Button
              onClick={() => setActiveStep(2)}
              disabled={isLast}
              size="small"
              sx={{
                minWidth: 64,
                color: "#8295b0",
                fontSize: 12,
                fontWeight: 500,
                "&.Mui-disabled": {
                  backgroundColor: "transparent",
                  color: "transparent",
                },
              }}
            >
              رد کردن
            </Button>
          </Stack>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gridTemplateAreas: {
                xs: '"image" "content"',
                md: '"content image"',
              },
              alignItems: "center",
              px: { xs: 2.5, md: 5, lg: 7 },
              pb: { xs: 3, md: 5 },
              columnGap: { md: 4, lg: 7 },
            }}
          >
            <Box
              onTouchStart={(event) => {
                touchStart.current = event.changedTouches[0].clientX;
              }}
              onTouchEnd={(event) => {
                if (touchStart.current === null) return;
                const distance =
                  event.changedTouches[0].clientX - touchStart.current;
                if (Math.abs(distance) > 50)
                  setActiveStep((step) =>
                    Math.max(0, Math.min(2, step + (distance > 0 ? 1 : -1))),
                  );
                touchStart.current = null;
              }}
              sx={{
                gridArea: "image",
                position: "relative",
                width: "100%",
                maxWidth: { xs: 300, md: 420, lg: 470 },
                mx: "auto",
                my: { xs: 1, md: 3 },
                aspectRatio: "1",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, #edf7ff 0%, #f5faff 60%, #fff 72%)",
                touchAction: "pan-y",
              }}
            >
              {slides.map((item, index) => (
                <Box
                  key={item.image}
                  sx={{
                    position: "absolute",
                    inset: 0,
                    opacity: index === activeStep ? 1 : 0,
                    transform: index === activeStep ? "scale(1)" : "scale(.96)",
                    transition: "opacity 250ms ease, transform 350ms ease",
                    "@media (prefers-reduced-motion: reduce)": {
                      transition: "none",
                    },
                  }}
                >
                  <Image
                    src={item.image}
                    alt={index === activeStep ? item.alt : ""}
                    fill
                    sizes="(max-width: 899px) 300px, (max-width: 1199px) 400px, 470px"
                    preload={index === 0}
                    style={{
                      objectFit: "contain",
                      borderRadius: "28px",
                      mixBlendMode: "multiply",
                    }}
                  />
                </Box>
              ))}
            </Box>

            <Stack
              sx={{
                gridArea: "content",
                textAlign: { xs: "center", md: "inherit" },
                minWidth: 0,
              }}
            >
              <Typography
                sx={{
                  display: { xs: "none", md: "block" },
                  color: "#7388a6",
                  fontSize: 13,
                  mb: 2,
                }}
              >
                یادگیری، به سبک خودت
              </Typography>
              <Box
                aria-live="polite"
                aria-atomic="true"
                sx={{ minHeight: { xs: 132, md: 195 } }}
              >
                <Typography
                  component="h1"
                  sx={{
                    color: "#101b53",
                    fontWeight: 800,
                    fontSize: { xs: 24, sm: 26, md: 30, lg: 36 },
                    lineHeight: 1.7,
                    mb: 1,
                  }}
                >
                  {slide.title}
                </Typography>
                <Typography
                  sx={{
                    color: "#66769c",
                    fontSize: { xs: 14, md: 15 },
                    fontWeight: 500,
                    mb: { xs: 0.5, md: 1 },
                  }}
                >
                  {slide.description}
                </Typography>
                <Typography
                  sx={{
                    color: "#8290aa",
                    fontSize: { xs: 12.5, md: 14 },
                    lineHeight: 2,
                    maxWidth: 360,
                    mx: { xs: "auto", md: 0 },
                  }}
                >
                  {slide.detail}
                </Typography>
              </Box>

              <Stack
                direction="row"
                sx={{
                  justifyContent: { xs: "center", md: "flex-start" },
                  my: { xs: 1.5, md: 2.5 },
                }}
                aria-label="مراحل معرفی لنگو"
              >
                {slides.map((item, index) => (
                  <ButtonBase
                    key={item.title}
                    onClick={() => setActiveStep(index)}
                    aria-label={`مرحله ${index + 1}: ${item.title}`}
                    aria-current={index === activeStep ? "step" : undefined}
                    sx={{
                      width: 28,
                      height: 32,
                      borderRadius: 2,
                      "&.Mui-focusVisible": {
                        outline: "2px solid #096bff",
                        outlineOffset: 2,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: index === activeStep ? 18 : 7,
                        height: 7,
                        borderRadius: 9,
                        backgroundColor:
                          index === activeStep ? "#126aff" : "#dbe4f3",
                        transition: "width 200ms",
                        "@media (prefers-reduced-motion: reduce)": {
                          transition: "none",
                        },
                      }}
                    />
                  </ButtonBase>
                ))}
              </Stack>

              <Stack
                direction="row"
                spacing={1.5}
                sx={{ mt: { xs: 0.5, md: 1 } }}
              >
                <Button
                  variant="contained"
                  fullWidth
                  onClick={next}
                  endIcon={
                    <ArrowBackRounded sx={{ fontSize: "18px !important",mr:1 }} />
                  }
                  sx={{
                    minHeight: 50,
                    borderRadius: "13px",
                    background: "linear-gradient(180deg, #2287ff, #0760ff)",
                    boxShadow: "0 7px 18px #1673ff30",
                    fontSize: 15,
                    "&:hover": { boxShadow: "0 9px 22px #1673ff45" },
                  }}
                >
                  {isLast ? "شروع کنیم" : "بعدی"}
                </Button>
                {isLast && (
                  <Button
                    variant="outlined"
                    onClick={() => finish("login")}
                    sx={{
                      minWidth: 100,
                      borderRadius: "13px",
                      borderColor: "#9ac5ff",
                      color: "#126aff",
                    }}
                  >
                    ورود
                  </Button>
                )}
              </Stack>
              <Box sx={{ height: 36, mt: 1 }}>
                {activeStep > 0 && (
                  <IconButton
                    aria-label="مرحله قبل"
                    onClick={() => setActiveStep((step) => step - 1)}
                    size="small"
                    sx={{ color: "#8496b2" }}
                  >
                    <ArrowForwardRounded fontSize="small" />
                  </IconButton>
                )}
              </Box>
            </Stack>
          </Box>
        </Paper>
        <Typography
          sx={{ textAlign: "center", mt: 2.5, color: "#426f9f", fontSize: 12 }}
        >
          هر روز یه قدم، به دنیایی بزرگ‌تر.
        </Typography>
      </Container>


    </Box>
  );
}
