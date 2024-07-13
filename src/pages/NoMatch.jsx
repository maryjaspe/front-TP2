import React from "react";
import Menu from "../components/Menu";

const NoMatch = () => {
  return (
    <div className="flex flex-col h-screen">
      <Menu />
      <div className="flex-grow flex flex-col items-center justify-center">
        <i className="fi fi-rs-404 text-[6em]"></i>
        <p className="text-xl mt-4 font-bold">Recurso no encontrado</p>
      </div>
    </div>
  );
};

export default NoMatch;
