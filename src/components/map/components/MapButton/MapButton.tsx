import {
  ClickAwayListener,
  Fade,
  IconButton,
  Paper,
  Popper,
  Tooltip,
  Typography,
  type PopperPlacementType,
} from "@mui/material";
import type { CSSProperties } from "@mui/material/styles";
import React, { useState } from "react";
import { useMapButtonStyles } from "./styles/useMapButtonStyles";

interface MapButtonProps {
  children?: React.ReactNode;
  icon: React.ReactNode;
  newPlacement: PopperPlacementType;
  title: string;

  style?: CSSProperties;
}
const MapButton = ({
  children,
  icon,
  newPlacement,
  style,
  title,
}: MapButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();

  const { classes } = useMapButtonStyles();

  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  return (
    <div>
      <Popper
        disablePortal
        sx={{ zIndex: 1200 }}
        style={style}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 4],
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <Typography sx={{ p: 2 }}>{children}</Typography>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Paper
        elevation={4}
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "12px",
          overflow: "hidden",
          backdropFilter: "blur(10px)",
          backgroundColor: "background.paper",
          border: `1px solid ${theme.palette.background.paper}`,
          gap: 0.5,
          transition: "all 0.4s ease-in-out",
          width: "fit-content",
          p: 0.5,
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
          },
        })}
      >
        <Tooltip title={title} placement="right">
          <IconButton
            disableRipple
            className={classes["mapLayers-button"]}
            onClick={handleClick(newPlacement)}
          >
            {icon}
          </IconButton>
        </Tooltip>
      </Paper>
    </div>
  );
};

export default MapButton;
