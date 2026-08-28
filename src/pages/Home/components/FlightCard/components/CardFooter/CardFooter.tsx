import { alpha, Box, Typography } from "@mui/material";
import React from "react";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import IosShareIcon from "@mui/icons-material/IosShare";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useRout } from "../../../hooks/useRout";
const CardFooter = () => {
  const { isRouteActive, toggleRoute } = useRout();

  return (
    <Box
      sx={{
        bgcolor: (t) =>
          t.palette.mode === "dark"
            ? alpha(t.palette.common.black, 0.4)
            : alpha(t.palette.action.hover, 0.05),

        py: 1,
        px: 0.5,

        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",

        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <ActionButton icon={<ViewInArIcon />} label="3D view" />

      <ActionButton
        icon={<AltRouteIcon />}
        label="Route"
        onClick={toggleRoute}
        isActive={isRouteActive}
      />

      <ActionButton
        icon={<CenterFocusStrongIcon />}
        label="Follow"
        // onClick={onFollow}
      />

      <ActionButton icon={<IosShareIcon />} label="Share" />

      <ActionButton icon={<MoreHorizIcon />} label="More" />
    </Box>
  );
};

export default CardFooter;

const ActionButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}> = ({ icon, label, onClick, isActive }) => (
  <Box
    onClick={onClick}
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",

      color: isActive ? "primary.main" : "text.secondary",
      opacity: isActive ? 1 : 0.85,

      transition: (t) =>
        t.transitions.create(["opacity", "color"], {
          duration: t.transitions.duration.shorter,
        }),

      "&:hover": {
        opacity: 1,
        color: "primary.main",
      },

      minWidth: 52,
    }}
  >
    {React.cloneElement(
      icon as React.ReactElement<{ sx?: Record<string, unknown> }>,
      { sx: { fontSize: 20, mb: 0.3 } },
    )}
    <Typography variant="caption" sx={{ fontSize: "0.68rem", fontWeight: 500 }}>
      {label}
    </Typography>
  </Box>
);
