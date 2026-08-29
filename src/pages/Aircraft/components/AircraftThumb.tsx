import { AirplanemodeActive } from "@mui/icons-material";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";

interface AircraftThumbProps {
  className?: string;
  iconSize?: number;
  sx?: SxProps<Theme>;
}

export default function AircraftThumb({
  className,
  iconSize = 150,
  sx,
}: AircraftThumbProps) {
  return (
    <Box
      className={className}
      sx={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(135deg, #1b1f24 0%, #34414f 58%, #5a6b7d 100%)",
        overflow: "hidden",
        ...sx,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 72% 22%, rgba(255,255,255,0.22), transparent 55%)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 14px)",
        }}
      />
      <AirplanemodeActive
        sx={{
          position: "absolute",
          right: -iconSize * 0.12,
          bottom: -iconSize * 0.18,
          fontSize: iconSize,
          color: "rgba(255,255,255,0.16)",
          transform: "rotate(-28deg)",
        }}
      />
    </Box>
  );
}
