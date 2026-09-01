import DeleteIcon from "@mui/icons-material/Delete";
import GpsNotFixedIcon from "@mui/icons-material/GpsNotFixed";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

const Bookmark = () => {
  const bookmarks = useSelector((state: RootState) => state.bookmarks);

  if (!bookmarks.length) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ p: 2, textAlign: "center" }}
      >
        There is no Bookmark
      </Typography>
    );
  }

  return (
    <Stack spacing={1}>
      {bookmarks.map((bookmark) => (
        <Box
          key={bookmark.id}
          sx={(theme) => ({
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: theme.shape.borderRadius,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: theme.spacing(1.2),
            bgcolor: theme.palette.background.paper,
            gap: 1,
          })}
        >
          <Stack direction="column" sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              variant="body1"
              component="p"
              sx={{ fontWeight: "bold" }}
              noWrap
            >
              {bookmark.callsign}
            </Typography>
            <Typography
              variant="caption"
              sx={(theme) => ({
                color: theme.palette.text.secondary,
                fontSize: "0.75rem",
              })}
            >
              {bookmark.origin.city} → {bookmark.destination.city}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={0.5} sx={{ flexShrink: 0 }}>
            <IconButton size="small" aria-label="Locate aircraft">
              <GpsNotFixedIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              aria-label="Delete bookmark"
              sx={(theme) => ({
                color: theme.palette.error.light,
              })}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};

export default Bookmark;
