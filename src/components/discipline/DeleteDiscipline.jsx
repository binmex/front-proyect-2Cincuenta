import React from "react";
import { Button } from "primereact/button";
//sweetAlet
import Swal from "sweetalert2";

const DeleteDiscipline = ({ rowData, setFlag }) => {
  const dropDiscipline = () => {
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
        fetch(`http://localhost:4000/discipline/${rowData}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              Swal.fire({
                title: "Error al eliminar los datos",
                icon: "error",
              });
            }
            Swal.fire({
              title: "Eliminado",
              icon: "success",
            });
          })
          .catch((error) => {
            Swal.fire({
              title: `Error al elminar la disciplina: ${error}`,
              icon: "error",
            })
          });

        setFlag(true);
      }
    });
  };

  return (
    <>
      <Button
        label="Eliminar"
        icon="pi pi-eraser"
        severity="danger"
        onClick={() => dropDiscipline()}
      />
    </>
  );
};

export default DeleteDiscipline;
