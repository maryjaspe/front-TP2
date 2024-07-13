import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { basePath } from "../constants/basepath";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    nombre: "",
    email: "",
    direccion: "",
    telefono: "",
  });
  const [userOriginal, setUserOriginal] = useState({
    direccion: "",
    telefono: "",
  });
  const [isError, setIsError] = useState(false);
  const [chipMessage, setChipMessage] = useState("");
  const [showChip, setShowChip] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("pupysSS");
    fetch(`${basePath}/user/profile`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${jwt}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener el perfil del usuario");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setUserOriginal(() => {
          return { direccion: data.direccion, telefono: data.telefono };
        });
        setIsLoading(false);
      })
      .catch((error) => {
        setChipMessage(error.message);
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (value, field) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateProfile = () => {
    if (!user.direccion || !user.telefono) {
      setChipMessage("La dirección y el teléfono son obligatorios");
      setShowChip(true);
      setTimeout(() => setShowChip(false), 3000);
      setIsError(true);
      return;
    }

    if (
      user.direccion === userOriginal.direccion &&
      user.telefono === userOriginal.telefono
    ) {
      setChipMessage("No hay cambios en la dirección o el teléfono");
      setShowChip(true);
      setTimeout(() => setShowChip(false), 3000);
      setIsError(true);
      return;
    }

    const jwt = localStorage.getItem("pupysSS");
    fetch(`${basePath}/user/profile/update`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${jwt}`,
      },
      body: JSON.stringify({
        direccion: user.direccion,
        telefono: user.telefono,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al actualizar el perfil");
        }
        return response.json();
      })
      .then(() => {
        setChipMessage("Usuario editado correctamente");
        setIsError(false);
        setShowChip(true);
        setTimeout(() => setShowChip(false), 3000);
        setUserOriginal({ direccion: user.direccion, telefono: user.telefono });
      })
      .catch((error) => {
        setChipMessage(error.message);
        setIsError(true);
        setShowChip(true);
        setTimeout(() => setShowChip(false), 3000);
      });
  };

  const handleDeleteAccount = () => {
    const jwt = localStorage.getItem("pupysSS");
    fetch(`${basePath}/user/delete`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${jwt}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al eliminar la cuenta");
        }
        return response.json();
      })
      .then(() => {
        localStorage.removeItem("pupysSS");
        navigate("/");
      })
      .catch((error) => {
        setChipMessage(error.message);
        setIsError(true);
        setShowChip(true);
        setTimeout(() => setShowChip(false), 3000);
      });
  };

  return (
    <div className="flex flex-col h-screen">
      <Menu />
      <div className="p-8">
        {showChip && (
          <div
            className={`chip ${
              isError ? "bg-red-500" : "bg-green-500"
            } text-white p-2 rounded`}
          >
            {chipMessage}
          </div>
        )}
        <div className="flex-grow flex flex-col p-8 gap-8 shadow-xl">
          {isLoading ? (
            <p>Cargando...</p>
          ) : (
            <>
              <p className="text-xl mt-4 font-bold text-center">
                Perfil del Usuario
              </p>
              <p className="text-lg font-bold">Información del Usuario</p>
              <p>
                <span className="font-bold">Nombre: </span> {user.nombre}
              </p>
              <p>
                <span className="font-bold">Email: </span> {user.email}
              </p>
              <Input
                label="Dirección"
                initialValue={user.direccion}
                onChange={(value) => handleInputChange(value, "direccion")}
              />
              <Input
                label="Teléfono"
                initialValue={user.telefono}
                onChange={(value) => handleInputChange(value, "telefono")}
              />
              <Button onClick={handleUpdateProfile}>Aplicar Cambios</Button>
              <Button onClick={handleDeleteAccount}>
                Dar de Baja la Cuenta
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
