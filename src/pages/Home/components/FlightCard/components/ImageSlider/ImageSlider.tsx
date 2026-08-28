import { alpha, Box, Typography, useTheme } from "@mui/material";
import type { FlightInfo } from "../../../FlightPopper/hooks/types";
import SimpleImageSlider from "react-simple-image-slider";

interface ImageSliderType {
  data: FlightInfo;
}

const ImageSlider = ({ data }: ImageSliderType) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: 180,
        bgcolor: "common.black",
        overflow: "hidden",

        "& .rsis-container": {
          width: "100% !important",
          height: "180px !important",
        },

        "& .rsis-image": {
          backgroundSize: "cover !important",
          backgroundPosition: "center !important",
        },
      }}
    >
      <SimpleImageSlider
        width={360}
        height={180}
        images={data.photos.map((url) => ({
          url,
        }))}
        showBullets
        showNavs
        navStyle={2}
        navSize={28}
        navMargin={12}
        slideDuration={0.4}
        autoPlay={true}
        loop
        useGPURender
        bgColor={theme.palette.common.black}
      />

      {/* =====================================================
              Image Overlay
          ===================================================== */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          pointerEvents: "none",

          background: (t) =>
            `linear-gradient(
                  to top,
                  ${alpha(t.palette.common.black, 0.8)} 0%,
                  transparent 100%
                )`,

          px: 1.5,
          py: 1,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "common.white",
            fontSize: "0.75rem",
          }}
        >
          © {data.photographer}
        </Typography>
      </Box>
    </Box>
  );
};

export default ImageSlider;
