import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Button from "../components/Button";
import { basePath } from "../constants/basepath";

const Products = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`${basePath}/productos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
        return response.json();
      })
      .then((object) => {
        const { data } = object;
        setProducts(() => data);
        setIsLoading(() => false);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error.message);
        setIsLoading(() => false);
      });
  }, []);
  return (
    <div>
      <Menu />
      <div className="flex w-full gap-[24px] p-8 flex-wrap">
        {isLoading ? (
          <div>Cargando...</div>
        ) : products.length === 0 ? (
          <div>Aún no hay productos disponibles.</div>
        ) : (
          products.map((product) => {
            return (
              <div
                key={product.id}
                className="flex flex-1 sm:min-w-[400px] min-w-full flex-wrap flex-row w-[200px] gap-[12px] shadow-md p-4"
              >
                <img
                  src={product.url_imagen}
                  alt={product.nombre}
                  className="sm:w-[200px] h-[200px] w-full"
                />
                <div className="flex flex-col justify-between flex-1">
                  <div className="flex flex-col gap-[8px]">
                    <div className="font-bold">{product.nombre}</div>
                    <div>{product.descripcion}</div>
                    <div>$ {product.precio}</div>
                  </div>
                  <Button onClick={() => {}} isDisabled={true}>
                    Comprar
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Products;
