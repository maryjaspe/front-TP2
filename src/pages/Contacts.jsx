import React, { useState } from "react";
import Menu from "../components/Menu";
import Input from "../components/Input";
import Button from "../components/Button";

const Contacts = () => {
  const handleInputChange = (value, field) => {};

  const handleSubmit = () => {};

  return (
    <div>
      <Menu />
      <div className="w-[100vw] min-h-[400px] flex flex-col items-center justify-center mt-[24px]">
        <p className="block text-[36px] text-[#b23417] font-bold mb-[36px] mt-2">
          Contactos
        </p>
        <form className="bg-[#fce9d8] shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[800px] flex flex-col gap-[16px]">
          <Input
            label="Nombre"
            placeholder="nombre"
            initialValue=""
            onChange={(value) => handleInputChange(value, "nombre")}
          />
          <Input
            label="Correo"
            type="email"
            placeholder="Ejemplo@gmail.com"
            initialValue=""
            onChange={(value) => handleInputChange(value, "email")}
          />
          <Input
            label="Comentario"
            placeholder="Ingrese su comentario"
            initialValue=""
            onChange={(value) => handleInputChange(value, "comentario")}
          />
          <Button onClick={handleSubmit}>Enviar</Button>
        </form>
      </div>
    </div>
  );
};

export default Contacts;
