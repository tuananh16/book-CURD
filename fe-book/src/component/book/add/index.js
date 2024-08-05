import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import "./style.scss";
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

export default function BasicModal({ setDataChanged, dataChanged }) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [body, setBody] = React.useState("");
  const [image, setImage] = React.useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const accessToken = localStorage.getItem("accessToken");

  const handleSubmit = async () => {
    try {
      if (title.trim() === "" || author.trim() === "" || body.trim() === "") {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("body", body);
      if (image) {
        formData.append("image", image);
      }

      await axios.post(
        "http://localhost:5000/book/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setDataChanged(!dataChanged);
      handleClose();
    } catch (error) {
      console.error("Error:", error);
    }
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen}>Thêm sách</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Thêm sách
          </Typography>
          <TextField
            label="Tên tác phẩm"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Tác giả"
            variant="outlined"
            fullWidth
            margin="normal"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
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
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Thêm
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
