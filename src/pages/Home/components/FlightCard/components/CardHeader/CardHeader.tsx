import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { alpha, Box, Chip, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../../../app/store";
import {
  addBookmark,
  removeBookmark,
} from "../../../../../../features/bookmark/bookmarkSlice";
import type { FlightInfo } from "../../../FlightPopper/hooks/types";

interface ICardHeader {
  onClose: () => void;
  data: FlightInfo;
}

const CardHeader = ({ onClose, data }: ICardHeader) => {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state: RootState) => state.bookmarks);

  const isBookmarked = bookmarks.some((item) => item.id === data.id);

  const handleToggleBookmark = () => {
    if (isBookmarked) {
      dispatch(removeBookmark(data.id));
    } else {
      dispatch(addBookmark(data));
    }
  };

  return (
    <Box
      sx={{
        p: 1.5,
        pb: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        bgcolor: (t) =>
          t.palette.mode === "dark"
            ? alpha(t.palette.common.black, 0.3)
            : alpha(t.palette.action.hover, 0.08),
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 0.5,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: "primary.main",
              letterSpacing: 0.8,
              lineHeight: 1.1,
            }}
          >
            {data.callsign}
          </Typography>

          <Chip
            label={data.flightNumber}
            size="small"
            sx={{
              height: 20,
              fontSize: "0.72rem",
              fontWeight: 700,
              bgcolor: "action.selected",
              color: "text.primary",
              borderRadius: 0.75,
            }}
          />

          <Chip
            label={data.aircraftModel}
            size="small"
            sx={{
              height: 20,
              fontSize: "0.72rem",
              fontWeight: 700,
              bgcolor: (t) => alpha(t.palette.primary.main, 0.15),
              color: "primary.main",
              borderRadius: 0.75,
            }}
          />
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: "0.85rem",
          }}
        >
          {data.airline}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        <IconButton
          size="small"
          aria-label={
            isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"
          }
          onClick={handleToggleBookmark}
          sx={{
            p: 0.5,
            color: "primary.main",
          }}
        >
          {isBookmarked ? (
            <StarIcon fontSize="small" />
          ) : (
            <StarBorderIcon fontSize="small" />
          )}
        </IconButton>

        <IconButton
          size="small"
          aria-label="Close"
          onClick={onClose}
          sx={{
            p: 0.5,
            color: "text.secondary",
            "&:hover": {
              color: "text.primary",
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CardHeader;
