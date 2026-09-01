import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

const Bookmark = () => {
  const { bookmarks } = useSelector((state: RootState) => state.bookmarks);
  return (
    <>
      {bookmarks.map((bookmark, index) => (
        <Box
          key={index}
          sx={(theme) => ({
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: theme.shape.borderRadius,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: theme.spacing(1.2),
            bgcolor: theme.palette.background.paper,
          })}
        >
          <Stack direction="column">
            <Typography variant="body2" component="p">
              {bookmark.callsign}
            </Typography>
            <Typography
              variant="caption"
              sx={(theme) => ({
                color: theme.palette.text.secondary,
                fontSize: "0.7rem",
              })}
            >
              {bookmark.origin.city} → ${bookmark.destination.city}
            </Typography>
          </Stack>
          <IconButton
            size="small"
            sx={(theme) => ({
              color: theme.palette.error.light,
            })}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}
    </>
  );
};

export default Bookmark;
