import React from "react";
import { Button } from "primereact/button";
//sweetAlet
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const DeleteEvent = ({ rowData, setUpdate }) => {
  const MySwal = withReactContent(Swal);

  const dropEvent = () => {
    fetch(`http://localhost:4000/event/${rowData._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          MySwal.fire({
            title: "¡Evento eliminado correctamente!",
            icon: "success",
          });
        } else {
          MySwal.fire({
            title: `Error al eliminar el evento`, // Muestra el error proporcionado por el servidor
            icon: "error",
          });
        }
        setUpdate(true);
      })
      .catch((error) =>
        MySwal.fire({
          title: `Error al elminar el evento: ${error}`, // Muestra el mensaje de error de la excepción
          icon: "error",
        })
      );
  };

  return (
    <>
      <Button
        label="Eliminar"
        icon="pi pi-eraser"
        severity="danger"
        onClick={() => dropEvent()}
      />
    </>
  );
};

export default DeleteEvent;
