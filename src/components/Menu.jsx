import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoPupys from "../assets/logopupys.png";
import useAuth from "../hooks/useAuth";

const Menu = () => {
  const isSelected = (path) => (step === path ? "text-[#b23417]" : "");
  const location = useLocation();
  const [step] = useState(location.pathname);

  const isAuth = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsAuthenticated(() => isAuth);
  }, [isAuth]);

  const logout = () => {
    localStorage.removeItem("pupysSS");
    navigate("/");
    setIsAuthenticated(() => false);
  };
  return (
    <>
      <header className="h-[8px] bg-[#b23417]"></header>
      <nav className="w-[100vw] h-[120px] flex justify-between items-center p-[8px] border-b-black border-b-2">
        <div className="flex items-center">
          <Link
            to="/"
            className={`bg-transparent hover:font-bold w-[230px] text-center ${isSelected(
              "/"
            )}`}
          >
            <img src={logoPupys} className="logo" alt="Vite logo" />
          </Link>
        </div>
        <div className="flex gap-[12px]">
          <Link
            to="/products"
            className={`bg-transparent hover:text-[#b23417] font-bold min-w-[80px] text-center ${isSelected(
              "/products"
            )}`}
          >
            Productos
          </Link>
          <Link
            to="/we"
            className={`bg-transparent hover:text-[#b23417] font-bold min-w-[80px] text-center ${isSelected(
              "/we"
            )}`}
          >
            Nosotros
          </Link>
          {isAuthenticated && (
            <Link
              to="/orders"
              className={`bg-transparent hover:text-[#b23417] font-bold min-w-[80px] text-center ${isSelected(
                "/orders"
              )}`}
            >
              Mis pedidos
            </Link>
          )}
          <Link
            to="/contacts"
            className={`bg-transparent hover:text-[#b23417] font-bold min-w-[80px] text-center ${isSelected(
              "/contacts"
            )}`}
          >
            Contactos
          </Link>
        </div>
        <div className="flex items-center gap-[12px]">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className={`bg-transparent hover:text-[#b23417] font-bold min-w-[80px] text-center ${isSelected(
                  "/login"
                )}`}
              >
                <i className="fi fi-rs-enter"></i> Login
              </Link>
              <Link
                to="/register"
                className={`bg-transparent hover:text-[#b23417] font-bold min-w-[80px] text-center ${isSelected(
                  "/register"
                )}`}
              >
                Registro
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className={`bg-transparent hover:text-[#b23417] font-bold min-w-[80px] text-center ${isSelected(
                  "/profile"
                )}`}
              >
                <i className="fi fi-rs-user"></i> Mi Perfil
              </Link>
              <button
                onClick={() => logout()}
                className={`bg-transparent hover:text-[#b23417] font-bold min-w-[80px] text-center ${isSelected(
                  "/logout"
                )}`}
              >
                <i className="fi fi-rs-exit"></i> Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Menu;
