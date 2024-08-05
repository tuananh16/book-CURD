import axios from "axios";
import React, { useEffect, useState } from "react";

function BookAdmin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    axios
      .get("http://localhost:5000/user/getAllUser", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          token: `Bearer ${refreshToken}`,
        },
      })
      .then((response) => {
        if (response.data.status !== 200) {
          window.location.href = "/";
        }
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);
  return (
    <div>
      <h1>BookAdmin </h1>
      <a href="/login">Login</a>
      <a href="/register">Register</a>
    </div>
  );
}

export default BookAdmin;
