import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { checkEmailValidation } from "../utils/validaciones";
import Menu from "../components/Menu";
import { basePath } from "../constants/basepath";

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    contraseña: "",
    confirmarContraseña: "",
    direccion: "",
    telefono: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.nombre ||
      !formData.email ||
      !formData.contraseña ||
      !formData.confirmarContraseña ||
      !formData.direccion ||
      !formData.telefono
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (formData.contraseña !== formData.confirmarContraseña) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (!checkEmailValidation(formData.email)) {
      setError("El formato del email no es válido. ej: juan@gmail.com");
      return;
    }

    fetch(`${basePath}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: formData.nombre,
        email: formData.email,
        contraseña: formData.contraseña,
        direccion: formData.direccion,
        telefono: formData.telefono,
      }),
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al crear el usuario");
        }
        return response.json();
      })
      .then((value) => {
        const { data } = value;
        localStorage.setItem("pupysSS", data.token);
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <Menu />
      <div className="flex w-full gap-[24px] p-8 items-center justify-center">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 flex gap-[16px] flex-col w-[400px]">
          {error && (
            <div className="bg-red-500 text-white text-center p-2 rounded-md mb-4">
              {error}
            </div>
          )}
          <Input
            name="nombre"
            label="Nombre"
            placeholder="Ingresa tu nombre"
            value={formData.nombre}
            onChange={(value) => {
              handleInputChange({ value, name: "nombre" });
            }}
          />
          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="Ingresa tu email"
            value={formData.email}
            onChange={(value) => {
              handleInputChange({ value, name: "email" });
            }}
          />
          <Input
            name="contraseña"
            type="password"
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            value={formData.contraseña}
            onChange={(value) => {
              handleInputChange({ value, name: "contraseña" });
            }}
          />
          <Input
            name="confirmarContraseña"
            type="password"
            label="Confirmar Contraseña"
            placeholder="Confirma tu contraseña"
            value={formData.confirmarContraseña}
            onChange={(value) => {
              handleInputChange({ value, name: "confirmarContraseña" });
            }}
          />
          <Input
            name="direccion"
            label="Dirección"
            placeholder="Ingresa tu dirección"
            value={formData.direccion}
            onChange={(value) => {
              handleInputChange({ value, name: "direccion" });
            }}
          />
          <Input
            name="telefono"
            label="Teléfono"
            placeholder="Ingresa tu teléfono"
            value={formData.telefono}
            onChange={(value) => {
              handleInputChange({ value, name: "telefono" });
            }}
          />
          <div className="flex justify-center">
            <Button
              onClick={handleSubmit}
              isDisabled={Object.values(formData).some((value) => value === "")}
            >
              Registrarse
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
