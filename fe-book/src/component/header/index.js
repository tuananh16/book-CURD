// src/components/Header.js
import React, { useEffect, useState } from "react";
import "./style.scss";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";

const Header = () => {
  const handlelogOut = () => {
    localStorage.removeItem("accessToken", "refreshToken");
  };
  const accessToken = localStorage.getItem("accessToken");
  const [user, setUser] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const name = response.data.name;
        setUser(name);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, [accessToken]);
  console.log(user);
  return (
    <header className="header">
      <div className="header__logo">
        <a href="/">Trang chủ</a>
      </div>
      <div className="header__actions">
        <FaUserCircle color="#dee2e6" />
        <p>{user}</p>
        <a href="/login" onClick={handlelogOut}>
          Logout
        </a>
      </div>
    </header>
  );
};

export default Header;
