import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormControl, TextField } from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ id, book, setDataChanged, dataChanged }) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState(book.title);
  const [author, setAuthor] = React.useState(book.author);
  const [body, setBody] = React.useState(book.body);
  const accessToken = localStorage.getItem("accessToken");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    try {
      if (title.trim() === "" || author.trim() === "" || body.trim() === "") {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
      }
      await axios.put(
        `http://localhost:5000/book/update/${id}`,
        {
          title,
          author,
          body,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setDataChanged(!dataChanged);
      handleClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Sửa</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sửa sách
          </Typography>
          <FormControl>
            <TextField
              label="Tên tác phẩm"
              variant="outlined"
              fullWidth
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required={true}
            />
            <TextField
              label="Tác giả"
              variant="outlined"
              fullWidth
              margin="normal"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required={true}
            />
            <TextField
              label="Nội dung"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required={true}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Sửa
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}
