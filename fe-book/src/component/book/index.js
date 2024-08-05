import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";
import Add from "./add";
import Edit from "./edit";
import { Button } from "@mui/material";

function Book() {
  const [books, setBooks] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [error, setError] = useState(null);
  const [dataChanged, setDataChanged] = useState(false);

  const accessToken = localStorage.getItem("accessToken");
  const accessTokenExpiry = localStorage.getItem("accessTokenExpiry");

  const isTokenExpired = () => {
    return accessTokenExpiry && new Date() > new Date(accessTokenExpiry);
  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/user/refreshToken",
        null,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const { newAccessToken, access_token_expiry } = response.data.data;
      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("accessTokenExpiry", access_token_expiry);
      return newAccessToken;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      setError(
        "There was an error refreshing the access token. Please log in again."
      );
      return null;
    }
  };

  const fetchBooks = async () => {
    let token = accessToken;
    if (isTokenExpired()) {
      token = await refreshAccessToken();
      if (!token) return; // If unable to refresh token, stop fetching books
    }

    if (token) {
      try {
        const response = await axios.get("http://localhost:5000/book/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const { getAllBook, user } = response.data.data;
        setBooks(getAllBook);
        if (user.isAdmin) {
          setAdmin(true);
        }
      } catch (error) {
        setError(
          "There was an error fetching the books. Please try again later."
        );
      }
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [dataChanged]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có muốn xóa quyển sách này?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/book/delete/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setBooks(books.filter((book) => book._id !== id));
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="container-main">
      <h1>Book</h1>
      {error && <p>{error}</p>}
      <div className="list-book">
        {books.map((book) => (
          <div key={book._id} className="book">
            <img
              src={
                book.coverImageUrl ||
                "https://i.pinimg.com/originals/71/88/a2/7188a275c51689f47f4c5bc4de7739f9.jpg"
              }
              alt="Book cover"
            />
            <h2>{book.title}</h2>
            <span>{book.author}</span>
            <p>{book.body}</p>
            {admin && (
              <div className="admin">
                <Edit
                  id={book._id}
                  book={book}
                  setDataChanged={setDataChanged}
                  dataChanged={dataChanged}
                />
                <Button onClick={() => handleDelete(book._id)}>Delete</Button>
              </div>
            )}
          </div>
        ))}
        {admin && (
          <div>
            <Add setDataChanged={setDataChanged} dataChanged={dataChanged} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Book;
