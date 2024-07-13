import React, { useState } from "react";
import Menu from "../components/Menu";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { checkEmailValidation } from "../utils/validaciones";
import Button from "../components/Button";
import { basePath } from "../constants/basepath";

const Login = () => {
  const [email, setEmail] = useState("");
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      setError(() => "Ambos campos son obligatorios.");
      return;
    }
    if (checkEmailValidation(email) === false) {
      setError(() => "El formato del email no es válido. ej:juan@gmail.com");
      return;
    }

    fetch(`${basePath}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, contraseña: password }),
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Usuario o contraseña incorrectos");
        }
        return response.json();
      })
      .then((value) => {
        console.log("Inicio de sesión exitoso", { email, password });
        const { data } = value;
        localStorage.setItem("pupysSS", data.token);
        navigate("/");
      })
      .catch((error) => {
        setError(() => error.message);
      });

    setError(() => "");
  };

  const handleEmailChange = (value) => {
    setErrorMessageEmail(() => "");
    setEmail(() => value);
    setError(() => "");
  };

  const handlePasswordChange = (value) => {
    setPassword(() => value);
    setError(() => "");
  };

  return (
    <div>
      <Menu />
      <div className="w-[100vw] min-h-[400px] flex flex-col items-center justify-center">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 flex gap-[16px] flex-col w-[400px]"
          onSubmit={(e) => e.preventDefault()}
        >
          {error && (
            <div className="bg-red-500 text-white text-center p-2 rounded-md mb-4">
              {error}
            </div>
          )}
          <Input
            type="email"
            label="Email"
            placeholder="Ingresa tu email"
            initialValue={email}
            onChange={handleEmailChange}
            errorMessage={errorMessageEmail}
            onBlur={(value) => {
              if (checkEmailValidation(value)) {
                setErrorMessageEmail(() => "");
              } else {
                setErrorMessageEmail(
                  () => "El formato del email no es válido. ej: juan@gmail.com"
                );
              }
            }}
          />
          <Input
            type="password"
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            initialValue={password}
            onChange={handlePasswordChange}
          />
          <div className="flex justify-center">
            <Button onClick={handleLogin} isDisabled={!email || !password}>
              Iniciar sesión
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
