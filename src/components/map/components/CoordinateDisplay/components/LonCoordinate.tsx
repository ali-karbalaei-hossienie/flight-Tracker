import { Box, Typography } from "@mui/material";

type LonCoordinateProps = {
  coords?: {
    lng?: number | string | null;
  } | null;
};

const LonCoordinate = ({ coords }: LonCoordinateProps) => {
  return (
    <>
      <Box>
        <Typography
          sx={{
            minWidth: "70px",
            color: "text.secondary",
            textAlign: "center",
            fontSize: "10px",
          }}
        >
          {coords ? coords.lng : "-"}
        </Typography>
      </Box>
      <Typography
        sx={{
          color: "text.secondary",
          fontSize: 10,
          fontWeight: "bold",
        }}
      >
        Lon
      </Typography>
    </>
  );
};

export default LonCoordinate;
