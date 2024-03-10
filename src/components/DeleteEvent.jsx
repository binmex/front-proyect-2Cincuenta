import React from "react";
import { Button } from "primereact/button";
//sweetAlet
import Swal from "sweetalert2";
const DeleteEvent = ({ rowData, setUpdate }) => {
  const dropEvent = () => {
    // Mostrar mensaje de confirmación
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar", // Cambiar el label del botón de cancelar
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, eliminar el evento
        fetch(`http://localhost:4000/event/${rowData._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              Swal.fire({
                title: "¡Evento eliminado correctamente!",
                icon: "success",
              });
            } else {
              Swal.fire({
                title: `Error al eliminar el evento`, // Muestra el error proporcionado por el servidor
                icon: "error",
              });
            }
            setUpdate(true);
          })
          .catch((error) =>
            Swal.fire({
              title: `Error al elminar el evento: ${error}`, // Muestra el mensaje de error de la excepción
              icon: "error",
            })
          );
      }
    });
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
