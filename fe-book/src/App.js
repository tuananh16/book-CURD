import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Login from "./component/login";
import Book from "./component/book";
import Register from "./component/register";
import Header from "./component/header/index"; 

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

function Main() {
  const location = useLocation();
  const hideHeaderPaths = location.pathname.split("/")[1];
  const isLoginPage =
    hideHeaderPaths === "login" || hideHeaderPaths === "register";

  return (
    <>
      {!isLoginPage && <Header />}
      <Routes>
        <Route path="/" element={<Book />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
