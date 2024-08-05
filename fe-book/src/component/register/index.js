import React, { useState } from "react";
import "../login/style.scss";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const url = "http://localhost:5000";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const [isCheckEmail, setIsCheckEmail] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(emailRegex.test(value));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${url}/user/register`, {
        email: email,
        password: password,
        name: name,
      });
      if (response.data.message === "email already exists") {
        setIsCheckEmail(true);
        setIsRegister(false);
      } else if (response.data.status !== 200) {
        setIsRegister(false);
      } else {
        setIsRegister(true);
        setIsCheckEmail(false);
        setEmail("");
        setName("");
        setPassword("");
      }
    } catch (error) {
      if (error.response) {
        console.log("lỗi", error.response.data);
      } else if (error.request) {
        console.log("lỗi", error.request);
      } else {
        console.log("lỗi", error.message);
      }
    }
  };

  return (
    <div className="container-login">
      <div className="card">
        <div className="card2">
          <form className="form" onSubmit={handleRegister}>
            <p id="heading">Register</p>
            <div className="field">
              <label htmlFor="email">
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  height="16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                  className="input-icon"
                >
                  <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
                </svg>
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                className="input-field"
                placeholder="Email"
                autoComplete="off"
                required
              />
            </div>
            {!isValid && <p style={{ color: "red" }}>Email không hợp lệ</p>}
            <div className="field">
              <label htmlFor="name">
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  height="16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                  className="input-icon"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                </svg>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                placeholder="Name"
                autoComplete="off"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="password">
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  height="16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                  className="input-icon"
                >
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                </svg>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="input-field"
                placeholder="Password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {isRegister && <p style={{ color: "red" }}>Đăng ký thành công</p>}
            {isCheckEmail && <p style={{ color: "red" }}>Email đã tồn tại</p>}
            <div className="btn">
              <Link to="/login">
                <button type="button" className="button1">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </button>
              </Link>
              <button type="submit" className="button2">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
