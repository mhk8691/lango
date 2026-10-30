"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import Logo from "@/components/Logo";
import Modal from "@/components/Modal";
import PlacementIllustration from "./PlacementIllustration";

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
export type PlacementLevel = (typeof levels)[number];

type PlacementIntroProps = {
  onStart?: (level: PlacementLevel | null) => void;
};

export default function PlacementIntro({ onStart }: PlacementIntroProps) {
  const [showNotice, setShowNotice] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<PlacementLevel | null>(
    null,
  );

  function start() {
    if (onStart) onStart(selectedLevel);
    else setShowNotice(true);
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
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: { xs: 490, sm: 600, md: 700, lg: 760 },
          px: { xs: 1.5, sm: 3 },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            border: "5px solid #e4f2ff",
            borderRadius: { xs: "25px", md: "34px" },
            overflow: "hidden",
            boxShadow: "0 24px 80px #1a6cba20",
            px: { xs: 2, sm: 3, md: 5 },
            pt: 2,
            pb: { xs: 2.5, md: 5 },
          }}
        >
          <Stack
            component="header"
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              mb: { xs: 1.5, md: 3 },
            }}
          >
            <Logo variant="mark" preload sx={{ width: 36 }} sizes="36px" />
            <IconButton
              component={Link}
              href="/complete-profile"
              aria-label="بازگشت به تکمیل پروفایل"
              sx={{ color: "#13204f" }}
            >
              <ArrowForwardRounded fontSize="small" />
            </IconButton>
          </Stack>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gridTemplateAreas: '"heading" "illustration" "content"',
              alignItems: "center",
            }}
          >
            <Box sx={{ gridArea: "heading", textAlign: "center" }}>
              <Typography
                component="h1"
                sx={{
                  color: "#101b53",
                  fontWeight: 800,
                  fontSize: { xs: 24, md: 29, lg: 34 },
                  lineHeight: 1.7,
                }}
              >
                آزمون تعیین سطح
              </Typography>
              <Typography
                sx={{
                  color: "#7b89a7",
                  fontSize: { xs: 13, md: 14 },
                  lineHeight: 2,
                  mt: 1,
                }}
              >
                با چند سؤال ساده، سطح زبان شما مشخص می‌شود.
              </Typography>
            </Box>

            <Box
              sx={{
                gridArea: "illustration",
                width: "100%",
                maxWidth: { xs: 285, md: 340 },
                mx: "auto",
                my: 1,
              }}
            >
              <PlacementIllustration />
            </Box>

            <Box sx={{ gridArea: "content" }}>
              <Box
                role="radiogroup"
                dir="ltr"
                aria-label="انتخاب سطح تقریبی زبان از A1 تا C2"
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
                  gap: { xs: 0.75, sm: 1 },
                }}
              >
                {levels.map((level) => (
                  <Box
                    component="label"
                    key={level}
                    sx={{
                      position: "relative",
                      cursor: "pointer",
                      minHeight: 44,
                      bgcolor:
                        selectedLevel === level ? "primary.main" : "#f1f7fd",
                      border: "1px solid",
                      borderColor:
                        selectedLevel === level
                          ? "primary.main"
                          : "transparent",
                      borderRadius: "9px",
                      textAlign: "center",
                      py: { xs: 1.5, md: 1.75 },
                      color: selectedLevel === level ? "white" : "#13204f",
                      fontWeight: 700,
                      fontSize: { xs: 13, md: 14 },
                      "&:hover": { borderColor: "primary.main" },
                      "&:has(input:focus-visible)": {
                        outline: "2px solid",
                        outlineColor: "primary.main",
                        outlineOffset: 3,
                      },
                    }}
                  >
                    <Box
                      component="input"
                      type="radio"
                      name="placement-level"
                      value={level}
                      checked={selectedLevel === level}
                      onChange={() => setSelectedLevel(level)}
                      sx={{
                        position: "absolute",
                        inset: 0,
                        opacity: 0,
                        width: "100%",
                        height: "100%",
                        m: 0,
                        cursor: "pointer",
                      }}
                    />
                    {level}
                  </Box>
                ))}
              </Box>
              <Typography
                sx={{
                  textAlign: "center",
                  color: "#7b89a7",
                  fontSize: { xs: 11.5, md: 13 },
                  lineHeight: 2,
                  mt: 2,
                  mb: { xs: 2.5, md: 3.5 },
                }}
              >
                با هدف‌گذاری و توجه به نتیجهٔ آزمون، در مسیر یادگیری زبان
                قدم‌های مطمئن‌تری بردارید.
                <br />
                وقتشه سطح خودت رو بشناسی!
              </Typography>
              <Button
                variant="contained"
                fullWidth
                onClick={start}
                sx={{
                  minHeight: 49,
                  fontSize: 15,
                  borderRadius: "12px",
                  background: "linear-gradient(180deg, #2287ff, #0760ff)",
                  boxShadow: "0 7px 18px #1673ff25",
                }}
              >
                شروع آزمون
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>

      <Modal
        open={showNotice}
        onClose={() => setShowNotice(false)}
        title="آزمون به‌زودی آماده می‌شود"
        maxWidth="xs"
        actions={
          <Button onClick={() => setShowNotice(false)}>متوجه شدم</Button>
        }
      >
        <Typography sx={{ color: "text.secondary" }}>
          آزمون تعیین سطح به‌زودی در دسترس قرار می‌گیرد.
        </Typography>
        {selectedLevel && (
          <Typography sx={{ mt: 1, color: "primary.main", fontSize: 14 }}>
            سطح انتخابی شما: <bdi>{selectedLevel}</bdi>
          </Typography>
        )}
      </Modal>
    </Box>
  );
}
