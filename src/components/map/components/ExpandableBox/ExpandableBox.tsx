import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useState, type FC, type ReactNode } from "react";

import {
  getMapToolAccordionButtonSx,
  getMapToolButtonSx,
} from "./styles/mapToolButtonStyles";
import { useTranslation } from "react-i18next";

interface ExpandableBoxProps {
  children: ReactNode;
  accordionText: string;
  accordionIcon: ReactNode;
  id?: string;
  footer?: ReactNode;
}

const ExpandableBox: FC<ExpandableBoxProps> = ({
  children,
  accordionText,
  accordionIcon,
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();

  return (
    <Paper
      elevation={4}
      sx={{
        width: 48,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      {/* Main Toggle Button (Always visible) */}
      <Tooltip
        title={`${accordionText} ${t("tools")}`}
        placement="left"
        disableInteractive
      >
        <IconButton
          onClick={() => setExpanded(!expanded)}
          sx={{
            ...getMapToolAccordionButtonSx(theme, { expanded, size: 48 }),
            display: "flex",
            flexDirection: "column",
            gap: 0.25,
          }}
        >
          {accordionIcon}
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "0.6rem",
              fontWeight: "bold",
              letterSpacing: 0.5,
              textTransform: "uppercase",
            }}
          >
            {accordionText}
          </Typography>
        </IconButton>
      </Tooltip>

      {/* Smooth Vertical Animation */}
      <Collapse in={expanded} timeout="auto">
        <Stack
          direction="column"
          sx={{ alignItems: "center", pb: 0.5, pt: 1 }}
          spacing={1}
        >
          {/* Tools */}
          {children}

          {/* Divider line before close arrow */}
          <Box
            sx={{ width: "60%", height: "1px", bgcolor: "divider", my: 0.5 }}
          />

          {/* Close Arrow */}
          <IconButton
            size="small"
            onClick={() => setExpanded(false)}
            sx={getMapToolButtonSx(theme, false)}
          >
            <KeyboardArrowUpIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Collapse>
    </Paper>
  );
};

export default ExpandableBox;
